import {getRandomIntegerNumber} from '@/utils/common';

const MAX_OFFERS = 5;

export const eventTypes = {
  transfer:
  [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  activity:
  [
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]
};

const getRandomOffers = () => {
  const count = getRandomIntegerNumber(0, MAX_OFFERS);
  const randomOffers = new Array(count)
    .fill(``)
    .map((it, i) => {
      return {
        id: `rdo${i + 1}`,
        title: `Random offer #${i + 1}`,
        price: getRandomIntegerNumber(10, 50),
      };
    });

  return randomOffers;
};

const activityOffersMap = new Map();
const transferOffersMap = new Map();

eventTypes.transfer.forEach((type) => {
  transferOffersMap.set(type, getRandomOffers());
});

eventTypes.activity.forEach((type) => {
  activityOffersMap.set(type, getRandomOffers());
});

export const generateOffers = () => {
  return {
    transfer: transferOffersMap,
    activity: activityOffersMap,
  };
};
