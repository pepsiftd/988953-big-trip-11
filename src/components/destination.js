import {createElement} from "@/util";

const createPhotoMarkup = (photosArray) => {
  return photosArray.map((photoLink) => {
    return `<img class="event__photo" src="${photoLink}" alt="Event photo">`;
  }).join(`\n`);
};

const createDestinationMarkup = (event) => {
  const {description, photos = []} = event;

  const photosMarkup = createPhotoMarkup(photos);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>`
  );
};

export default class Destination {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createDestinationMarkup(this._event);
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
