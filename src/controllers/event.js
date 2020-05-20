import EventComponent from '@/components/trip-event';
import EditEventComponent from '@/components/trip-edit';
import {RenderPosition, replace, render} from '@/utils/render';

export default class EventController {
  constructor(container) {
    this._container = container;
    this._event = {};
  }

  render(event) {
    this._event = event;

    const rollupButtonClickHandler = () => {
      replace(editEventComponent, eventComponent);
    };

    const editFormSubmitHandler = () => {
      replace(eventComponent, editEventComponent);
    };

    const eventComponent = new EventComponent(this._event);
    const editEventComponent = new EditEventComponent(this._event);

    eventComponent.setRollupButtonClickHandler(rollupButtonClickHandler);
    editEventComponent.setSubmitHandler(editFormSubmitHandler);

    render(this._container, eventComponent, RenderPosition.BEFOREEND);
  }
}
