/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const { closeConnection } = require('../database/functions/closeConnection');
const BaseHandler = require('./BaseController');
/**
 * @param {string} controllersPath path to the folder containing the routes
 * @param  {...Function<Promise>} middlewares any number of middlewares that alter the request response
 */
const AutoHandler = (controllersPath, ...middlewares) => {
  class MyHandler extends BaseHandler {}
  const handler = new MyHandler();

  const folders = fs.readdirSync(controllersPath);

  const functionsToExport = {};

  folders.forEach((service) => {
    handler[service] = require(`${controllersPath}/${service}`);
    functionsToExport[service] = (event, context) => {
      const requestPromise = handler.handle(event, context, service).then(closeConnection());

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
