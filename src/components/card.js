import {
  cardTemplate,
  photoCard,
  linkPhoto,
  titlePhoto
} from "./constants.js";
import { openPopup } from "./modal.js";
import { config } from "./api.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Определять кол-во лайков нужно только с помощью длины массива лайков, пришедшего в блоке then в ответе от сервера
// ОТВЕТ: Вы можете отследить параметр likesRef - определяется при отрисовке через длину массива, при загрузке карточек. Просто отследите создание этого параметра. Либо я не правильно понимаю вашего комментария.
function handleLikeCard(evt, likesRef, cardId) {
  let likesCount = parseInt(likesRef.innerText);
  if (evt.target.classList.contains("card__like_active")) {
    fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then((res) => {
        console.log("Сервер вернул ответ после удаления лайка", res);
        likesRef.textContent = likesCount -= 1;
        evt.target.classList.remove("card__like_active");
      })
      .catch((err) => console.log(err));
  } else {
    fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    })
      .then((res) => {
        console.log("Сервер вернул ответ после постановки лайка:", res);
        likesRef.textContent = likesCount += 1;
        evt.target.classList.add("card__like_active");
      })
      .catch((err) => console.log(err));
  }
}

function handleCardClick(name, link) {
  linkPhoto.src = link;
  linkPhoto.alt = name;
  titlePhoto.innerText = name;
  openPopup(photoCard);
}

const handleCardDelete = (cardDel, cardId) => {
  const listItem = cardDel.closest(".card");
  fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(() => listItem.remove())
    .catch((err) => console.err("Ошибка при удалении картчоки - ", err))
}

export function createCard(name, link, likes, cardId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDel = cardElement.querySelector(".card__del");
  const cardCountLikes = cardElement.querySelector(".card__like_count");
  cardCountLikes.innerText = likes;
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  // Хз как реализовать появление корзинки только у создателя картинки а не у всех
  cardDel.addEventListener("click", () => handleCardDelete(cardDel, cardId));
  cardLike.addEventListener("click", (evt) =>
    handleLikeCard(evt, cardCountLikes, cardElement.cardId)
  );
  cardPhoto.addEventListener("click", () => handleCardClick(name, link));
  return cardElement;
}
