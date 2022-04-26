const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
};

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9/',
  headers: {
    authorization: 'cfb5467c-bf03-4f53-98d0-54d36791533e',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}`, {
      headers: config.headers
    })
    .then (res => responseCheck(res))
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
    .then(responseCheck)
    .then((res) => {
      console.log('Результат АПИ Профиля - ', res);
      return res;
    })
};

export const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers
  })
  .then(responseCheck)
  .then((res) => {
    console.log('Результат АПИ карточек - ', res);
    return res;
  })
}