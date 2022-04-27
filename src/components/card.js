import { cardTemplate, photoCard, linkPhoto, titlePhoto } from "./constants.js";
import { openPopup } from "./utils.js";
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

function handleLikeCard(evt, likesRef, cardId) {
  if (evt.target.classList.contains("card__like_active")) {
    fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then((json) => json.json())
      .then((res) => {
        likesRef.textContent = res.likes.length;
        evt.target.classList.remove("card__like_active");
      })
      .catch((err) => console.log(err));
  } else {
    fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    })
      .then((json) => json.json())
      .then((res) => {
        likesRef.textContent = res.likes.length;
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
    headers: config.headers,
  })
    .then(() => listItem.remove())
    .catch((err) => console.err("Ошибка при удалении картчоки - ", err));
};

export function createCard(name, link, likes, cardId, cardOwner) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  let cardDel = cardElement.querySelector(".card__del");
  const cardCountLikes = cardElement.querySelector(".card__like_count");

  // Проблема судя по всему в моей структуре кода, ибо не получается в foreach бахнуть картинку удаления только в -своих- карточках
  // Аналогичная проблема и с добавлением класса в -своих- карточках, не могу получить информацию из профиля. Нужна помощь
  // const isOwner = await fetch(`${config.baseUrl}users/me`, {
  //   headers: config.headers,
  // })
  //   .then((json) => json.json())
  //   .then((res) => res._id === cardOwner);
  // if (!isOwner) {
  //   cardDel.remove();
  // }

  cardCountLikes.innerText = likes;
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  cardDel.addEventListener("click", () => handleCardDelete(cardDel, cardId));
  cardLike.addEventListener("click", (evt) =>
    handleLikeCard(evt, cardCountLikes, cardId)
  );
  cardPhoto.addEventListener("click", () => handleCardClick(name, link));
  return cardElement;
}
