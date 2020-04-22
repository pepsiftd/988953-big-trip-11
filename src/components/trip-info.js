import {sortByStartDate} from "@/components/sort";

export const createTripInfoTemplate = (events) => {
  const sortedEvents = events.slice();
  sortByStartDate(sortedEvents);
  const tripStartDate = sortedEvents[0].dateStart.toString().slice(4, 10);
  const tripEndDate = sortedEvents[sortedEvents.length - 1].dateEnd.toString().slice(4, 10);
  const endDate = tripStartDate.slice(0, 3) === tripEndDate.slice(0, 3) ? tripEndDate.slice(4) : tripEndDate;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>
    </section>`
  );
};
