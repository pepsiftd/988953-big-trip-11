import {getRandomArrayItem, getRandomIntegerNumber} from '@/util';
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

const getRandomDescription = () => {
  const template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const sentenceCount = getRandomIntegerNumber(1, 5);

  return template.split(`. `).slice(0, sentenceCount).join(`. `) + `.`;
};

const getPhotosList = (count) => {
  const photosAmount = count ? count : getRandomIntegerNumber(1, 5);
  const photosArray = [];
  for (let i = 0; i < photosAmount; i++) {
    photosArray[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }

  return photosArray;
};

const generateEvent = () => {
  const type = getRandomArrayItem(eventTypes);
  const destination = getRandomArrayItem(destinations);
  const dateStart = getRandomStartDate();
  const dateEnd = getRandomEndDate(dateStart);
  const price = getRandomIntegerNumber(10, 250);

  const offers = generateOffers(type);

  const description = getRandomDescription();
  const photos = getPhotosList();

  return {
    type,
    destination,
    dateStart,
    dateEnd,
    price,
    offers,
    description,
    photos,
  };
};

const generateEvents = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
