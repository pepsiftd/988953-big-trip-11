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
import {splitEventsByDays} from '@/components/sort';

const EVENTS_AMOUNT = 13;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate mock
const events = generateEvents(EVENTS_AMOUNT);
const current = events[0];
const emptyEvent = {
  type: `taxi`,
  destination: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  price: undefined,
  offers: [{id: `rdo`, title: `11`, price: 20, selected: true}],
  description: undefined,
  photos: undefined,
};

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`h2`);

render(tripMainElement, createTripInfoTemplate(events), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createPriceInfoTemplate(), `beforeend`);

render(tripControlsFirstHeaderElement, createTripTabsTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

// main

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsFirstHeaderElement = tripEventsElement.querySelector(`h2`);

// empty form edit
render(tripEventsFirstHeaderElement, createTripEditFormTemplate(emptyEvent), `afterend`);
// sorting line
render(tripEventsFirstHeaderElement, createTripSortTemplate(), `afterend`);
// days and events container
render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// days and events
const [eventsByDays, dates] = splitEventsByDays(events);

// render days column
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

dates.forEach((day, i, arr) => {
  const getDifferenceInDays = (start, end) => {
    const MS_IN_DAY = 86400000;

    return Math.floor((end - start) / MS_IN_DAY);
  };

  const counter = getDifferenceInDays(arr[0], day);

  render(tripDaysListElement, createDayTemplate(day, counter + 1), `beforeend`);
});

// render events inside of days
const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

tripEventsListElements.forEach((it, i) => {
  eventsByDays[i].forEach((event) => {
    if (event !== current) {
      render(it, createEventTemplate(event), `beforeend`);
    } else {
      render(it, createTripEditFormTemplate(current), `beforeend`);
    }
  });
});
