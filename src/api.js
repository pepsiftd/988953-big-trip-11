import Event from '@/models/event';

const SERVER_URL = `https://11.ecmascript.pages.academy/big-trip/`;
const AUTHORIZATION = `Basic gz1s4h387jh654a`;

const URL = {
  EVENTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor() {
    this._authorization = AUTHORIZATION;
  }

  getEvents() {
    return this._load(URL.EVENTS)
      .then(Event.parseEvents);
  }

  getOffers() {
    return this._load(URL.OFFERS);
  }

  getDestinations() {
    return this._load(URL.DESTINATIONS);
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    return this._load(`${URL.EVENTS}/${id}`,
        Method.PUT,
        JSON.stringify(data.toRAW()),
        headers).then(Event.parseEvent);
  }

  createEvent(event) {
    console.log(event);
    return this._load(URL.EVENTS,
        Method.POST,
        JSON.stringify(event.toRAW()),
        new Headers({"Content-Type": `application/json`})
    ).then(Event.parseEvent);
  }

  _load(sub, method = Method.GET, body = null, headers = new Headers()) {
    headers.append(`Authorization`, this._authorization);

    return fetch(SERVER_URL + sub, {
      headers,
      method,
      body,
    }).then(checkStatus)
    .then((response) => response.json());
  }
}
