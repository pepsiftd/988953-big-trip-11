export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    return this._api.getEvents();
  }

  getOffers() {
    return this._api.getOffers();
  }

  getDestinations() {
    return this._api.getDestinations();
  }

  updateEvent(id, data) {
    return this._api.updateEvent(id, data);
  }

  createEvent(event) {
    return this._api.createEvent(event);
  }

  deleteEvent(id) {
    return this._api.deleteEvent(id);
  }
}
