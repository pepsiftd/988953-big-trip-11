import {createElement} from "@/util.js";

const getTotalCost = (events) => {
  return events.reduce((total, event) => {
    const offersCost = event.offers[0] ? event.offers.filter((it) => it.selected).reduce(((offersTotal, offer) => offersTotal + offer.price), 0) : 0;

    return total + event.price + offersCost;
  }, 0);
};

const createPriceInfoTemplate = (events) => {
  const totalCost = getTotalCost(events);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};

export default class PriceInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createPriceInfoTemplate(this._events);
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
