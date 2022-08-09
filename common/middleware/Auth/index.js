/* eslint-disable consistent-return */
const auth = (event) => event.headers.Authorization === process.env.authToken;

const authMiddleware = () => ({
  before: (handler, next) => {
    const checkByAuthMethod = {
      header: auth(handler.event),
    }[process.env.authMethod];

    if (checkByAuthMethod || checkByAuthMethod === undefined) {
      next();
    } else {
      return handler.callback(null, {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      });
    }
  },
});

module.exports = authMiddleware;
