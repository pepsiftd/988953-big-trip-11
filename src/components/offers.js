import {createElement} from "@/util.js";

const createOfferMarkup = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createOffersTemplate = (offers) => {
  const MAX_OFFERS_AMOUNT = 3;

  const offersToShow = offers.slice(0, MAX_OFFERS_AMOUNT);
  const offersMarkup = offersToShow
    .map((offer) => {
      return createOfferMarkup(offer);
    })
    .join(`\n`);

  return (
    `<ul class="event__selected-offers">
      ${offersMarkup}
    </ul>`
  );
};

export default class Offers {
  contstructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createOffersTemplate(this._offers);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
