import TripInfoComponent from '@/components/trip-info';
import PriceInfoComponent from '@/components/price-info';
import TripTabsComponent from '@/components/trip-tabs';
import FiltersComponent from '@/components/trip-filters';
import SortComponent from '@/components/trip-sort';
import EditEventComponent from '@/components/trip-edit';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import EventComponent from '@/components/trip-event';
import {generateEvents} from '@/mock/events';
import {splitEventsByDays} from '@/components/sort';
import DestinationComponent from '@/components/destination';
import SelectedOffersComponent from '@/components/offers';
import OffersComponent from '@/components/offers-full';

const EVENTS_AMOUNT = 20;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// generate mock
const events = generateEvents(EVENTS_AMOUNT);
const current = events[0];

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsFirstHeaderElement = tripControlsElement.querySelector(`h2`);

render(tripMainElement, createTripInfoTemplate(events), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createPriceInfoTemplate(events), `beforeend`);

render(tripControlsFirstHeaderElement, createTripTabsTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

// main

const tripEventsElement = document.querySelector(`.trip-events`);
const tripEventsFirstHeaderElement = tripEventsElement.querySelector(`h2`);

// // test edit form with custom event-object
// const testEvent = {
//   type: undefined,
//   destination: undefined,
//   dateStart: undefined,
//   dateEnd: undefined,
//   price: undefined,
//   offers: [{id: `rdo`, title: `11`, price: 20, selected: true}],
//   description: undefined,
//   photos: undefined,
// };
// render(tripEventsFirstHeaderElement, createTripEditFormTemplate(testEvent), `afterend`);

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
