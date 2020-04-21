import {createTripInfoTemplate} from '@/components/trip-info';
import {createPriceInfoTemplate} from '@/components/price-info';
import {createTripTabsTemplate} from '@/components/trip-tabs';
import {createTripFiltersTemplate} from '@/components/trip-filters';
import {createTripSortTemplate} from '@/components/trip-sort';
import {createTripEditFormTemplate} from '@/components/trip-edit';
import {createTripDaysListTemplate} from '@/components/days-list';
import {createDayTemplate} from '@/components/trip-day';
import {createEventTemplate} from '@/components/trip-event';
import {generateEvent, generateEvents} from '@/mock/events';

const EVENTS_AMOUNT = 10;

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
const events = generateEvents(EVENTS_AMOUNT);
const current = events[0];
const emptyEvent = {
  type: undefined,
  destination: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  price: undefined,
  offers: undefined,
  description: undefined,
  photos: undefined,
};

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsFirstHeaderElement = tripEventsElement.querySelector(`h2`);

render(tripEventsFirstHeaderElement, createTripEditFormTemplate(current), `afterend`);

// render(tripEventsFirstHeaderElement, createTripEditFormTemplate(emptyEvent), `afterend`);

render(tripEventsFirstHeaderElement, createTripSortTemplate(), `afterend`);

render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// days and events
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

render(tripDaysListElement, createDayTemplate(), `beforeend`);

const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

for (const event of events) {
  if (current === event) {
    continue;
  }
  render(tripEventsListElements[0], createEventTemplate(event), `beforeend`);
}
