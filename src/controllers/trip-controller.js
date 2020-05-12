import SortComponent from '@/components/trip-sort';
import EditEventComponent from '@/components/trip-edit';
import DaysListComponent from '@/components/days-list';
import DayComponent from '@/components/trip-day';
import EventComponent from '@/components/trip-event';
import {splitEventsByDays} from '@/components/sort';
import {RenderPosition, replace, render} from '@/utils/render';

export default class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._daysListComponent = new DaysListComponent();
  }

  render(events) {
    // sorting line
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    // days and events container
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    // days and events
    const [eventsByDays, dates] = splitEventsByDays(events);

    // render days column
    const tripDaysListElement = this._container.querySelector(`.trip-days`);

    dates.forEach((day, i, arr) => {
      const getDifferenceInDays = (start, end) => {
        const MS_IN_DAY = 86400000;

        return Math.floor((end - start) / MS_IN_DAY);
      };

      const counter = getDifferenceInDays(arr[0], day);

      render(tripDaysListElement, new DayComponent(day, counter + 1), RenderPosition.BEFOREEND);
    });

    const renderEvent = (eventListElement, event) => {
      const rollupButtonClickHandler = () => {
        replace(editEventComponent, eventComponent);
      };

      const editFormSubmitHandler = () => {
        replace(eventComponent, editEventComponent);
      };

      const eventComponent = new EventComponent(event);
      const editEventComponent = new EditEventComponent(event);

      eventComponent.setRollupButtonClickHandler(rollupButtonClickHandler);
      editEventComponent.setSubmitHandler(editFormSubmitHandler);

      render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
    };

    // render events inside of days
    const tripEventsListElements = tripDaysListElement.querySelectorAll(`.trip-events__list`);

    tripEventsListElements.forEach((it, i) => {
      eventsByDays[i].forEach((event) => {
        renderEvent(it, event);
      });
    });
  }
}
