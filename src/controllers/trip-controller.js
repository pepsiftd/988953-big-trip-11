import SortComponent from '@/components/trip-sort';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import EventController from '@/controllers/event';
import {splitEventsByDays} from '@/components/sort';
import {RenderPosition, render} from '@/utils/render';

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._eventControllers = [];
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();

    this._onDataChange = this._onDataChange.bind(this);
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index),
        newData,
        this._events.slice(index + 1));
    eventController.render(this._events[index]);
  }

  render(events) {
    this._events = events;

    // sorting line
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    // days and events container
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    // days and events
    const [eventsByDays, dates] = splitEventsByDays(events);

    // render days column
    const tripDaysListElement = this._container.querySelector(`.trip-days`);

    dates.forEach((day, i, arr) => {
      const getDifferenceInDays = (start, end) => {
        const MS_IN_DAY = 86400000;

        return Math.floor((end - start) / MS_IN_DAY);
      };

      const counter = getDifferenceInDays(arr[0], day);

      render(tripDaysListElement, new DayComponent(day, counter + 1), RenderPosition.BEFOREEND);
    });

    // render events inside of days
    const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

    tripEventsListElements.forEach((it, i) => {
      eventsByDays[i].forEach((event) => {
        const eventController = new EventController(it, this._onDataChange);
        this._eventControllers.push(eventController);
        eventController.render(event);
      });
    });
  }
}
