module.exports = class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body,
    };
  }

  static created(body) {
    return {
      statusCode: 201,
      body,
    };
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }

  static serverError(body = null) {
    return {
      statusCode: 500,
      body,
    };
  }
};
