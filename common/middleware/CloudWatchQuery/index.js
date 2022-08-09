const moment = require('moment');

module.exports = async (requestPromise, service, event, context) => {
  const response = await requestPromise;
  // eslint-disable-next-line max-len

  const startDate = moment().subtract('5', 'minutes').unix();
  const endDate = moment().add('5', 'minutes').unix();

  const link = `https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${context.functionName}/log-events$3FfilterPattern$3D$2522${context.awsRequestId}$2522+$26start$3D${startDate}000$26end$3D${endDate}000`;

  if (process.env.stage === 'local') {
    return response;
  }
  try {
    const parsedBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
    parsedBody.awsFilter = link;
    response.body = JSON.stringify(parsedBody);
    return response;
  } catch (error) {
    return response;
  }
};