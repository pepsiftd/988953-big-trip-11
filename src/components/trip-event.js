import AbstractComponent from '@/components/abstract-component';
import {createOffersTemplate} from '@/components/offers';
import {getDuration, getEventTypeMarkup} from '@/utils/common';
import moment from 'moment';

const getFormattedTime = (date) => {
  return moment(date).format(`HH:MM`);
};

const createEventTemplate = (event, offersData) => {
  const {
    destination = ``,
    dateStart,
    dateEnd,
    price,
    offers = [],
  } = event;

  const type = event.type ? event.type.toLowerCase() : ``;
  const typeMarkup = event.type ? getEventTypeMarkup(offersData, type) : ``;
  const startTime = dateStart ? getFormattedTime(dateStart) : ``;
  const endTime = dateEnd ? getFormattedTime(dateEnd) : ``;
  const duration = dateStart && dateEnd ? getDuration(dateStart, dateEnd) : ``;

  const selectedOffers = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeMarkup} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        ${selectedOffers}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event, offersData) {
    super();
    this._event = event;
    this._offersData = offersData;
  }

  getTemplate() {
    return createEventTemplate(this._event, this._offersData);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
