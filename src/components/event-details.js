import {createElement} from "@/util";

const createEventDetailsTemplate = () => {
  return (
    `<section class="event__details">
      <!-- offer selectors markup --> offer selectors

      <!-- destination markup --> destination
    </section>`
  );
};

export default class EventDetails {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventDetailsTemplate();
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
