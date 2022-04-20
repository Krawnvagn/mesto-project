import { cards, cardTemplate, titleInput, linkInput, popupPhoto, formPhoto, photoCard, linkPhoto, titlePhoto } from "./utils.js";
import { closePopup, openPopup } from "./modal.js";

const initialCards = [
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

  function createCard(name, link) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardPhoto = cardElement.querySelector(".card__photo");
    const cardLike = cardElement.querySelector(".card__like");
    const cardDel = cardElement.querySelector(".card__del");
    cardTitle.innerText = name;
    cardPhoto.alt = name;
    cardPhoto.src = link;
    cardDel.addEventListener("click", () => {
      const listItem = cardDel.closest(".card");
      listItem.remove();
    });
    cardLike.addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like_active");
    });
    cardPhoto.addEventListener("click", (evt) => {
      openPopup(photoCard);
      linkPhoto.src = link;
      linkPhoto.alt = name;
      titlePhoto.innerText = name;
    });
    return cardElement;
  }

  initialCards.forEach((card) => {
    cards.prepend(createCard(card.name, card.link));
  });

  export function submitFormHandlerPhoto(evt) {
    evt.preventDefault();
    cards.prepend(createCard(titleInput.value, linkInput.value));
    closePopup(popupPhoto);
    formPhoto.reset();
  }