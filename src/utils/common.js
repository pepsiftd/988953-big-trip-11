export const getEventTypeMarkup = (offersData, type) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return capitalizedType + offersData.transfer.has(type) ? ` to` : ` in`;
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
