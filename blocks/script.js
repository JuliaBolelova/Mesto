//Задание переменных
const addButton = document.querySelector(".user-info__button");
const closeButton = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".button_edit");
const placesContainer = document.querySelector(".places-list");
let allCards = Array.from(document.querySelectorAll(".place-card"));
const cardForm = document.forms.new;
const headerForm = document.forms.nameForm;
const submit = document.querySelectorAll("button[type='submit'");

//Функция создания карточки
function createCard(name, link) {
    return `<div class="place-card">
                <div class="place-card__image" style="background-image: url(${link})">
                    <button class="place-card__delete-icon"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name">${name}</h3>
                    <button class="place-card__like-icon"></button>
                </div>
             </div>`
}
//Функция добавления карточек
function cardAdd(Arr) {
    for (let i = 0; i < Arr.length; i++) {
        placesContainer.insertAdjacentHTML('beforeend', createCard(Arr[i].name, Arr[i].link));
        allCards = Array.from(document.querySelectorAll(".place-card"));
    }
    return placesContainer;
}

//Функция открытия формы
function openMenu(event) {
    let form;
    switch (true) {
        case event.target.classList.contains("button_edit"):
            headerAddingForm();
            document.querySelector("div.popup.popup-name").classList.toggle("popup_is-opened");
            break;
        case event.target.classList.contains("button_pluse"):
            form = document.querySelector("div.popup.popup-place button");
            document.querySelector("div.popup.popup-place").classList.toggle("popup_is-opened");
            break;
        case event.target.classList.contains("place-card__image"):
            document.querySelector("div.popup.popup-image").classList.toggle("popup_is-opened");
            break;
    }
    //Сбрасываем с кнопки класс, чтобы при повторном открытии она была сразу недоступна
    if (form != undefined) {
        form.classList.remove("button_active");
        form.classList.add("button_inactive");
        form.setAttribute("disabled", "");
    }
}

//Функция закрытия формы
function closeMenu() {
    event.target.closest(".popup").classList.toggle("popup_is-opened");
}

//Функция получения значений карточки из формы
function getFields(event) {
    event.preventDefault();

    const newCard = [
        {
            name: cardForm.elements.name.value,
            link: cardForm.elements.link.value
        }
    ];
    cardAdd(newCard);
    cardForm.reset();
    closeMenu();
}

//Функция на контейнер карточек
function handler(event) {
    //Функция удаления карточки
    function deleteCard(event) {
        placesContainer.removeChild(event.target.closest(".place-card"));
    }
    //Функция лайка
    function likeHandler(event) {
        event.target.classList.toggle("place-card__like-icon_liked");
    }
    //Функция открытия картинки
    function imageOpen(event) {
        const root = document.querySelector(".root");
        const image = event.srcElement.style.backgroundImage.replace("url(\"", "").replace("\")", "");
        //Создаем карточку для просмотра фото
        const imagePicture = document.querySelector(".popup__image");
        //Добавляем фон и имя из массива
        imagePicture.setAttribute("src", image);
    }
    switch (true) {
        case event.target.classList.contains("place-card__like-icon"):
            return likeHandler(event);
        case event.target.classList.contains("place-card__delete-icon"):
            return deleteCard(event);
        case event.target.classList.contains("place-card__image"):
            return imageOpen(event);
    }
}

//Функция заполнения карточки имени и профессии из разметки
function headerAddingForm() {
    const nameValue = document.querySelector("input[name=nameValue]");
    const profession = document.querySelector("input[name=profession]");

    nameValue.value = document.querySelector(".user-info__name").textContent;
    profession.value = document.querySelector(".user-info__job").textContent;
}

//Функция записи измененных значений заголовков 
function changeForm() {
    event.preventDefault();

    document.querySelector(".user-info__name").textContent = headerForm.elements.nameValue.value;
    document.querySelector(".user-info__job").textContent = headerForm.elements.profession.value;

    headerForm.reset();
    closeMenu();
}

