import {createOfferSelectorsTemplate} from "@/components/offers";

const createPhotoMarkup = (photosArray) => {
  return photosArray.map((photoLink) => {
    return `<img class="event__photo" src="${photoLink}" alt="Event photo">`
  }).join(`\n`);
};

export const createEventDetailsMarkup = (offers, description, photos) => {
  const offersMarkup = createOfferSelectorsTemplate(offers);

  const photosMarkup = createPhotoMarkup(photos);
  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosMarkup}
          </div>
        </div>
      </section>
    </section>`
  );
};
