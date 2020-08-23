import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render, remove} from '@/utils/render';
import {enableNewEventButton} from '@/utils/common';
import {Key, EventType} from '@/const';
import EventModel from '@/models/event-model';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const SaveButtonValue = {
  DEFAULT: `Save`,
  IN_PROGRESS: `Saving...`,
};

const DeleteButtonValue = {
  DEFAULT: `Delete`,
  IN_PROGRESS: `Deleting...`,
};

const IS_NO_CLOSE = true;

const SHAKE_ANIMATION_TIMEOUT = 600;

const EmptyEvent = {
  id: Math.random(),
  type: EventType.TRANSFER[1],
  isFavorite: false,
  destination: undefined,
  dateStart: new Date(),
  dateEnd: new Date(),
  price: undefined,
  offers: [],
  description: undefined,
  photos: undefined,
};

class Event {
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

  toggleSaveSaving() {
    const saveButton = this._editEventComponent.getElement().querySelector(`.event__save-btn`);
    switch (saveButton.textContent) {
      case SaveButtonValue.DEFAULT:
        saveButton.textContent = SaveButtonValue.IN_PROGRESS;
        break;
      case SaveButtonValue.IN_PROGRESS:
        saveButton.textContent = SaveButtonValue.DEFAULT;
        break;
    }
  }

  toggleDeleteDeleting() {
    const deleteButton = this._editEventComponent.getElement().querySelector(`.event__reset-btn`);
    switch (deleteButton.textContent) {
      case DeleteButtonValue.DEFAULT:
        deleteButton.textContent = DeleteButtonValue.IN_PROGRESS;
        break;
      case DeleteButtonValue.IN_PROGRESS:
        deleteButton.textContent = DeleteButtonValue.DEFAULT;
        break;
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

        if (this._mode === Mode.ADDING) {
          this._mode = Mode.DEFAULT;
        }

        this._onDataChange(this, event, this._editEventComponent.getData());
      } else {
        this.shake();
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
        this._onDataChange(this, event, EventModel.create(Object.assign({}, event, {isFavorite: !event.isFavorite})), IS_NO_CLOSE);
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

  shake() {
    this._editEventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._editEventComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  disableForm() {
    const formElement = this._editEventComponent.getElement();
    const formElements = Array.from(formElement.elements);
    formElements.forEach((element) => {
      element.disabled = true;
    });
  }

  enableForm() {
    const formElement = this._editEventComponent.getElement();
    const formElements = Array.from(formElement.elements);
    formElements.forEach((element) => {
      element.disabled = false;
    });
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }
}

export default Event;
export {Mode, EmptyEvent};
