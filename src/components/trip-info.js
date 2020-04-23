import {sortByStartDate} from "@/components/sort";

const getTripTitle = (sortedEvents = []) => {
  if (sortedEvents.length < 1) {
    return ``;
  }

  const destinations = sortedEvents.map((it) => it.destination);
  let spots = [];
  let moves = -1;
  let spot = ``;

  destinations.forEach((it) => {
    if (it !== spot) {
      moves++;
      spots.push(it);
      spot = it;
    }
  });

  const lastSpot = spots[spots.length - 1];

  let titleMarkup;

  switch(moves) {
    case 0:
      titleMarkup = `${spots[0]}`;
      break;
    case 1:
      titleMarkup = `${spots[0]} &mdash; ${lastSpot}`;
      break;
    case 2:
      titleMarkup = `${spots[0]} &mdash; ${spots[1]} &mdash; ${lastSpot}`;
      break;
    default:
      titleMarkup = `${spots[0]} &mdash; ... &mdash; ${lastSpot}`;
      break;
  }

  return titleMarkup;
};

export const createTripInfoTemplate = (events) => {
  const sortedEvents = sortByStartDate(events.slice());
  const tripStartDate = sortedEvents[0].dateStart.toString().slice(4, 10);
  const tripEndDate = sortedEvents[sortedEvents.length - 1].dateEnd.toString().slice(4, 10);
  const endDate = tripStartDate.slice(0, 3) === tripEndDate.slice(0, 3) ? tripEndDate.slice(4) : tripEndDate;
  const infoTitle = getTripTitle(sortedEvents);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${infoTitle}</h1>

        <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>
    </section>`
  );
};