//Функция смены активной и неактивной кнопки
function changeButtonClass(event) {
    let inputs = Array.from(event.target.closest(".popup__form").elements);
    let isValidForm = true;

    inputs.forEach((elem) => {
        if (elem.type != "submit") {
            if (!elem.validity.valid)
                isValidForm = false;
        }
    });

    inputs.forEach((elem) => {
        if (elem.type === "submit") {
            if (isValidForm) {
                elem.classList.add("button_active");
                elem.classList.remove("button_inactive");
                elem.removeAttribute("disabled");
            } else {
                elem.classList.remove("button_active");
                elem.classList.add("button_inactive");
                elem.setAttribute("disabled", "");
            }
        }
    });
}
//Функция валидации полей формы
function handleValidate(element) {
    changeButtonClass(element);

    let errorElement;
    let tempElement = element.target.validity;

    const errorMessage = {
        requiredText: "Это обязательное поле",
        lengthText: "Должно быть от 2 до 30 символов",
        urlType: "Здесь должна быть ссылка"
    }

    switch (true) {
        case element.target.classList.contains("popup__input_type_cardName"):
            errorElement = document.querySelector(`span[name="error-name"]`);
            break;
        case element.target.classList.contains("popup__input_type_cardLink"):
            errorElement = document.querySelector(`span[name="error-link"]`);
            break;
        case element.target.classList.contains("popup__input_type_profession"):
            errorElement = document.querySelector(`span[name="error-profession"]`);
            break;
        case element.target.classList.contains("popup__input_type_name"):
            errorElement = document.querySelector(`span[name="error-nameValue"]`);
            break;
    }

    if (!tempElement.valid) {
        errorElement.classList.add('error_invalid');
        errorElement.classList.remove('error-message');
        switch (true) {
            case tempElement.valueMissing:
                errorElement.textContent = errorMessage.requiredText;
                break;
            case tempElement.tooShort || tempElement.tooLong:
                errorElement.textContent = errorMessage.lengthText;
                break;
            case tempElement.typeMismatch:
                errorElement.textContent = errorMessage.urlType;
                break;
        }
    }
    else {
        errorElement.classList.remove('error_invalid');
        errorElement.classList.add('error-message');
        errorElement.textContent = '';
        return false;
    }
    return true;
}

//Добавляем все карточки из массива
cardAdd(initialCards);

//Обработчик общий
placesContainer.addEventListener("click", handler);

//Открытие и закрытие форм
addButton.addEventListener("click", openMenu);
editButton.addEventListener("click", openMenu);
allCards.forEach(element => element.addEventListener("click", openMenu));
closeButton.forEach(element => element.addEventListener("click", closeMenu));

//Добавляем карточку из формы или меняем заголовки
cardForm.addEventListener("submit", getFields);
headerForm.addEventListener("submit", changeForm);

//Валидация форм
cardForm.elements.name.addEventListener("input", handleValidate);
cardForm.elements.link.addEventListener("input", handleValidate);
headerForm.elements.nameValue.addEventListener("input", handleValidate);
headerForm.elements.profession.addEventListener("input", handleValidate);

/**
 * Здравствуйте.
 * Необходимо убрать обращение по индексу.inputs[2]
 * При добавлении или удалении элементов всё перестанет работать
 *
 * Создание контейнера карточки необходимо вынести в отдельную функцию.
 *
 * функцию  handleValidate(element)  можно разбить на небольшиуе функции
 *
 *
 * Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов'
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' }
 *
 * initialCards в отдельный файл, меньше строк, больше понимание,
 * подключить его можно через  <script src="js/initialCards.js"></script>
 *
 * Про создание карточки.
 * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного криэйта DOM-элементов.
       cardTemplate() {
           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                   </div>`
       };
 * Обратите внимание на использование backtick ` - это новый нововведение ES6, в нем можно корректно переносить строки и вставлять внутрь разметки JS-код.
 * Конкретнее про вставку JS-кода. Сейчас вы используете способ стандарта ES5 - ' + card.link + ‘. Грузно, не правда ли?
 * В ES6, используя ` бэктик, появляется возможность интерполяции `Строковое значение разметки ${console.log(‘А здесь уже JavaScript’)} `;
 * Обладая данными знаниями, возникает идея оптимизации createCard - теперь эта функция по прежнему принимает card, содержащую нужные параметры, которые
 * непосредственно вставляются в разметку.
       cardTemplate(string) {
           return `<div class="place-card">
                             ${string}
                   </div>`
       };
 *  Этот кусок разметки в дальнейшем можно вставить в DOM, воспользовавшись методом insertAdjacentHTML().
 *  Однако такой способ вставки пользовательских строк является менее безопасным
 *  https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML
 *
 * 2. Путь оптимизации уже текущего кода с использованием documentFragment и уменьшении работы над DOM.
 *     https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment - здесь можно почитать о данном методе и его кейсах.
 *     https://developer.mozilla.org/ru/docs/Web/HTML/Element/template - очень интересный тег, его также можно использовать для создание компонентов.
 *
 */


/**
 * Здравствуйте
 * И вы всё ровно обращаетесь по интедексу
 *
       inputs[inputs.length-1].classList.add("button_active");
       inputs[inputs.length-1].classList.remove("button_inactive");
       inputs[inputs.length-1].removeAttribute("disabled");
   } else {
       inputs[inputs.length-1].classList.remove("button_active");
       inputs[inputs.length-1].classList.add("button_inactive");
       inputs[inputs.length-1].setAttribute("disabled", "");
 *

 * При добавлении или удалении элементов всё перестанет работать, надо исправить.
 * Вы можете перебрать элементы, что вы и делаете выше
 *
 */

 //