const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
};
// 1
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9/',
  headers: {
    authorization: 'cfb5467c-bf03-4f53-98d0-54d36791533e',
    'Content-Type': 'application/json'
  }
}
// 2
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
// 3
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
// 4
// 5
// 6
// -7