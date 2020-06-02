import TripInfoController from '@/controllers/trip-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersController from '@/controllers/filters';
import StatsComponent from '@/components/stats';

import EventsModel from '@/models/events';

import {generateEvents} from '@/mock/events';
import {generateDestinations} from '@/mock/destinations';
import {generateOffers} from '@/mock/offers';

import {RenderPosition, render} from '@/utils/render';
import TripController from '@/controllers/trip-controller';
import {FilterType, TabName} from '@/const';

const EVENTS_AMOUNT = 5;

// generate mock
const destinations = generateDestinations();
const offers = generateOffers();
const events = generateEvents(EVENTS_AMOUNT, destinations, offers);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const tripInfoController = new TripInfoController(tripMainElement, eventsModel);
tripInfoController.render();

const tripTabsComponent = new TripTabsComponent();
render(tripControlsElement, tripTabsComponent, RenderPosition.BEFOREEND);

const filtersController = new FiltersController(tripControlsElement, eventsModel);
filtersController.render();

//   new event button
const newEventButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);
newEventButton.addEventListener(`click`, () => {
  tripController.createEvent();
  newEventButton.disabled = true;
  filtersController.setFilter(FilterType.EVERYTHING);
});

// main

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement, eventsModel);
tripController.render(offers, destinations);

const mainContainer = document.querySelector(`.page-main .page-body__container`);
const statsComponent = new StatsComponent(eventsModel);
render(mainContainer, statsComponent, RenderPosition.BEFOREEND);

tripTabsComponent.setChangeTabHandler((activeTab) => {
  console.log(activeTab);
  switch (activeTab) {
    case TabName.TABLE:
      tripController.show();
      statsComponent.hide();
      break;
    case TabName.STATS:
      tripController.hide();
      statsComponent.show()
      break;
  }
});
