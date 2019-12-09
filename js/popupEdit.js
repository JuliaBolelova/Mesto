//Класс редактирования
class PopupEdit extends Popup {
    constructor(container, validation) {
        super(container);
        this.validation = validation;
    }

    open(event) {
        if (event.target.classList.contains("user-info__edit-button")) {
            this.container.classList.add("popup_is-opened");

            const [name, job] = this.form.elements;

            name.value = document.querySelector(".user-info__name").textContent;
            job.value = document.querySelector(".user-info__job").textContent;

            this.activateButton();
            this.removeErrors();
        }
    }

    close(event) {
        if (event.target.classList.contains("close__edit")) {
            this.container.classList.remove("popup_is-opened");
        }
    }

    submit(event) {
        event.preventDefault();

        const [name, job] = this.form.elements;

        document.querySelector(".user-info__name").textContent = name.value;
        document.querySelector(".user-info__job").textContent = job.value;

        this.container.classList.remove("popup_is-opened");
    }
}