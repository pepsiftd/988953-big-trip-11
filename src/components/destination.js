const createPhotoMarkup = (photosArray) => {
  return photosArray.map((photoLink) => {
    return `<img class="event__photo" src="${photoLink}" alt="Event photo">`;
  }).join(`\n`);
};

export const createDestinationMarkup = (event) => {
  const {description, photos = []} = event;

  const photosMarkup = createPhotoMarkup(photos);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>`
  );
};