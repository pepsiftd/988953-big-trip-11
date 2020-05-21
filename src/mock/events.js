import {destinations} from '@/mock/destinations';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean} from '@/utils/common';
import {generateOffers} from '@/mock/offers';

const MS_IN_DAY = 86400000;

const eventTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

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

const generateEvent = () => {
  const isFavorite = getRandomBoolean();
  const type = getRandomArrayItem(eventTypes);
  const destination = getRandomArrayItem(destinations);
  const dateStart = getRandomStartDate();
  const dateEnd = getRandomEndDate(dateStart);
  const price = getRandomIntegerNumber(10, 250);

  const offers = generateOffers(type);

  return {
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

const generateEvents = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
