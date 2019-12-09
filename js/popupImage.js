//Класс PopupImage
class PopupImage {
    constructor(container) {
      this.container = container;
    }
  
    open(event) {
      if (event.target.classList.contains("place-card__image")) {
        this.container.classList.add("popup_is-opened");
        this.container
            .querySelector(".popup-image")
            .setAttribute(
                `src`,
                `${event.target.style.backgroundImage.slice(5, -2)}`
            );
      }
    }
  
    close(event) {
      if (event.target.classList.contains("popup__close")) {
        this.container.classList.remove("popup_is-opened");
      }
    }
  }