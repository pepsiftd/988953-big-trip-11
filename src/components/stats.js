import AbstractSmartComponent from '@/components/abstract-smart-component';
import {HIDDEN_CLASS} from '@/const';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getChartsData = (events) => {
  const types = events.map((event) => event.type).filter(getUniqItems);

  const eventsByTypes = [];
  types.forEach((type) => {
    eventsByTypes.push(events.filter((event) => event.type === type));
  });

  const getMoneyByType = (eventsByType) => {
    return eventsByType.reduce((total, event) => {
      const offersCost = event.offers.length > 0 ? event.offers.reduce(((offersTotal, offer) => offersTotal + offer.price), 0) : 0;
      return total + event.price + offersCost;
    }, 0);
  };

  const getTimeByType = (eventsByType) => {
    return eventsByType.reduce((total, event) => {
      return total + event.dateEnd - event.dateStart;
    }, 0);
  };

  return {
    types,
    money: eventsByTypes.map(getMoneyByType),
    count: eventsByTypes.map((type) => type.length),
    time: eventsByTypes.map(getTimeByType),
  };
};

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;

const createStatsTemplate = () => {
  return (
    `<section class="statistics visually-hidden">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

const renderMoneyChart = (moneyCtx, events) => {
  moneyCtx.height = BAR_HEIGHT * 6;

  return new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
          labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`],
          datasets: [{
              data: [400, 300, 200, 160 , 100],
              backgroundColor: `#ffffff`,
              hoverBackgroundColor: `#ffffff`,
              anchor: `start`
          }]
      },
      options: {
          plugins: {
              datalabels: {
                  font: {
                      size: 13
                  },
                  color: `#000000`,
                  anchor: 'end',
                  align: 'start',
                  formatter: (val) => `€ ${val}`
              }
          },
          title: {
              display: true,
              text: `MONEY`,
              fontColor: `#000000`,
              fontSize: 23,
              position: `left`
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: `#000000`,
                      padding: 5,
                      fontSize: 13,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  barThickness: 44,
              }],
              xAxes: [{
                  ticks: {
                      display: false,
                      beginAtZero: true,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  minBarLength: 50
              }],
          },
          legend: {
              display: false
          },
          tooltips: {
              enabled: false,
          }
      }
  });
}

const renderTransportChart = (transportCtx, events) => {
  transportCtx.height = BAR_HEIGHT * 3;

  return new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
          labels: [`FLY`, `DRIVE`,  `RIDE`],
          datasets: [{
              data: [4, 2, 1],
              backgroundColor: `#ffffff`,
              hoverBackgroundColor: `#ffffff`,
              anchor: `start`
          }]
      },
      options: {
          plugins: {
              datalabels: {
                  font: {
                      size: 13
                  },
                  color: `#000000`,
                  anchor: 'end',
                  align: 'start',
                  formatter: (val) => `${val}x`
              }
          },
          title: {
              display: true,
              text: `TRANSPORT`,
              fontColor: `#000000`,
              fontSize: 23,
              position: `left`
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: `#000000`,
                      padding: 5,
                      fontSize: 13,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  barThickness: 44,
              }],
              xAxes: [{
                  ticks: {
                      display: false,
                      beginAtZero: true,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  minBarLength: 50
              }],
          },
          legend: {
              display: false
          },
          tooltips: {
              enabled: false,
          }
      }
  });
}

const renderTimeSpentChart = (timeSpentCtx, events) => {
  timeSpentCtx.height = BAR_HEIGHT * 3;

  return new Chart(timeSpentCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
          labels: [`HOTEL`, `TO AIRPORT`,  `TO GENEVA`],
          datasets: [{
              data: [72, 2, 1],
              backgroundColor: `#ffffff`,
              hoverBackgroundColor: `#ffffff`,
              anchor: `start`
          }]
      },
      options: {
          plugins: {
              datalabels: {
                  font: {
                      size: 13
                  },
                  color: `#000000`,
                  anchor: 'end',
                  align: 'start',
                  formatter: (val) => `${val}H`
              }
          },
          title: {
              display: true,
              text: `TIME SPENT`,
              fontColor: `#000000`,
              fontSize: 23,
              position: `left`
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: `#000000`,
                      padding: 5,
                      fontSize: 13,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  barThickness: 44,
              }],
              xAxes: [{
                  ticks: {
                      display: false,
                      beginAtZero: true,
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  minBarLength: 50
              }],
          },
          legend: {
              display: false
          },
          tooltips: {
              enabled: false,
          }
      }
  });
}

export default class Stats extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  hide() {
    this.getElement().classList.add(HIDDEN_CLASS);
  }

  show() {
    this.getElement().classList.remove(HIDDEN_CLASS);
  }

  recoverListeners() {}

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    const chartsData = getChartsData(this._eventsModel.getEventsAll());
    console.log(chartsData);

    this._moneyChart = renderMoneyChart(moneyCtx, chartsData);
    this._transportChart = renderTransportChart(transportCtx, chartsData);
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, chartsData);
  }
}
