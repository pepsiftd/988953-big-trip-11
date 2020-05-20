import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render} from '@/utils/render';

export default class EventController {
  constructor(container, onDataChange) {
    this._container = container;
    this._eventComponent = null;
    this._editEventComponent = null;

    this._onDataChange = onDataChange;
  }

  render(event) {
    const rollupButtonClickHandler = () => {
      replace(this._editEventComponent, this._eventComponent);
    };

    const editFormSubmitHandler = (evt) => {
      evt.preventDefault();
      replace(this._eventComponent, this._editEventComponent);
    };

    const favoriteClickHandler = () => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    };

    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventComponent(event);
    this._editEventComponent = new EditEventComponent(event);

    this._eventComponent.setRollupButtonClickHandler(rollupButtonClickHandler);
    this._editEventComponent.setSubmitHandler(editFormSubmitHandler);
    this._editEventComponent.setFavoriteClickHandler(favoriteClickHandler);

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._editEventComponent, oldEditEventComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }
}
