/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const BaseHandler = require('./BaseHandler/BaseController');

/**
 * @callback IMiddleware
 * @param {promise} requestPromise promise with the response from request or previous middleware
 * @param {string} service service name used on config.yml
 * @param {object} event serverless event object
 * @param {object} context serverless context object
 * @returns {promise} the received requestPromise with changes made
*/

/**
 * @param {string} controllersPath path to the folder containing the routes
 * @param  {...IMiddleware} middlewares any number of middlewares that alter the request response
 * @returns {object} Object with functions to be referenced in config.yml
 */
const AutoHandler = (controllersPath, ...middlewares) => {
  class MyHandler extends BaseHandler { }
  const handler = new MyHandler();

  const folders = fs.readdirSync(controllersPath);

  const functionsToExport = {};

  folders.forEach((service) => {
    handler[service] = require(`${controllersPath}/${service}`);
    functionsToExport[service] = (event, context) => {
      const requestPromise = handler.handle(event, context, service);

      // add middlewares if needed
      if (middlewares.length === 0) {
        return requestPromise;
      }

      const lastPromise = middlewares.reduce((promise, middleware) => middleware(promise, service, event, context), requestPromise);

      return lastPromise;
    };
  });

  return functionsToExport;
};

module.exports = AutoHandler;
