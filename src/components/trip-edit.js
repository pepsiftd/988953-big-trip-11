import AbstractSmartComponent from '@/components/abstract-smart-component';
import {createEventDetailsMarkup} from '@/components/event-details';
import {createTypeListMarkup} from '@/components/event-type-list';
import {getEventTypeMarkup} from '@/utils/common';

const getDestinationsListMarkup = (destinationNames) => {
  return destinationNames
    .map((it) => {
      return `<option value="${it}"></option>`;
    }).join(`\n`);
};

const getFavoriteButtonMarkup = (isNew, isFavorite) => {
  const favoriteCheckedMarkup = isFavorite ? `checked` : ``;

  return isNew ? `` : (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteCheckedMarkup}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
};

const addLeadingZero = (string) => {
  return (`00` + string).slice(-2);
};

const getHours = (date) => {
  return addLeadingZero(date.getHours());
};

const getMinutes = (date) => {
  return addLeadingZero(date.getMinutes());
};

const getFormattedDate = (date) => {
  const year = addLeadingZero(date.getFullYear());
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());

  return `${year}/${month}/${day}`; // 18/03/19 format
};

const createTripEditFormTemplate = (event, offersData, destinations, options = {}) => {
  const {
    isNewEvent = false,
    destination = ``,
    dateStart = new Date(),
    dateEnd = new Date(),
    price = ``,
  } = event;

  const {
    isFavorite,
  } = options;

  const type = options.type ? options.type.toLowerCase() : ``;
  const typeMarkup = options.type ? getEventTypeMarkup(offersData, type) : ``;

  const typeListMarkup = createTypeListMarkup(event, offersData);

  const startTime = `${getFormattedDate(dateStart)} ${getHours(dateStart)}:${getMinutes(dateStart)}`; // 18/03/19 00:00 format
  const endTime = `${getFormattedDate(dateEnd)} ${getHours(dateEnd)}:${getMinutes(dateEnd)}`;


  const destinationNames = destinations.map((it) => it.name);
  const destinationsList = getDestinationsListMarkup(destinationNames);

  const resetButtonMarkup = `<button class="event__reset-btn" type="reset">${isNewEvent ? `Cancel` : `Delete`}</button>`
  const favoriteButtonMarkup = getFavoriteButtonMarkup(isNewEvent, isFavorite);
  const rollupButtonMarkup = isNewEvent ? `` : (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`);

  const eventDetailsMarkup = destination && (event.description || Boolean(event.offers)) ? createEventDetailsMarkup(event) : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : ``}
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${typeListMarkup}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeMarkup}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${resetButtonMarkup}

        ${favoriteButtonMarkup}

        ${rollupButtonMarkup}
      </header>
      ${eventDetailsMarkup}
    </form>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event, offersData, destinations) {
    super();
    this._event = event;
    this._offersData = offersData;
    this._destinations = destinations;

    this._submitHandler = null;

    this._isFavorite = event.isFavorite;
    this._eventType = event.type;

    this._subscribeOnEvents();
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteClickHandler(this._deleteClickHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditFormTemplate(
      this._event,
      this._offersData,
      this._destinations,
      {
        type: this._eventType,
        isFavorite: this._isFavorite,
      });
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().addEventListener(`submit`, handler);
  }

  setDeleteClickHandler(handler) {
    this._deleteClickHandler = handler;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
  }

  reset() {
    this._isFavorite = this._event.isFavorite;

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const favoriteButton = element.querySelector(`.event__favorite-btn`);
    if (favoriteButton) {
      favoriteButton.addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        this.rerender();
      });
    }

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._eventType = evt.target.value;
      this.rerender();
    });
  }

  // setFavoriteClickHandler(handler) {
  //   this._favoriteClickHandler = handler;
  //   const favoriteButton = this.getElement().querySelector(`.event__favorite-btn`);
  //   if (favoriteButton) {
  //     favoriteButton.addEventListener(`click`, handler);
  //   }
  // }

  // setEventTypeChangeHandler(handler) {
  //   this._eventTypeChangeHandler = handler;
  //   const eventTypeGroups = this.getElement().querySelectorAll(`.event__type-group`);

  //   eventTypeGroups.forEach((group) => {
  //     group.addEventListener(`change`, handler);
  //   });
  // }

  // setDestinationChangeHandler(handler) {
  //   this._destinationChangeHandler = handler;
  //   this.getElement().querySelector(`.event__field-group--destination input`)
  //     .addEventListener(`change`, handler);
  // }

  validateForm() {
    const destinationInput = this.getElement().querySelector(`.event__input--destination`);
    const priceInput = this.getElement().querySelector(`.event__field-group--price`);

    if (!this._destinations.some((destination) => destination === destinationInput.value)) {
      destinationInput.setCustomValidity(`Выберите пункт назначения из списка возможных`);
    }
  }
}
