//Класс PopupPlace
class PopupPlace extends Popup {
    constructor(container, validation, cardList) {
      super(container);
      this.validation = validation;
      this.cardList = cardList;
    }
  
    open(event) {
      if (event.target.classList.contains("user-info__place-button")) {
        this.container.classList.add("popup_is-opened");
  
        this.disableButton();
        this.form.reset();
        this.removeErrors();
      }
    }
  
    close(event) {
      if (event.target.classList.contains("close__place")) {
        this.container.classList.remove("popup_is-opened");
      }
    }
  
    submit(event) {
      event.preventDefault();
  
      const [name, link] = this.form.elements;
      this.cardList.addCard(name.value, link.value);
  
      this.container.classList.remove("popup_is-opened");
    }
  }