import moment from 'moment';

const parseDate = (dateString) => {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(3, 5);
  return new Date(`${month}/${day}/20${dateString.slice(6)}`);
};

const getDuration = (startDate, endDate) => {
  const duration = moment.duration(endDate - startDate);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days ? addLeadingZero(days) + `D ` : ``}${hours ? addLeadingZero(hours) + `H ` : ``}${addLeadingZero(minutes)}M`;
};

const addLeadingZero = (time) => {
  return (`00` + time).slice(-2);
};

const getEventTypeMarkup = (offersData, type) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return capitalizedType + (offersData.TRANSFER.has(type) ? ` to` : ` in`);
};

const getAvailableOffersByType = (offersData, type) => {
  if (!type) {
    return [];
  }

  return offersData.TRANSFER.get(type) ? offersData.TRANSFER.get(type) : offersData.ACTIVITY.get(type);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const enableNewEventButton = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

const disableNewEventButton = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
};

export {
  parseDate,
  getDuration,
  addLeadingZero,
  getEventTypeMarkup,
  getAvailableOffersByType,
  getRandomArrayItem,
  getRandomIntegerNumber,
  getRandomBoolean,
  enableNewEventButton,
  disableNewEventButton
};
