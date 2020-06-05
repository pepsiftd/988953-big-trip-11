import EventModel from '@/models/event';

const isOnlineCheck = () => {
  return window.navigator.onLine;
};

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

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (isOnlineCheck()) {
      return this._api.getEvents()
        .then((events) => {
          const eventsRAW = events.map((event) => event.toRAW());

          this._store.setEvents(eventsRAW);

          return events;
        });
    }

    const storedEvents = this._store.getEvents();

    return Promise.resolve(EventModel.parseEvents(storedEvents));
  }

  getOffers() {
    if (isOnlineCheck()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setOffers(offers);

          return offers;
        });
    }

    return Promise.resolve(this._store.getOffers());
  }

  getDestinations() {
    if (isOnlineCheck()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setDestinations(destinations);

          return destinations;
        });
    }

    return Promise.resolve(this._store.getDestinations());
  }

  updateEvent(id, data) {
    if (isOnlineCheck()) {
      return this._api.updateEvent(id, data);
    }

    // TODO: реализовать логику при отсутствии интернета
    return Promise.reject(`Offline logic not implemented`);
  }

  createEvent(event) {
    if (isOnlineCheck()) {
      return this._api.createEvent(event);
    }

    // TODO: реализовать логику при отсутствии интернета
    return Promise.reject(`Offline logic not implemented`);
  }

  deleteEvent(id) {
    if (isOnlineCheck()) {
      return this._api.deleteEvent(id);
    }

    // TODO: реализовать логику при отсутствии интернета
    return Promise.reject(`Offline logic not implemented`);
  }
}
