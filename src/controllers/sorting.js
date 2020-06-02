import SortingComponent from '@/components/trip-sort';
import {render, remove, RenderPosition} from '@/utils/render';

export default class SortingController {
  constructor(container, onSortTypeChange, initialSortType) {
    this._container = container;
    this._sortingComponent = null;
    this._initialSortType = initialSortType;

    this._onSortTypeChange = onSortTypeChange;
    this._sortingComponent = new SortingComponent(this._initialSortType);
  }

  resetSortType() {
    this._sortingComponent.setSortType(this._initialSortType);
    this._onSortTypeChange(this._initialSortType);
  }

  render() {
    render(this._container, this._sortingComponent, RenderPosition.AFTERBEGIN);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  destroy() {
    if (this._sortingComponent.getElement()) {
      remove(this._sortingComponent);
    }
  }
}
