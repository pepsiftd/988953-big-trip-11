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
  const MS_IN_HOUR = 3600000;
  const MS_IN_MINUTE = 60000;
  const ms = endDate - startDate;
  let minutes = ms % MS_IN_HOUR;
  const hours = (ms - minutes) / MS_IN_HOUR;
  minutes /= MS_IN_MINUTE;

  return `${hours ? hours + `H ` : ``}${minutes}M`;
};

export const createEventTemplate = () => {
  const type = `Taxi`.toLowerCase();
  const typeMarkup = `Taxi to`;
  const destination = `Amsterdam`;
  const dateStart = new Date(`2019-03-18T05:30`);
  const dateEnd = new Date(`2019-03-18T11:00`);
  const startTime = `${getHours(dateStart)}:${getMinutes(dateStart)}`;
  const endTime = `${getHours(dateEnd)}:${getMinutes(dateEnd)}`;
  const duration = getDuration(dateStart, dateEnd);

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
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
