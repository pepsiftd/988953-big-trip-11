const eventTypes = {
  transfer:
  [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  activity:
  [
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]
};

const createTypeItemMarkup = (type, eventNumber, isChecked) => {
  const n = eventNumber;
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${n}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${n}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>`
  );
};

const createTransferListMarkup = (selectedType) => {
  return eventTypes.transfer.map((type) => createTypeItemMarkup(type, 1, type === selectedType)).join(`\n`);
};

const createActivityListMarkup = (selectedType) => {
  return eventTypes.activity.map((type) => createTypeItemMarkup(type, 1, type === selectedType)).join(`\n`);
};

export const createTypeListMarkup = (selectedType) => {
  const transferList = createTransferListMarkup(selectedType);
  const activityList = createActivityListMarkup(selectedType);

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>

      ${transferList}
    </fieldset>

    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>

      ${activityList}
    </fieldset>`
  );
};
