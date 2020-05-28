import FiltersComponent from '@/components/trip-filters';
import {render, RenderPosition} from '@/utils/render';
import {FilterType} from '@/const';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilter = FilterType.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filtersComponent = new FiltersComponent();
    render(this._container, filtersComponent, RenderPosition.BEFOREEND);
    filtersComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _onFilterChange(evt) {
    const selectedFilter = getFilterNameById(evt.target.id);

    this._eventsModel.setActiveFilter(selectedFilter);
    this._activeFilter = selectedFilter;
  }
}
