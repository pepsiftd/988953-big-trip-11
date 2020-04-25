const getTotalCost = (events) => {
  return events.reduce((total, event) => {
    const offersCost = event.offers[0] ? event.offers.filter((it) => it.selected).reduce(((offersTotal, offer) => offersTotal + offer.price), 0) : 0;

    return total + event.price + offersCost;
  }, 0);
};

export const createPriceInfoTemplate = (events) => {
  const totalCost = getTotalCost(events);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};
