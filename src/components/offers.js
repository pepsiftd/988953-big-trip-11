const createOfferMarkup = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

export const createOffersTemplate = (offers) => {
  const OFFERS_AMOUNT = 3;

  const offersToShow = offers.slice(0, OFFERS_AMOUNT);
  const offersMarkup = offersToShow
    .map((offer) => {
      return createOfferMarkup(offer);
    })
    .join(`\n`);

  return offersMarkup;
};
