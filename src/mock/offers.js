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
  const randomOffers = new Array(count)
    .fill(``)
    .map((it, i) => {
      return {
        title: `Random offer #${++i}`,
        price: getRandomIntegerNumber(10, 50),
        selected: getRandomBoolean(),
      };
  });

  return randomOffers;
};

const offersMap = new Map();

offerTypes.forEach((type) => {
  offersMap.set(type, getRandomOffers());
});

export const generateOffers = (type) => {
  return offersMap.get(type).filter((it) => {
    return it.selected;
  });
};
