import SortComponent from '@/components/trip-sort';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import EventController from '@/controllers/event';
import {splitEventsByDays, sortByStartDate} from '@/components/sort';
import {RenderPosition, render, remove} from '@/utils/render';

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (!isSuccess) {
      return;
    }

    eventController.render(newData, this._offersData, this._destinations);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onFilterChange() {
    this._updateEvents();
  }

  render(offersData, destinations) {
    this._offersData = offersData;
    this._destinations = destinations;

    // sorting line
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    const sortingType = `event`;
    const isSortedByDays = sortingType === `event`;
    this._renderEvents(isSortedByDays);
  }

  _renderEvents(isSortedByDays) {
    const events = this._eventsModel.getEvents();
    const eventsAll = this._eventsModel.getEventsAll();

    if (isSortedByDays) {
      // days and events container
      render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

      // days and events
      const [eventsByDays, dates] = splitEventsByDays(events);
      const tripStartDate = new Date(sortByStartDate(eventsAll)[0].dateStart.toISOString().slice(0, 10));

      // render days column
      const tripDaysListElement = this._container.querySelector(`.trip-days`);

      dates.forEach((day, i, arr) => {
        const getDifferenceInDays = (start, end) => {
          const MS_IN_DAY = 86400000;

          return Math.floor((end - start) / MS_IN_DAY);
        };

        const counter = getDifferenceInDays(tripStartDate, day);

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

  _updateEvents() {
    this._clearEvents();
    this._renderEvents(true);
  }

  _clearEvents() {
    this._eventControllers.forEach((controller) => controller.destroy());
    remove(this._daysListComponent);
  }
}
