const AutoHandler = require('../../common/AutoHandler');
const setAWSLogLink = require('../../common/middleware/CloudWatchQuery');

const dir = `${__dirname}/controllers`;

module.exports = AutoHandler(dir, setAWSLogLink);
