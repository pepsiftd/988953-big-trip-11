import {getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean} from '@/utils/common';

const MS_IN_DAY = 86400000;

const getRandomStartDate = () => {
  const MAX_DAYS_FROM_NOW = 20;
  const date = new Date();
  const difference = getRandomIntegerNumber(0, MAX_DAYS_FROM_NOW * MS_IN_DAY);
  date.setTime(date.getTime() + difference);

  return date;
};

const getRandomEndDate = (startDate) => {
  const MAX_DAYS_FROM_START = 2;
  const endDate = new Date(startDate.getTime());
  const duration = getRandomIntegerNumber(0, MAX_DAYS_FROM_START * MS_IN_DAY);
  endDate.setTime(endDate.getTime() + duration);

  return endDate;
};

const selectRandomOffers = (offers, type) => {
  const selectedOffers = offers.TRANSFER.get(type) ? offers.TRANSFER.get(type) : offers.ACTIVITY.get(type);
  return selectedOffers.map((it) => {
    return Object.assign({}, it, {
      selected: getRandomBoolean()
    });
  });
};

const getRandomType = (allOffers) => {
  const offerType = getRandomArrayItem(Object.entries(allOffers));
  return getRandomArrayItem(Array.from(offerType[1]))[0];
};

const generateEvent = (destinations, allOffers) => {
  const id = String(Math.random());
  const isFavorite = getRandomBoolean();
  const type = getRandomType(allOffers);
  const destination = getRandomArrayItem(destinations);
  const dateStart = getRandomStartDate();
  const dateEnd = getRandomEndDate(dateStart);
  const price = getRandomIntegerNumber(10, 250);

  const offers = selectRandomOffers(allOffers, type);

  return {
    id,
    type,
    isFavorite,
    destination: destination.name,
    dateStart,
    dateEnd,
    price,
    offers,
    description: destination.description,
    photos: destination.photos,
  };
};

const generateEvents = (amount, destinations, offers) => {
  return new Array(amount)
    .fill(``)
    .map(() => generateEvent(destinations, offers));
};

export {generateEvent, generateEvents};
