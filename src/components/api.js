export const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
};

export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9/",
  headers: {
    authorization: "cfb5467c-bf03-4f53-98d0-54d36791533e",
    "Content-Type": "application/json",
  },
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  })
    .then(responseCheck)
    .then((res) => {
      console.log("Результат АПИ Профиля - ", res);
      return res;
    });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  })
    .then(responseCheck)
    .then((res) => {
      console.log("Результат АПИ карточек - ", res);
      return res;
    });
};

export const patchUserAvatar = (link) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(responseCheck);
};

export const postCard = (title, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  }).then(responseCheck);
};

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(responseCheck);
};

export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(responseCheck);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(responseCheck);
};

export const patchUserChange = (name, job) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(responseCheck);
};
