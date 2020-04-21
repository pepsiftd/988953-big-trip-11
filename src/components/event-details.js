import {createOfferSelectorsTemplate} from "@/components/offers";

const createPhotoMarkup = (photosArray) => {
  return photosArray.map((photoLink) => {
    return `<img class="event__photo" src="${photoLink}" alt="Event photo">`
  }).join(`\n`);
};

const createDestinationMarkup = (description, photos) => {
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

export const createEventDetailsMarkup = (offers, description, photos) => {
  const offersMarkup = createOfferSelectorsTemplate(offers);
  const destinationMarkup = description || photos ? createDestinationMarkup(description, photos) : ``;

  return (
    `<section class="event__details">
      ${offersMarkup}

      ${destinationMarkup}
    </section>`
  );
};
