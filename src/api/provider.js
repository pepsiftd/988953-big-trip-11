import EventModel from '@/models/event-model';
import {generateId} from '@/utils/common';

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
      return this._api.updateEvent(id, data)
        .then((newEvent) => {
          this._store.setEvent(id, newEvent.toRAW());

          return newEvent;
        });
    }

    const localEvent = EventModel.create(data);

    this._store.setEvent(id, localEvent.toRAW());

    return Promise.resolve(localEvent);
  }

  createEvent(event) {
    if (isOnlineCheck()) {
      return this._api.createEvent(event)
        .then((newEvent) => {
          this._store.setEvent(newEvent.id, newEvent.toRAW());

          return newEvent;
        });
    }

    const localEvent = EventModel.create(event);

    this._store.setEvent(generateId(), localEvent.toRAW());

    return Promise.resolve(localEvent);
  }

  deleteEvent(id) {
    if (isOnlineCheck()) {
      return this._api.deleteEvent(id)
        .then((response) => {
          this._store.removeEvent(id);
          return response;
        })
        .catch(console.log);
    }

    this._store.removeEvent(id);

    return Promise.resolve({
      status: 200,
      body: `OK`,
    });
  }
}
