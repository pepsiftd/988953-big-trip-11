import TripInfoComponent from '@/components/trip-info';
import PriceInfoComponent from '@/components/price-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersController from '@/controllers/filters';

import EventsModel from '@/models/events';

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

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, new PriceInfoComponent(events), RenderPosition.BEFOREEND);

render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);

const filtersController = new FiltersController(tripControlsElement, eventsModel);
filtersController.render();

// main

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement, eventsModel);
tripController.render(offers, destinations);
