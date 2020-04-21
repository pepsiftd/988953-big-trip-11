import {createOffersTemplate} from "@/components/offers";

const EventTypes = {
  'taxi': `Taxi to `,
  'bus': `Bus to `,
  'train': `Train to `,
  'ship': `Ship to `,
  'transport': `Transport to `,
  'drive': `Drive to `,
  'flight': `Flight to `,
  'check-in': `Check-in in `,
  'sightseeing': `Sightseeing in`,
  'restaurant': `Restaurant in`,
};

const addLeadingZero = (time) => {
  return (`00` + time).slice(-2);
};

const getHours = (date) => {
  return addLeadingZero(date.getHours());
};

const getMinutes = (date) => {
  return addLeadingZero(date.getMinutes());
};

const getDuration = (startDate, endDate) => {
  const MS_IN_DAY = 86400000;
  const MS_IN_HOUR = 3600000;
  const MS_IN_MINUTE = 60000;
  let ms = endDate - startDate;

  const days = Math.floor(ms / MS_IN_DAY);
  ms -= days * MS_IN_DAY;
  const hours = Math.floor(ms / MS_IN_HOUR);
  ms -= hours * MS_IN_HOUR;
  const minutes = Math.floor(ms / MS_IN_MINUTE);

  return `${days ? days + `D ` : ``}${hours ? hours + `H ` : ``}${minutes}M`;
};

export const createEventTemplate = (event) => {
  const {destination, dateStart, dateEnd, price, offers} = event;
  const type = event.type.toLowerCase();
  const typeMarkup = EventTypes[type];
  const startTime = `${getHours(dateStart)}:${getMinutes(dateStart)}`;
  const endTime = `${getHours(dateEnd)}:${getMinutes(dateEnd)}`;
  const duration = getDuration(dateStart, dateEnd);

  const offersMarkup = createOffersTemplate(offers.filter((it) => it.selected));

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
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
