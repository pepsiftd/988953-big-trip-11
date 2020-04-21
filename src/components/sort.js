export const sortByStartDate = (events) => {
  events.sort((a, b) => {
    return a.dateStart - b.dateStart;
  });
};
