//Шаблон карточки
class Card {
    constructor() {
        /* this.name = name;
         this.link = link;
         this.create(this.name, this.link);*/
        console.log("Создаем карточку");
    }

    like(event) {
        if (event.target.classList.contains("place-card__like-icon")) {
            event.target.classList.toggle("place-card__like-icon_liked");
        }
    }

    remove(event) {
        if (event.target.classList.contains("place-card__delete-icon")) {
            placesContainer.removeChild(event.target.closest(".place-card"));
        }
    }

    create(name, link) {
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
}