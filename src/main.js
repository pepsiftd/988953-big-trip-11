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
import {sortByStartDate} from '@/components/sort';

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

// empty form edit
render(tripEventsFirstHeaderElement, createTripEditFormTemplate(emptyEvent), `afterend`);

render(tripEventsFirstHeaderElement, createTripSortTemplate(), `afterend`);

render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// days and events
sortByStartDate(events);
console.log(events.map((it) => it.dateStart).join(`\n`));
const dates = events
  .map((event) => event.dateStart.toString().slice(4, 10))
  .filter((it, i, arr) => {
    return arr.indexOf(it) === i;
  });
console.log(dates.join(`\n`));

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

dates.forEach((day, counter) => {
  render(tripDaysListElement, createDayTemplate(day, counter + 1), `beforeend`);
});

const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

for (const event of events) {
  if (current === event) {
    continue;
  }
  render(tripEventsListElements[0], createEventTemplate(event), `beforeend`);
}
