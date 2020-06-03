import moment from 'moment';

export const parseDate = (dateString) => {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(3, 5);
  return new Date(`${month}/${day}/20${dateString.slice(6)}`);
};

export const getDuration = (startDate, endDate) => {
  const duration = moment.duration(endDate - startDate);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days ? addLeadingZero(days) + `D ` : ``}${hours ? addLeadingZero(hours) + `H ` : ``}${addLeadingZero(minutes)}M`;
};

export const addLeadingZero = (time) => {
  return (`00` + time).slice(-2);
};

export const getEventTypeMarkup = (offersData, type) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return capitalizedType + (offersData.TRANSFER.has(type) ? ` to` : ` in`);
};

export const getAvailableOffersByType = (offersData, type) => {
  if (!type) {
    return [];
  }

  return offersData.TRANSFER.get(type) ? offersData.TRANSFER.get(type) : offersData.ACTIVITY.get(type);
};

export const getOfferById = (id, offers) => {
  return offers.find((offer) => id.includes(offer.id));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

export const enableNewEventButton = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

export const disableNewEventButton = () => {
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
};
