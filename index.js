// Информация о профиле
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubTitle = profileInfo.querySelector('.profile__subtitle');
const profileEdit = profileInfo.querySelector('.profile__edit');
// Поп-ап
const popup = document.querySelector('.popup');
const crossPopup = popup.querySelector('.popup__close-button');
const nameInput = popup.querySelector('.popup__input_type_user-name');
const jobInput = popup.querySelector('.popup__input_type_user-job');

// Форма
const formElement = popup.querySelector('.popup__form')

// ф-я вставки значений из profile__title и __subtitle
function inputTitleSubTitle () {
  nameInput.value = profileTitle.innerText;
  jobInput.value = profileSubTitle.innerText;
}

// ф-я открытия popup
function openPopup () {
  popup.classList.add('popup_open');
  inputTitleSubTitle()
}

// ф-я закрытия popup
function closePopup () {
  popup.classList.remove('popup_open');
}

// ф-я сохранения данных + закрытие popup
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup();
}

profileEdit.addEventListener('click', openPopup);
crossPopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
