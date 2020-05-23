import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render} from '@/utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
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
    const rollupButtonClickHandler = () => {
      this.replaceDefaultWithEdit();
    };

    const editFormSubmitHandler = (evt) => {
      evt.preventDefault();
      this.replaceEditWithDefault();
    };

    const favoriteClickHandler = () => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    };

    const eventTypeChangeHandler = (evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        type: evt.target.value,
        offers: offersData.transfer.get(evt.target.value) ? offersData.transfer.get(evt.target.value) : offersData.activity.get(evt.target.value),
      }));
    };

    const destinationChangeHandler = (evt) => {
      this._onDataChange(this, event, Object.assign({}, event, {
        destination: evt.target.value,
        description: destinations.find((it) => it.name === evt.target.value).description,
        photos: destinations.find((it) => it.name === evt.target.value).photos,
      }));
    };

    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventComponent(event, offersData);
    this._editEventComponent = new EditEventComponent(event, offersData, destinations);

    this._eventComponent.setRollupButtonClickHandler(rollupButtonClickHandler);
    this._editEventComponent.setSubmitHandler(editFormSubmitHandler);
    this._editEventComponent.setFavoriteClickHandler(favoriteClickHandler);
    this._editEventComponent.setEventTypeChangeHandler(eventTypeChangeHandler);
    this._editEventComponent.setDestinationChangeHandler(destinationChangeHandler);

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._editEventComponent, oldEditEventComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }
}
