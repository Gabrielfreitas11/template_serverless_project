const { sourceIpAddress } = process.env;

const { client, service, hideSensitiveProperies } = process.env;
const {
  LEVEL_DEBUG, LEVEL_ERROR, LEVEL_FAIL, LEVEL_INFO, LEVEL_PENDING, LEVEL_WARN,
} = require('./constants');

const envsToNotShowLogs = ['test'];

function hideSensitiveData(object, propertiesToHide) {
  const newObject = JSON.parse(JSON.stringify(object));

  propertiesToHide.forEach((property) => {
    if (object[property]) {
      newObject[property] = '** sensitive data **';
    }
  });

  return newObject;
}

function generateLogPayload(level, payload = {}, propertiesToHide = []) {
  const toHide = [];
  const newPayload = JSON.parse(JSON.stringify(payload));

  if (propertiesToHide && propertiesToHide.length) {
    toHide.push(propertiesToHide);
  }

  if (hideSensitiveProperies && hideSensitiveProperies.length) {
    toHide.push(hideSensitiveProperies);
  }

  if (payload.response && payload.response.body) {
    const hidedObject = hideSensitiveData(payload.response.body, toHide);
    newPayload.response.body = hidedObject;
  }

  return {
    level, newPayload, client, service, ipAddress: sourceIpAddress,
  };
}

function logPayloadAccordingLevel(level, payload) {
  switch (level) {
    case LEVEL_DEBUG:
      console.debug(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    case LEVEL_PENDING:
      console.info(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    case LEVEL_INFO:
      console.info(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    case LEVEL_WARN:
      console.warn(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    case LEVEL_ERROR:
      console.error(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    case LEVEL_FAIL:
      console.error(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
    default:
      console.info(JSON.stringify(payload, null, 2)); // eslint-disable-line
      break;
  }
}

function log(level, payload, propertiesToHide = []) {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  const logPayload = generateLogPayload(level, payloadCopy, propertiesToHide);

  if (process.env.stage && !envsToNotShowLogs.includes(process.env.stage)) {
    logPayloadAccordingLevel(level, logPayload);
  }

  return payload;
}

/**
 * Creates DEBUG log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function debug(payload, propertiesToHide = []) {
  return log(LEVEL_DEBUG, payload, propertiesToHide);
}

/**
 * Creates PENDING log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function pending(payload, propertiesToHide = []) {
  return log(LEVEL_PENDING, payload, propertiesToHide);
}

/**
 * Creates INFO log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function info(payload, propertiesToHide = []) {
  return log(LEVEL_INFO, payload, propertiesToHide);
}

/**
 * Creates WARN log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function warn(payload, propertiesToHide = []) {
  return log(LEVEL_WARN, payload, propertiesToHide);
}

/**
 * Creates ERROR log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function error(payload, propertiesToHide = []) {
  return log(LEVEL_ERROR, payload, propertiesToHide);
}

/**
 * Creates FAIL log information for internal requests.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
function fail(payload, propertiesToHide = []) {
  return log(LEVEL_FAIL, payload, propertiesToHide);
}

function initLog(logPayload, level) {
  const startDate = new Date();
  const customLog = {
    debug,
    pending,
    info,
    warn,
    error,
    fail,
  }[level](logPayload);
  return () => ({
    ...customLog,
    duration: (new Date() - startDate) / 1000,
  });
}

module.exports = {
  debug,
  pending,
  info,
  warn,
  error,
  fail,
  initLog,
};
