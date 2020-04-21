export const createDayTemplate = (day, counter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="2019-03-18">${day}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
