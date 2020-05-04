import {createDestinationMarkup} from '@/components/destination';
import {createOfferSelectorsMarkup} from '@/components/offers-full';

export const createEventDetailsMarkup = (event) => {
  const destinationMarkup = createDestinationMarkup(event);
  const offersMarkup = createOfferSelectorsMarkup(event.offers);

  return (
    `<section class="event__details">
      ${offersMarkup}

      ${destinationMarkup}
    </section>`
  );
};
