const http = require('../../../common/http');

const path = 'http://cep.bldstools.com/';

exports.requestAPI = async (params) => {
  const options = {
    url: path,
    params,
    method: 'get',
  };
  const httpResponse = await http.request(options);

  return (httpResponse && httpResponse.data) || {};
};
