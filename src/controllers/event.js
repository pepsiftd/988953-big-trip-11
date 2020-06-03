import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render, remove} from '@/utils/render';
import {enableNewEventButton} from '@/utils/common';
import {Key} from '@/const';
import EventModel from '@/models/event';

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  id: Math.random(),
  type: undefined,
  isFavorite: false,
  destination: undefined,
  dateStart: new Date(),
  dateEnd: new Date(),
  price: undefined,
  offers: [],
  description: undefined,
  photos: undefined,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, mode) {
    this._container = container;
    this._mode = mode ? mode : Mode.DEFAULT;
    this._eventComponent = null;
    this._editEventComponent = null;
    this._escPressHandler = this._escPressHandler.bind(this);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  replaceDefaultWithEdit() {
    this._onViewChange();
    replace(this._editEventComponent, this._eventComponent);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._escPressHandler);
  }

  replaceEditWithDefault() {
    replace(this._eventComponent, this._editEventComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escPressHandler);
  }

  _escPressHandler(evt) {
    if (evt.key === Key.ESC) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
        document.removeEventListener(`keydown`, this._escPressHandler);
        return;
      }

      this._editEventComponent.reset();
      this.replaceEditWithDefault();
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this.replaceEditWithDefault();
    }
  }

  render(event, offersData, destinations, isFirst) {
    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventComponent(event, offersData);
    this._editEventComponent = new EditEventComponent(event, offersData, destinations, this._mode === Mode.ADDING);
    this._eventComponent.setRollupButtonClickHandler(() => {
      this.replaceDefaultWithEdit();
    });

    this._editEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const isValid = this._editEventComponent.validateForm();
      if (isValid) {
        this._editEventComponent.parseForm();

        if (this._mode !== Mode.ADDING) {
          this.replaceEditWithDefault();
        } else {
          this._mode = Mode.DEFAULT;
          this.destroy();
        }

        this._onDataChange(this, event, this._editEventComponent.getData());
      }
    });

    this._editEventComponent.setDeleteClickHandler(() => {
      this._onDataChange(this, event, null);
      if (this._mode === Mode.ADDING) {
        enableNewEventButton();
      }
    });

    if (this._mode !== Mode.ADDING) {
      this._editEventComponent.setFavoriteClickHandler(() => {
        this._onDataChange(this, event, EventModel.create(Object.assign({}, event, {isFavorite: !event.isFavorite})));
      });
    }

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._editEventComponent, oldEditEventComponent);
    } else if (this._mode === Mode.ADDING) {

      if (isFirst) {
        render(this._container, this._editEventComponent, RenderPosition.BEFOREEND);
      } else {
        const sortingElement = this._container.querySelector(`.trip-sort`);
        render(sortingElement, this._editEventComponent, RenderPosition.AFTER);
      }

      document.addEventListener(`keydown`, this._escPressHandler);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }
}
