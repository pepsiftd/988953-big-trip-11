import SortController from '@/controllers/sorting';
import {SortType} from '@/components/trip-sort';
import {sortByTime, sortByPrice} from '@/utils/sort';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import NoEventsComponent from '@/components/no-events';
import EventController, {EmptyEvent, Mode as EventMode} from '@/controllers/event';
import {splitEventsByDays, sortByStartDate} from '@/utils/sort';
import {RenderPosition, render, remove} from '@/utils/render';
import {enableNewEventButton} from '@/utils/common';
import {HIDDEN_CLASS} from '@/const';

export default class TripController {
  constructor(container, eventsModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;

    this._offersData = [];
    this._destinations = [];
    this._eventControllers = [];
    this._activeSortType = SortType.EVENT;
    this._daysListComponent = new DaysListComponent();
    this._noEventsComponent = new NoEventsComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortingChange = this._onSortingChange.bind(this);

    this._sortController = new SortController(container, this._onSortingChange, this._activeSortType);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(eventController, oldData, newData, isNoClose) {
    // если изменение данных при создании нового
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      // если при создании нажали Cancel
      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      // если при создании нажали Save
      } else {
        eventController.toggleSaveSaving();
        eventController.disableForm();
        this._api.createEvent(newData)
          .then((eventModel) => {
            eventController.toggleSaveSaving();
            eventController.destroy();
            this._eventsModel.addEvent(eventModel);
            this._updateEvents();
            this._eventControllers = [].concat(eventController, this._eventControllers);
          })
          .catch(() => {
            eventController.enableForm();
            eventController.toggleSaveSaving();
            eventController.shake();
          });
      }

      enableNewEventButton();
    // если изменение данных в существующем событии
    // если нажали Delete при редактировании существующего
    } else if (newData === null) {
      eventController.toggleDeleteDeleting();
      eventController.disableForm();
      this._api.deleteEvent(oldData.id)
        .then(() => {
          eventController.toggleDeleteDeleting();
          this._eventsModel.removeEvent(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          eventController.enableForm();
          eventController.toggleDeleteDeleting();
          eventController.shake();
        });

    // при редактировании существующего
    } else {
      eventController.toggleSaveSaving();
      eventController.disableForm();
      this._api.updateEvent(oldData.id, newData)
        .then((eventModel) => {
          eventController.toggleSaveSaving();

          const isSuccess = this._eventsModel.updateEvent(oldData.id, eventModel);

          if (!isSuccess) {
            return;
          }

          eventController.render(eventModel, this._offersData, this._destinations);

          if (!isNoClose) {
            eventController.setDefaultView();
            this._updateEvents();
          }
        })
        .catch(() => {
          eventController.enableForm();
          eventController.toggleSaveSaving();
          eventController.shake();
        });
    }
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onSortingChange(sortType) {
    this._activeSortType = sortType;
    this._updateEvents();
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });

    this._sortController.resetSortType();

    this._creatingEvent = new EventController(this._container, this._onDataChange, this._onViewChange, EventMode.ADDING);
    const isFirst = this._eventsModel.getEventsAll().length === 0;

    this._creatingEvent.render(EmptyEvent, this._offersData, this._destinations, isFirst);
    remove(this._noEventsComponent);
  }

  render() {
    this._offersData = this._eventsModel.getOffers();
    this._destinations = this._eventsModel.getDestinations();

    this._renderEvents();
  }

  _renderEvents() {
    const isNoEvents = this._eventsModel.getEventsAll().length === 0;

    if (isNoEvents) {
      this._sortController.destroy();
      if (!this._creatingEvent) {
        render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      }
      return;
    } else {
      this._sortController.render();
    }

    const isSortedByDays = this._activeSortType === SortType.EVENT;

    const events = this._eventsModel.getEvents();
    const eventsAll = this._eventsModel.getEventsAll();

    if (eventsAll.length === 0) {
      return;
    }

    // days and events container
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    const tripDaysListElement = this._container.querySelector(`.trip-days`);

    if (isSortedByDays) {
      // days and events
      const [eventsByDays, dates] = splitEventsByDays(events);
      const tripStartDate = new Date(sortByStartDate(eventsAll)[0].dateStart.toISOString().slice(0, 10));

      dates.forEach((day) => {
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
    } else {
      let sortedEvents;
      switch (this._activeSortType) {
        case SortType.TIME:
          sortedEvents = sortByTime(events);
          break;
        case SortType.PRICE:
          sortedEvents = sortByPrice(events);
          break;
      }

      render(tripDaysListElement, new DayComponent(), RenderPosition.BEFOREEND);

      const tripEventsListElement = tripDaysListElement.querySelector(`.trip-events__list`);
      sortedEvents.forEach((event) => {
        const eventController = new EventController(tripEventsListElement, this._onDataChange, this._onViewChange);
        this._eventControllers.push(eventController);
        eventController.render(event, this._offersData, this._destinations);
      });
    }
  }

  _updateEvents() {
    this._clearEvents();
    this._renderEvents();
  }

  _clearEvents() {
    this._eventControllers.forEach((controller) => controller.destroy());
    remove(this._daysListComponent);
  }
}
