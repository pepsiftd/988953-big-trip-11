import {getRandomIntegerNumber} from '@/utils/common';

const destinationNames = [
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

export const generateDestinations = () => {
  return destinationNames.map((it) => {
    return {
      name: it,
      description: getRandomDescription(),
      photos: getPhotosList(),
    };
  });
};

export const destinations = generateDestinations();
