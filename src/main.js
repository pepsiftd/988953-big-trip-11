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
import {RenderPosition, render} from '@/utils/render';

const EVENTS_AMOUNT = 20;

// generate mock
const events = generateEvents(EVENTS_AMOUNT);

// header
const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

render(tripMainElement, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, new PriceInfoComponent(events).getElement(), RenderPosition.BEFOREEND);

render(tripControlsElement, new TripTabsComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);

// main

const tripEventsElement = document.querySelector(`.trip-events`);

// sorting line
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
// days and events container
render(tripEventsElement, new DaysListComponent().getElement(), RenderPosition.BEFOREEND);

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

  render(tripDaysListElement, new DayComponent(day, counter + 1).getElement(), RenderPosition.BEFOREEND);
});

const renderEvent = (eventListElement, event) => {
  const rollupButtonClickHandler = () => {
    eventListElement.replaceChild(editEventComponent.getElement(), eventComponent.getElement());
  };

  const editFormSubmitHandler = () => {
    eventListElement.replaceChild(eventComponent.getElement(), editEventComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const rollupButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);

  const editEventComponent = new EditEventComponent(event);
  const eventEditForm = editEventComponent.getElement();

  rollupButton.addEventListener(`click`, rollupButtonClickHandler);
  eventEditForm.addEventListener(`submit`, editFormSubmitHandler);

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

// render events inside of days
const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

tripEventsListElements.forEach((it, i) => {
  eventsByDays[i].forEach((event) => {
    renderEvent(it, event);
  });
});
