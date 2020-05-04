import {createElement} from '@/util.js';

const createDayTemplate = (day, counter) => {
  const shortDay = day.toString().slice(4, 10);
  const ISODay = day.toISOString(). slice(0, 10);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${ISODay}">${shortDay}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class Day {
  constructor(day, counter) {
    this._day = day;
    this._counter = counter;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._counter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
