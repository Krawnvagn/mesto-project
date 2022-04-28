import { cardTemplate, photoCard, linkPhoto, titlePhoto } from "./constants.js";
import { openPopup } from "./utils.js";
import {
  deleteCard,
  deleteLikeCard,
  putLikeCard,
} from "./api.js";

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
    deleteLikeCard(cardId)
      .then((res) => {
        likesRef.textContent = res.likes.length;
        evt.target.classList.remove("card__like_active");
      })
      .catch((err) => console.log(err));
  } else {
    putLikeCard(cardId)
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
  deleteCard(cardId)
    .then(() => listItem.remove())
    .catch((err) => console.err("Ошибка при удалении картчоки - ", err));
};

export function createCard(name, link, likes, cardId, cardOwner, user) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDel = cardElement.querySelector(".card__del");
  const cardCountLikes = cardElement.querySelector(".card__like_count");

  if (cardOwner !== user) {
    cardDel.remove();
  }
  if (likes.some((like) => like._id === user)) {
    cardLike.classList.add("card__like_active");
  }

  cardCountLikes.innerText = likes.length;
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
