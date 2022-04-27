export const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
};
// 1
export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9/",
  headers: {
    authorization: "cfb5467c-bf03-4f53-98d0-54d36791533e",
    "Content-Type": "application/json",
  },
};
// 2
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
// 3
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
// 4
export const patchUserAvatar = (link) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
};
// 5
export const postCard = (title, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
};
// 6
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
// 7
export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};
// 8
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
}
// 9
export const patchUserChange = (name, job) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
}
