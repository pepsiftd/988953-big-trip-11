import {getEventsByFilter} from '@/utils/filter';
import {FilterType} from '@/const';

export default class EventsModel {
  constructor() {
    this._events = [];

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  setActiveFilter(filterType) {
    this._activeFilterType = filterType;

    this._callHandlers(this._filterChangeHandlers);
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  addEvent(event) {
    this._tasks = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index),
        this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateEvent(id, newEventData) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index),
        newEventData,
        this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
