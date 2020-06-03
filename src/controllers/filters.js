import FiltersComponent from '@/components/trip-filters';
import {render, replace, RenderPosition} from '@/utils/render';
import {FilterType} from '@/const';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filtersComponent = null;

    this._activeFilter = FilterType.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._onFilterChange({target: {id: filterType}});
    this.render();
  }

  render() {
    const oldFilterComponent = this._filtersComponent;

    this._filtersComponent = new FiltersComponent();

    if (oldFilterComponent) {
      replace(this._filtersComponent, oldFilterComponent);
      oldFilterComponent.removeElement();
    } else {
      render(this._container, this._filtersComponent, RenderPosition.BEFOREEND);
    }

    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _onFilterChange(evt) {
    const selectedFilter = getFilterNameById(evt.target.id);

    this._eventsModel.setActiveFilter(selectedFilter);
    this._activeFilter = selectedFilter;
  }
}
