const axios = require("axios");
const logger = require("../logger");

class BaseHandler {
  event = null;

  context = null;

  env = process.env;

  async handle(event, context, method, isHttpResponse = true) {
    const log = logger.initLog({ event, context }, "pending");

    this.setFunctionContext(event, context);

    if (!(await this.isAuthorized())) {
      const logPayload = log();
      logPayload.response = {
        statusCode: 401,
        message: "Unauthorized!",
      };

      logger.initLog(logPayload, "warn");

      return BaseHandler.httpResponse(401, JSON.stringify(logPayload.response));
    }

    try {
      const response = await this[method](event, context);

      const logPayload = log();
      logPayload.response = response;

      if (response.statusCode >= 200 && response.statusCode <= 299) {
        logger.initLog(logPayload, "info");
      } else {
        logger.initLog(logPayload, "error");
      }

      return isHttpResponse
        ? BaseHandler.httpResponse(
            response.statusCode,
            typeof response.body === "string"
              ? response.body
              : JSON.stringify(response.body),
            response.headers
          )
        : response;
    } catch (err) {
      const logPayload = log();
      const message =
        err.response && err.response.data
          ? err.response.data
          : err.message || err;

      logPayload.response = { statusCode: 500, message };

      BaseHandler.sendErrorEmailToAltu({
        recipient: BaseHandler.getRecipients(logPayload.client),
        clientsError: logPayload.client,
        serviceError: logPayload.service,
        statusCode: 500,
        message,
      });

      logger.initLog(logPayload, "error");

      return BaseHandler.httpResponse(500, message);
    }
  }

  setFunctionContext(event, context) {
    this.event = event;
    this.context = context;
    process.env.sourceIpAddress =
      event.requestContext &&
      event.requestContext.identity &&
      event.requestContext.identity.sourceIp
        ? event.requestContext.identity.sourceIp
        : null;
  }

  static sendErrorEmailToAltu({
    recipient,
    clientsError,
    serviceError,
    statusCode,
    message,
  }) {
    try {
      //codigo que envia para o email

      logger.info("Email enviado.");
    } catch (err) {
      logger.error(JSON.stringify(err, null, 2));
    }
  }

  static getRecipients() {
    return; //retorna os emails que devem ser enviados os alertas
  }

  static httpResponse(statusCode, body, headers = {}) {
    return {
      statusCode,
      body,
      headers,
    };
  }

  isAuthorized() {
    const checkByAuthMethod = {
      header: this.authHeaderIsTheSameInTheEnvironment(),
    }[this.env.authMethod];

    if (checkByAuthMethod === undefined) {
      return true;
    }
    return checkByAuthMethod;
  }

  authHeaderIsTheSameInTheEnvironment() {
    if (this.event.headers === undefined) {
      return true;
    }
    return this.event.headers.Authorization === this.env.authToken;
  }

  async authHeaderIsTheSameInTableUserToken() {
    const userId = this.event.headers.userid;
    const userToken = this.event.headers.usertoken;

    const userData = await dbUserToken.getToken(userId, userToken);

    if (!userData.length) {
      return false;
    }

    return true;
  }
}

module.exports = BaseHandler;