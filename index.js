let popup = document.querySelector('.form') // Попап
let openPopup = popup.querySelector('.form__open') // Кнопка открытия попап-а

let formPopup = document.querySelector('.form__popup') // Попап со всеми внутренностями
let closeButton = formPopup.querySelector('.form__close-button') // Кнопка закрытия попап-а
let saveBtn = formPopup.querySelector('.form__save') // Кнопка сохранения
let nameInput = formPopup.querySelector('.form__profile-title') // Имя профиля
let jobInput = formPopup.querySelector('.form__profile-subtitle') // Наименование работы

let profileInfo = document.querySelector('.profile__info') // Информация о профиле
let profileTitle = profileInfo.querySelector('.profile__title') // Имя профиля
let profileSubtitle = profileInfo.querySelector('.profile__subtitle') // Описание профиля
let editProfile = profileInfo.querySelector('.profile__edit'); // Кнопка редактирования профиля

let cardsLike = document.querySelectorAll('.card__like') // Кнопка лайк

// Функция закрытия попап-а
closeButton.addEventListener('click', closePopup);
function closePopup () {
  popup.classList.remove('form__open');
}

// Функция открытия попап-а
editProfile.addEventListener('click', EditProfileButton);
function EditProfileButton () {
  popup.classList.add('form__open');
}

// Функция сохранения введённых данных
saveBtn.addEventListener('click', btnSaveProfile);
function btnSaveProfile () {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

// Валидатор, чтобы вёрстка не слетала в profile__info
nameInput.oninput = function () {
  if (nameInput.value.length < 8 && jobInput.value.length < 8) {
    saveBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
  }
}

// Лайки
for (let card of cardsLike) {
  card.onclick = function () {
    card.classList.toggle('card__like_active');
  }
}
