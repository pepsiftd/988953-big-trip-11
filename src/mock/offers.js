import {getRandomIntegerNumber, getRandomBoolean} from '@/util';

const MAX_OFFERS = 5;

const offerTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const getRandomOffers = () => {
  const count = getRandomIntegerNumber(0, MAX_OFFERS);
  const randomOffers = new Array(count);
  return randomOffers
    .fill(``)
    .map((it, i) => {
      return {
        title: `Random offer #${++i}`,
        price: getRandomIntegerNumber(10, 50),
        selected: getRandomBoolean(),
      };
  });
};

export const generateOffers = () => {

  return getRandomOffers().filter((it) => {
    return it.selected;
  });
};
