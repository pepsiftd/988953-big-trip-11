import TripInfoComponent from '@/components/trip-info';
import PriceInfoComponent from '@/components/price-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersComponent from '@/components/trip-filters';

import {generateEvents} from '@/mock/events';
import {generateDestinations} from '@/mock/destinations';
import {generateOffers} from '@/mock/offers';

import {RenderPosition, render} from '@/utils/render';
import TripController from '@/controllers/trip-controller';

const EVENTS_AMOUNT = 20;

// generate mock
const destinations = generateDestinations();
const offers = generateOffers();
const events = generateEvents(EVENTS_AMOUNT, destinations, offers);

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, new PriceInfoComponent(events), RenderPosition.BEFOREEND);

render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FiltersComponent(), RenderPosition.BEFOREEND);

// main

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement);
tripController.render(events, offers, destinations);
