import actionType from '../actionType';

const URL = 'https://httpbin.org/#/HTTP_Methods/put_put';

export const putData = (query) => {

  return (dispatch) => {
    fetch(URL, {
      method: 'PUT',
      body: JSON.parse(JSON.stringify(query)),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
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
        dispatch({ type: actionType.FETCH_DATA_SUCCESS, data: res.data });
      })
      .catch((error) => {
        console.log('Ошибка:', error);
        dispatch({ type: actionType.FETCH_DATA_FAILED, error });
      });

    localStorage.setItem(
      'request',
      `request: ${URL} body: ${JSON.stringify(query)}`,
    );
  };
};
