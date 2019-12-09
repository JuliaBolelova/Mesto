//Создание контейнера для карточек
class CardList {
    constructor(placesContainer, cardTemplate) {
        this.cardTemplate = cardTemplate;
        this.placesContainer = placesContainer;
    }

    addCard(name, link) {
        const card = this.cardTemplate.create(name, link);
        this.placesContainer.insertAdjacentHTML('beforeend', card);
    }

    render(cards) {
        cards.forEach(card => {
            this.addCard(card.name, card.link);
        });
    }
}