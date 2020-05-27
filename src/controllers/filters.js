import FiltersComponent from '@/components/trip-filters';
import {render, RenderPosition} from '@/utils/render';

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
  }

  render() {
    const filtersComponent = new FiltersComponent();
    render(this._container, filtersComponent, RenderPosition.BEFOREEND);
  }
}
