import SortComponent from '@/components/trip-sort';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import EventController from '@/controllers/event';
import {splitEventsByDays} from '@/components/sort';
import {RenderPosition, render} from '@/utils/render';

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._offersData = [];
    this._destinations = [];
    this._eventControllers = [];
    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if(!isSuccess) {
      return;
    }

    eventController.render(newData, this._offersData, this._destinations);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  render(offersData, destinations) {
    const events = this._eventsModel.getEvents();
    this._offersData = offersData;
    this._destinations = destinations;

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
        const eventController = new EventController(it, this._onDataChange, this._onViewChange);
        this._eventControllers.push(eventController);
        eventController.render(event, this._offersData, this._destinations);
      });
    });
  }
}
