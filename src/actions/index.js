import actionType from '../actionType';

const URL = 'https://httpbin.org/#/HTTP_Methods/put_put';

export const fetchDataSuccess = (payload) => {
  return {
    type: actionType.FETCH_DATA_SUCCESS,
    payload,
  };
};

export const fetchDataFailed = (error) => {
  return {
    type: actionType.FETCH_DATA_FAILED,
    payload: error,
  };
};

export const putData = (query) => {
  return (dispatch) => {
    fetch(URL, {
      method: 'PUT',
      body: JSON.parse(JSON.stringify(query)),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem('response', `respone : ${JSON.stringify(res)}`);
          return res;
        } else {
          console.log('Запрос', 'response:', res);
          localStorage.setItem('response', `respone : ${JSON.stringify(res)}`);
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then((res) => {
        if (res.headers['content-type'] !== 'application/json') {
          let error = new Error('Некорректный ответ от сервера');
          error.response = res;
          throw error;
        }

        return res.json();
      })
      .then((res) => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch((error) => {
        console.log('Ошибка:', error);
        dispatch(fetchDataFailed(error));
      });

    localStorage.setItem(
      'request',
      `request: ${URL} body: ${JSON.stringify(query)}`,
    );
  };
};
