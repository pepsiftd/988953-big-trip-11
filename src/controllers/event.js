import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render, remove} from '@/utils/render';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  isNewEvent: true,
  id: `0`,
  type: undefined,
  isFavorite: false,
  destination: undefined,
  dateStart: new Date(),
  dateEnd: new Date(),
  price: undefined,
  offers: undefined,
  description: undefined,
  photos: undefined,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, mode) {
    this._container = container;
    this._mode = mode ? mode : Mode.DEFAULT;
    this._eventComponent = null;
    this._editEventComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  replaceDefaultWithEdit() {
    this._onViewChange();
    replace(this._editEventComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  replaceEditWithDefault() {
    replace(this._eventComponent, this._editEventComponent);
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this.replaceEditWithDefault();
    }
  }

  render(event, offersData, destinations) {
    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventComponent(event, offersData);
    this._editEventComponent = new EditEventComponent(event, offersData, destinations);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this.replaceDefaultWithEdit();
    });

    this._editEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this.replaceEditWithDefault();
    });

    this._editEventComponent.setDeleteClickHandler(() => {
      this._onDataChange(this, event, null);
    });

    this._editEventComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    this._editEventComponent.setEventTypeChangeHandler((evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        type: evt.target.value,
        offers: offersData.TRANSFER.get(evt.target.value) ? offersData.TRANSFER.get(evt.target.value) : offersData.ACTIVITY.get(evt.target.value),
      }));
    });

    this._editEventComponent.setDestinationChangeHandler((evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        destination: evt.target.value,
        description: destinations.find((it) => it.name === evt.target.value).description,
        photos: destinations.find((it) => it.name === evt.target.value).photos,
      }));
    });

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._editEventComponent, oldEditEventComponent);
    } else if (this._mode === Mode.ADDING) {
      const sortingElement = this._container.querySelector(`.trip-sort`);
      render(sortingElement, this._editEventComponent, RenderPosition.AFTER);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }
}
