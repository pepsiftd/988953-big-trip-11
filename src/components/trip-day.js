import AbstractComponent from '@/components/abstract-component';

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

export default class Day extends AbstractComponent {
  constructor(day, counter) {
    super();
    this._day = day;
    this._counter = counter;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._counter);
  }
}
