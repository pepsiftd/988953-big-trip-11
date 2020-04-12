import {createTripInfoTemplate} from '@/components/trip-info';
import {createPriceInfoTemplate} from '@/components/price-info';
import {createTripTabsTemplate} from '@/components/trip-tabs';
import {createTripFiltersTemplate} from '@/components/trip-filters';
import {createTripSortTemplate} from '@/components/trip-sort';
import {createTripEditFormTemplate} from '@/components/trip-edit';
import {createTripDaysListTemplate} from '@/components/days-list';
import {createDayTemplate} from '@/components/trip-day';
import {createEventTemplate} from '@/components/trip-event';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`h2`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createPriceInfoTemplate(), `beforeend`);

render(tripControlsFirstHeaderElement, createTripTabsTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

// main

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsFirstHeaderElement = tripEventsElement.querySelector(`h2`);

render(tripEventsFirstHeaderElement, createTripEditFormTemplate(), `afterend`);
render(tripEventsFirstHeaderElement, createTripSortTemplate(), `afterend`);

render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// days and events
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

render(tripDaysListElement, createDayTemplate(), `beforeend`);

const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

render(tripEventsListElements[0], createEventTemplate(), `beforeend`);
render(tripEventsListElements[0], createEventTemplate(), `beforeend`);
render(tripEventsListElements[0], createEventTemplate(), `beforeend`);
