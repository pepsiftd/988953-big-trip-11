import AbstractSmartComponent from '@/components/abstract-smart-component';
import {getDuration} from '@/utils/common';
import {HIDDEN_CLASS} from '@/const';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const BAR_HEIGHT = 55;

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getChartsData = (events) => {
  const types = events.map((event) => event.type).filter(getUniqItems);

  const eventsByTypes = [];
  types.forEach((type) => {
    eventsByTypes.push({type, events: events.filter((event) => event.type === type)});
  });

  const getMoneyByType = (eventsByType) => {
    return eventsByType.reduce((total, event) => total + event.price, 0);
  };

  const getTransferCountsByType = () => {
    const transfers = eventsByTypes.filter((it) => TRANSFER_TYPES.includes(it.type));
    return {
      types: transfers.map((it) => it.type),
      counts: transfers.map((it) => it.events.length),
    };
  };

  const getTimeByType = (eventsByType) => {
    return eventsByType.reduce((total, event) => {
      return total + moment.duration(event.dateEnd - event.dateStart);
    }, moment.duration(0));
  };

  return {
    types,
    money: eventsByTypes.map((it) => getMoneyByType(it.events)),
    transport: getTransferCountsByType(),
    time: eventsByTypes.map((it) => getTimeByType(it.events)),
  };
};

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

const renderMoneyChart = (moneyCtx, chartsData) => {
  const barsAmount = chartsData.types.length;
  moneyCtx.height = BAR_HEIGHT * barsAmount;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsData.types,
      datasets: [{
        data: chartsData.money,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
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
};

const renderTransportChart = (transportCtx, chartsData) => {
  const barsAmount = chartsData.transport.types.length;
  transportCtx.height = BAR_HEIGHT * barsAmount;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsData.transport.types,
      datasets: [{
        data: chartsData.transport.counts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
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
};

const renderTimeSpentChart = (timeSpentCtx, chartsData) => {
  const barsAmount = chartsData.types.length;
  timeSpentCtx.height = BAR_HEIGHT * barsAmount;

  return new Chart(timeSpentCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartsData.types,
      datasets: [{
        data: chartsData.time,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => getDuration(val)
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
};

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

    this._moneyChart = renderMoneyChart(moneyCtx, chartsData);
    this._transportChart = renderTransportChart(transportCtx, chartsData);
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, chartsData);
  }
}
