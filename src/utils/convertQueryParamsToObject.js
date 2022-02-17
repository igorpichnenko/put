export function convertQueryParamsToObject(queryString) {
  const result = {};
  const params = queryString.substr(1).split('&');

  if (params !== '') {
    for (let i = 0; i < params.length; i += 1) {
      const param = params[i].split('=');
      if (param.length === 2) {
        result[param[0]] = decodeURIComponent(param[1].replace(/\+/g, ' '));
      }
    }
  }

  result['id'] = Number(result['id']);
  result['date'] = Number(result['date']);
  // приводим к ожидаемому типу данных

  console.log('convertQueryParamsToObject', result);
  return result;
}
