import API from '@/api';
import Event from '@/models/event';

import TripInfoController from '@/controllers/trip-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersController from '@/controllers/filters';
import StatsComponent from '@/components/stats';

import EventsModel from '@/models/events';

import {RenderPosition, render} from '@/utils/render';
import TripController from '@/controllers/trip-controller';
import {FilterType, TabName} from '@/const';

const eventsModel = new EventsModel();
const api = new API();

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const tripInfoController = new TripInfoController(tripMainElement, eventsModel);

const tripTabsComponent = new TripTabsComponent();
render(tripControlsElement, tripTabsComponent, RenderPosition.BEFOREEND);

const filtersController = new FiltersController(tripControlsElement, eventsModel);

//   new event button
const newEventButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);
newEventButton.addEventListener(`click`, () => {
  tripController.createEvent();
  newEventButton.disabled = true;
  filtersController.setFilter(FilterType.EVERYTHING);
});

// main

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement, eventsModel, api);

const mainContainer = document.querySelector(`.page-main .page-body__container`);
const statsComponent = new StatsComponent(eventsModel);

tripTabsComponent.setChangeTabHandler((activeTab) => {
  switch (activeTab) {
    case TabName.TABLE:
      tripController.show();
      statsComponent.hide();
      break;
    case TabName.STATS:
      tripController.hide();
      statsComponent.show();
      break;
  }
});

Promise.all([
  api.getEvents(),
  api.getOffers(),
  api.getDestinations()
]).then(([events, offers, destinations]) => {
  eventsModel.setEvents(events);
  eventsModel.setOffers(offers);
  eventsModel.setDestinations(destinations);
  console.log(eventsModel.getEvents());
  console.log(eventsModel.getOffers());
  console.log(eventsModel.getDestinations());
})
.then(() => {
  filtersController.render();
  tripController.render();
  tripInfoController.render();
  render(mainContainer, statsComponent, RenderPosition.BEFOREEND);
});
