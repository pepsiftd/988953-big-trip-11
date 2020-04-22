const splitEventsByDays = (events) => {
  let date = ``;
  let counter = -1;
  const eventsByDays = [];
  const uniqueDates = [];

  events.forEach((it) => {
    if (date === it.dateStart.toISOString().slice(0, 10)) {
      eventsByDays[counter].push(it);
    } else {
      eventsByDays[++counter] = [it];
      date = it.dateStart.toISOString().slice(0, 10);
      uniqueDates.push(new Date(date));
    }
  });

  return [eventsByDays, uniqueDates];
};

const sortByStartDate = (events = []) => {
  events.sort((a, b) => {
    return a.dateStart - b.dateStart;
  });
};

export {splitEventsByDays, sortByStartDate};
