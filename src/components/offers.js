const createOfferMarkup = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createOfferSelectorMarkup = (offer) => {
  const {id, title, price, selected} = offer;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${selected ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersTemplate = (offers) => {
  const OFFERS_AMOUNT = 3;

  const offersToShow = offers.slice(0, OFFERS_AMOUNT);
  const offersMarkup = offersToShow
    .map((offer) => {
      return createOfferMarkup(offer);
    })
    .join(`\n`);

  return offersMarkup;
};

const createOfferSelectorsTemplate = (offers) => {
  return offers
    .map((offer) => {
      return createOfferSelectorMarkup(offer);
    })
    .join(`\n`);
};

export {createOffersTemplate, createOfferSelectorsTemplate};
