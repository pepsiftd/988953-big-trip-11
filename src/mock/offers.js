import {getRandomIntegerNumber} from '@/util';

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
      return `Random offer #${++i}`;
  });
};

export const generateOffers = () => {

  return [{
    title: `Order Uber`,
    price: 20,
  },
  {
    title: `Add luggage`,
    price: 30,
  },
  {
    title: `Rent a car`,
    price: 200,
  }];
};
