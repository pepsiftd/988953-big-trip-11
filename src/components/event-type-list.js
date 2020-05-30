const createTypeItemMarkup = (type, eventNumber, isChecked) => {
  const n = eventNumber;
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${n}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${n}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>`
  );
};

const createTypesListMarkup = (selectedType, typesList) => {
  return typesList.map((type) => createTypeItemMarkup(type, 1, type === selectedType)).join(`\n`);
};

export const createTypeListMarkup = (selectedType, offers) => {
  const eventTypes = {
    TRANSFER: Array.from(offers.TRANSFER.keys()),
    ACTIVITY: Array.from(offers.ACTIVITY.keys()),
  };
  const transferList = createTypesListMarkup(selectedType, eventTypes.TRANSFER);
  const activityList = createTypesListMarkup(selectedType, eventTypes.ACTIVITY);

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>

        ${transferList}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>

        ${activityList}
      </fieldset>
    </div>`
  );
};
