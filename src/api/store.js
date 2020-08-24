const Key = {
  EVENTS: `events`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};

export default class Store {
  // {
//   big-trip-localstorage-v1: {
//     events: {
//      [id]: {},
//      [id]: {},
//     },
//     offers: [],
//     destinations: [],
//   }
// }

  /**
   * @param  {string} key - storage key of the app
   * @param  {Storage} storage - most likely window.localStorage or such
   */
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  _getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      throw new Error(`Can't read storage: ${err}`);
    }
  }

  _setItem(key, value) {
    const store = this._getItems();

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {
      [key]: value
    })));
  }

  getEvent(id) {
    return this.getEvents()[id];
  }

  getEvents() {
    return this._getItems()[Key.EVENTS];
  }

  getDestinations() {
    return this._getItems()[Key.DESTINATIONS];
  }

  getOffers() {
    return this._getItems()[Key.OFFERS];
  }

  removeEvent(id) {
    const storedEvents = this.getEvents();
    delete storedEvents[id];
    this.setEvents(storedEvents);
  }

  setEvent(id, event) {
    const storedEvents = this.getEvents();

    this.setEvents(Object.assign({}, storedEvents, {
      [id]: event
    }));
  }

  setEvents(events) {
    this._setItem(Key.EVENTS, events);
  }

  setOffers(offers) {
    this._setItem(Key.OFFERS, offers);
  }

  setDestinations(destinations) {
    this._setItem(Key.DESTINATIONS, destinations);
  }
}
