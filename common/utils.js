const GenericError = require('./errors/genericError')
var crypto = require('crypto')
/**
 * validate information. Available
 * @param {Object} sendedParameters
 * @param {Array<string>} requiredFields
 */
module.exports.validateAttributes = function (sendedParameters, requiredFields) {
  const missingFields = []
  if (!sendedParameters) return requiredFields
  for (const element of requiredFields) {
    if (!sendedParameters[element]) {
      missingFields.push(element)
    }
  }
  return missingFields
}

// temZero = true é para caso queria verificar se ta vazio com 0 ou '0' não ser sinonimo de vazio.
module.exports.isEmpty = function (mixedVar, temZero = null) {
  var undef
  var key
  var i
  var len
  var emptyValues = temZero == null
    ? [undef, null, false, 0, '', '0', ' ']
    : [undef, null, false, '', ' ']

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
  return false
}

var base64 = exports

/*
 * base64.js: An extremely simple implementation of base64 encoding / decoding using node.js Buffers
 *
 * (C) 2010, Nodejitsu Inc.
 * (C) 2011, Cull TV, Inc.
 *
 */

base64.encode = function (unencoded) {
  return Buffer.from(unencoded || '').toString('base64')
}

base64.decode = function (encoded) {
  return Buffer.from(encoded || '', 'base64').toString('utf8')
}

base64.urlEncode = function (unencoded) {
  var encoded = base64.encode(unencoded)
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

base64.urlDecode = function (encoded) {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/')
  while (encoded.length % 4) encoded += '='
  return base64.decode(encoded)
}

module.exports.removeAccents = function (str) {
  const accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
  const accentsOut = 'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'
  str = str.split('')
  str.forEach((letter, index) => {
    const i = accents.indexOf(letter)
    if (i != -1) {
      str[index] = accentsOut[i]
    }
  })
  return str.join('')
}

module.exports.removeCurrency = function (str) {
  if (this.isEmpty(str)) {
    return
  }

  const newValue = str.replace('.', '')
  return newValue.replace(',', '.')
}

module.exports.generateRandomToken = function (size) {
  return crypto.randomBytes(size).toString('hex')
}

module.exports.findEmail = function (frase) {
  return frase.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
}

module.exports.hideEmail = function (email) {
  const emailParts = email.split('@')
  const emailSubParts = emailParts[1].split('.')

  let hiddenEmail = emailParts[0] + '@XXXXX'

  for (var i = 1; i < emailSubParts.length; i++) {
    hiddenEmail = hiddenEmail + (this.isEmpty(emailSubParts[i + 1]) ? '.' : '') + emailSubParts[i]
  }
  return hiddenEmail
}
module.exports.hidePhone = function (phone) {
  phone = 'XXXXX' + phone.substr(-4)
  return phone
}

module.exports.getCreditCardType = function (number) {
  // https://stackoverflow.com/a/5911300
  // visa
  var re = new RegExp('^4')
  if (number.match(re) != null) return 'Visa'

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  ) { return 'Mastercard' }

  // AMEX
  re = new RegExp('^3[47]')
  if (number.match(re) != null) return 'AMEX'

  // Discover
  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)'
  )
  if (number.match(re) != null) return 'Discover'

  // Diners
  re = new RegExp('^36')
  if (number.match(re) != null) return 'Diners'

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]')
  if (number.match(re) != null) return 'Diners - Carte Blanche'

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])')
  if (number.match(re) != null) return 'JCB'

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))')
  if (number.match(re) != null) return 'Visa Electron'

  return ''
}

module.exports.unicodeToChar = function (text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
  })
}

module.exports.changeData = function (dateToChange) {
  const date = String(dateToChange)
  let newDate, dia, ano, mes
  const re1 = new RegExp(/\d{4}-\d{2}-\d{2}/)
  const re2 = new RegExp(/\d{2}\/\d{2}\/\d{4}/)
  if (date.match(re1)) {
    ano = date.split('-')[0]
    mes = date.split('-')[1]
    dia = date.split('-')[2]
    newDate = dia + '/' + mes + '/' + ano
  } else if (date.match(re2)) {
    dia = date.split('/')[0]
    mes = date.split('/')[1]
    ano = date.split('/')[2]
    newDate = ano + '-' + mes + '-' + dia
  } else {
    newDate = 'Invalid DATE [ ' + date + ' ]'
  }
  return newDate
}

module.exports.is_json = function isJson (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

module.exports.guid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

module.exports.shuffleArray = function (array) {
  var currentIndex = array.length
  var temporaryValue
  var randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

/**
 * Returns random int between (including) min and max
 */
module.exports.randomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * These functions breaks an address condensed in a break sentence, like the following example:
 * INPUT::: address ---> Name of Street, Number in Street
 * OUTPUT::: STREET ---> Name of Street
 *           NUMBER ---> Number in Street
 */
module.exports.breakAddress = (address, output) => {
  const inputAddress = address.split(',')
  const streetName = inputAddress[0]
  const streetNumber = inputAddress[1]

  if (output === 'STREET') {
    return streetName
  } else if (output === 'NUMBER') {
    return streetNumber
  }
}

module.exports.toHttpResponse = function (statusCode, body = { message: '' }) {
  return {
    statusCode,
    body: {
      status_code: statusCode,
      ...body
    }
  }
}

module.exports.validateObjectAccordingSchema = function (object, schema) {
  const result = schema.validate(object)

  if (result.error) {
    throw new GenericError('HttpError', result.error.details[0].message, { code: 400 })
  }

  return result.value
}
