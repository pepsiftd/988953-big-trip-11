const createOfferSelectorMarkup = (offer) => {
  const {id, title, price, selected} = offer;
  const isCheckedMarkup = selected ? `checked` : ``;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${isCheckedMarkup}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

export const createOfferSelectorsMarkup = (offers = []) => {
  if (offers.length < 1) {
    return ``;
  }

  const offersMarkup = offers.map((offer) => createOfferSelectorMarkup(offer)).join(`\n`);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>`
  );
};
