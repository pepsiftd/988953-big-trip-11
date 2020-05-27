export default class EventsModel {
  constructor() {
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = events;
  }

  updateEvent(id, newEventData) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index),
        newEventData,
        this._events.slice(index + 1));

    return true;
  }
}
