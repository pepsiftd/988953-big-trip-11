import API from '@/api/api';
import Store from '@/api/store';
import Provider from '@/api/provider';

import TripInfoController from '@/controllers/trip-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersController from '@/controllers/filters';
import StatsComponent from '@/components/stats';
import LoadingComponent from '@/components/loading';

import EventsModel from '@/models/events';

import {RenderPosition, render, remove} from '@/utils/render';
import {disableNewEventButton, enableNewEventButton} from '@/utils/common';
import TripController from '@/controllers/trip-controller';
import {FilterType, TabName} from '@/const';

const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const eventsModel = new EventsModel();
const api = new API();
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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
  disableNewEventButton();
  filtersController.setFilter(FilterType.EVERYTHING);
});

// main

const tripEventsElement = document.querySelector(`.trip-events`);
const loadingComponent = new LoadingComponent();
render(tripEventsElement, loadingComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(tripEventsElement, eventsModel, apiWithProvider);

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
      statsComponent.rerender();
      statsComponent.show();
      break;
  }
});

Promise.all([
  apiWithProvider.getEvents(),
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations()
]).then(([events, offers, destinations]) => {
  eventsModel.setEvents(events);
  console.log(eventsModel.getEvents());
  eventsModel.setOffers(offers);
  console.log(eventsModel.getOffers());
  eventsModel.setDestinations(destinations);
  console.log(eventsModel.getDestinations());
})
.then(() => {
  remove(loadingComponent);
  filtersController.render();
  tripController.render();
  tripInfoController.render();
  render(mainContainer, statsComponent, RenderPosition.BEFOREEND);
  enableNewEventButton();
})
.catch(() => {
  remove(loadingComponent);
  filtersController.render();
  tripController.render();
  tripInfoController.render();
  render(mainContainer, statsComponent, RenderPosition.BEFOREEND);
  enableNewEventButton();
});
