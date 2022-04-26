import {
  cardTemplate,
  photoCard,
  linkPhoto,
  titlePhoto,
  popupSure,
  popupConfirmation,
} from "./constants.js";
import { closePopup, openPopup } from "./modal.js";
import { API_URL_CARDS, token, getUserInfo, config } from "./api.js";

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

function handleCardDelete(cardLitter, cardId) {
  openPopup(popupSure);
  popupConfirmation.addEventListener("click", (e) => {
    e.preventDefault();
    const listItem = cardLitter.closest(".card");
    closePopup(popupSure);
    console.log("CARDA", cardId);
    fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    }).then(() => listItem.remove());
  });
}

    // Определять кол-во лайков нужно только с помощью длины массива лайков, пришедшего в блоке then в ответе от сервера
    // ОТВЕТ: Вы можете отследить параметр likesRef - определяется при отрисовке через длину массива, при загрузке карточек. Просто отследите создание этого параметра. Либо я не правильно понимаю вашего комментария.     
function handleLikeCard(evt, likesRef, cardId) {
  let likesCount = parseInt(likesRef.innerText);
  if (evt.target.classList.contains("card__like_active")) {
    fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers
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
      headers: config.headers
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

export function createCard(name, link, likes, cardId, cardOwner) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.cardId = cardId;

  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDel = cardElement.querySelector(".card__del");
  const cardCountLikes = cardElement.querySelector(".card__like_count");
  cardCountLikes.innerText = likes;
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  if (cardOwner !== getUserInfo._id) {
    cardDel.remove();
  } else {
    cardDel.addEventListener("click", () => {
      handleCardDelete(cardDel, cardElement.cardId);
    });
  }
  cardLike.addEventListener("click", (evt) =>
    handleLikeCard(evt, cardCountLikes, cardElement.cardId)
  );
  cardPhoto.addEventListener("click", () => handleCardClick(name, link));
  return cardElement;
}
