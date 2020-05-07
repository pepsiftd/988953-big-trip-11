import {createDestinationMarkup} from '@/components/destination';
import {createOfferSelectorsMarkup} from '@/components/offers-full';

export const createEventDetailsMarkup = (event) => {
  const destinationMarkup = event.description ? createDestinationMarkup(event) : ``;
  const offersMarkup = event.offers ? createOfferSelectorsMarkup(event.offers) : ``;

  return (
    `<section class="event__details">
      ${offersMarkup}

      ${destinationMarkup}
    </section>`
  );
};
