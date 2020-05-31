export const getDuration = (startDate, endDate) => {
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
