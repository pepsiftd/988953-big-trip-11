export const createDayTemplate = (day, counter) => {
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
