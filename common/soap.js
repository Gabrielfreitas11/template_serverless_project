/**
 * Module to make SOAP requests
 * @author Marcos Duarte
 */

var logger = require('./logger')
var soap = require('soap')
var utils = require('./utils')

/**
 * Sends a SOAP request. This is a wrapper for the soap library.
 * For more info on how to use it: https://github.com/vpulim/node-soap
 *
 * @param {string} wsdlUrl
 * @param {string} method
 * @param {JSON} parameters
 * @author Marcos Duarte
 */
module.exports.request = async function (wsdlUrl, method, parameters, auth = null, httpHeader = null) {
  var startDate = new Date()
  var logPayload = {
    request: {
      wsdlUrl: wsdlUrl,
      method: method,
      params: parameters
    }
  }

  var log = await logger.pending(logPayload)
  return soap.createClientAsync(wsdlUrl).then(
    client => {
      if (!utils.isEmpty(auth)) {
        client.setSecurity(new soap.BasicAuthSecurity(auth.login, auth.pass))
      }
      if (!utils.isEmpty(httpHeader)) {
        client.addHttpHeader('Authorization', httpHeader)
      }
      return client[method + 'Async'](parameters).then(
        async result => {
          var response = result[0]
          var endDate = new Date()
          log.duration = (endDate - startDate) / 1000
          logPayload.response = response
          logPayload.xmlRequest = client.lastRequest
          logPayload.xmlResponse = client.lastResponse
          await logger.info(logPayload, log)
          response.request = client.lastRequest
          return response
        },
        async error => {
          var endDate = new Date()
          log.duration = (endDate - startDate) / 1000
          logPayload.error = error
          logPayload.xmlRequest = client.lastRequest
          logPayload.xmlResponse = client.lastResponse
          if (method == 'ConsultaDocumentoImobPorSegurado' || method == 'DevolutivaGET') return client.lastResponse
          await logger.error(logPayload, log)

          throw error
        }
      )
    },
    async error => {
      var endDate = new Date()
      log.duration = (endDate - startDate) / 1000
      logPayload.error = error
      await logger.error(logPayload, log)

      throw error
    }
  )
}
