const HIDDEN_CLASS = `visually-hidden`;

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const Key = {
  ESC: `Escape`,
};

const TabName = {
  TABLE: `table`,
  STATS: `stats`,
};

const EventType = {
  TRANSFER:
  [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  ACTIVITY:
  [
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]
};

export {FilterType, Key, HIDDEN_CLASS, TabName, EventType};
