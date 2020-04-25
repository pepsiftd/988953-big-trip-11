import {createTypeListMarkup} from "@/components/event-type-list";
import {createEventDetailsMarkup} from "@/components/event-details";

const eventTypeToMarkup = {
  'taxi': `Taxi to`,
  'bus': `Bus to`,
  'train': `Train to`,
  'ship': `Ship to`,
  'transport': `Transport to`,
  'drive': `Drive to`,
  'flight': `Flight to`,
  'check-in': `Check-in in`,
  'sightseeing': `Sightseeing in`,
  'restaurant': `Restaurant in`,
};

const destinations = [
  `Amsterdam`,
  `London`,
  `Barcelona`,
  `Machu-Pikchu`,
  `Rome`,
  `Pataya`,
  `Sidney`,
  `Melbourne`,
  `St.Petersburg`,
  `Vilnius`,
  `Budapest`
];

const getDestinationsListMarkup = () => {
  return destinations
    .map((it) => {
      return `<option value="${it}"></option>`;
    }).join(`\n`);
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

export const createTripEditFormTemplate = (event) => {
  const {destination = ``, dateStart = new Date(), dateEnd = new Date(), price = ``, offers = [], description = ``, photos = []} = event;

  const type = event.type ? event.type.toLowerCase() : ``;
  const typeMarkup = event.type ? eventTypeToMarkup[type] : ``;
  const typeList = createTypeListMarkup(type);

  const startTime = `${getFormattedDate(dateStart)} ${getHours(dateStart)}:${getMinutes(dateStart)}`; // 18/03/19 00:00 format
  const endTime = `${getFormattedDate(dateEnd)} ${getHours(dateEnd)}:${getMinutes(dateEnd)}`;

  const destinationsList = getDestinationsListMarkup();

  const eventDetails = destination || type ? createEventDetailsMarkup(offers, description, photos) : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : ``}
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${typeList}
          </div>
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      ${eventDetails}
    </form>`
  );
};
