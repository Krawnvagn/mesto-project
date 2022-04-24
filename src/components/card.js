import {
  cardTemplate,
  photoCard,
  linkPhoto,
  titlePhoto,
} from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import { API_URL_CARDS, token } from "./api.js";

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

function cardDeleteFunction(cardLitter) {
  const listItem = cardLitter.closest(".card");
  listItem.remove();
}

function cardLikeFunction(evt, likes) {
  evt.target.classList.toggle("card__like_active");

//   if (evt.target.)
//     fetch('https://nomoreparties.co/v1/cohortId/users/me', {
//     method: 'PATCH',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       // name: 'Marie Skłodowska Curie',
//       // about: 'Physicist and Chemist'
//       likes: 
//     })
// });

}

function cardPhotoFunction(name, link) {
  linkPhoto.src = link;
  linkPhoto.alt = name;
  titlePhoto.innerText = name;
  openPopup(photoCard);
  // На медленных устройствах при твоём коде будут моргания - сначала
  //  покажется попап со старыми данными, потом появятся новые. Поэтому
  //   лучше сначала заменить все данные, а потом показать попап
}

export function createCard(name, link, likes) {
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
  cardDel.addEventListener("click", () => cardDeleteFunction(cardDel));
  cardLike.addEventListener("click", (evt) => cardLikeFunction(evt));
  cardPhoto.addEventListener("click", () => cardPhotoFunction(name, link));
  return cardElement;
}