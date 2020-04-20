import {getRandomIntegerNumber, getRandomBoolean} from '@/util';

const MAX_OFFERS = 5;

const eventTypes = [
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
  const randomOffers = new Array(count)
    .fill(``)
    .map((it, i) => {
      return {
        id: `rdo${i+1}`,
        title: `Random offer #${i+1}`,
        price: getRandomIntegerNumber(10, 50),
        selected: getRandomBoolean(),
      };
  });

  return randomOffers;
};

const offersMap = new Map();

eventTypes.forEach((type) => {
  offersMap.set(type, getRandomOffers());
});

export const generateOffers = (type) => {
  return offersMap.get(type);
};
