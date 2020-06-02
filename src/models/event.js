export default class EventModel {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.destination = data[`destination`][`name`];
    this.dateStart = new Date(data[`date_from`]);
    this.dateEnd = new Date(data[`date_to`]);
    this.price = parseInt(data[`base_price`]);
    this.offers = data[`offers`];
  }

  static parseEvent(data) {
    return new EventModel(data);
  }

  static parseEvents(data) {
    return data.map(EventModel.parseEvent);
  }
}
