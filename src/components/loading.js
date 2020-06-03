import AbstractComponent from '@/components/abstract-component';

export default class NoEventsComponent extends AbstractComponent {
  getTemplate() {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
}
