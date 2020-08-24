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

const ChartTitle = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME SPENT`,
};

const BAR_HEIGHT = 55;
const BAR_THICKNESS = 44;
const MIN_BAR_LENGTH = 50;
const CHART_TYPE = `horizontalBar`;
const BAR_BG_COLOR = `#ffffff`;
const BAR_HOVER_BG_COLOR = `#ffffff`;
const IN_BAR_TEXT_COLOR = `#000000`;
const IN_BAR_TEXT_POSITION = `end`;
const IN_BAR_TEXT_ALIGN = `start`;
const IN_BAR_FONT_SIZE = 13;
const TITLE_FONT_COLOR = `#000000`;
const TITLE_FONT_SIZE = 23;
const TITLE_POSITION = `left`;
const Y_LABELS_FONT_COLOR = `#000000`;
const Y_LABELS_PADDING = 5;
const Y_LABELS_FONT_SIZE = 13;
const LABEL_POSITION = `start`;

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
    type: CHART_TYPE,
    data: {
      labels: chartsData.types,
      datasets: [{
        data: chartsData.money,
        backgroundColor: BAR_BG_COLOR,
        hoverBackgroundColor: BAR_HOVER_BG_COLOR,
        anchor: LABEL_POSITION,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: IN_BAR_FONT_SIZE
          },
          color: IN_BAR_TEXT_COLOR,
          anchor: IN_BAR_TEXT_POSITION,
          align: IN_BAR_TEXT_ALIGN,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: ChartTitle.MONEY,
        fontColor: TITLE_FONT_COLOR,
        fontSize: TITLE_FONT_SIZE,
        position: TITLE_POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Y_LABELS_FONT_COLOR,
            padding: Y_LABELS_PADDING,
            fontSize: Y_LABELS_FONT_SIZE,
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
    type: CHART_TYPE,
    data: {
      labels: chartsData.transport.types,
      datasets: [{
        data: chartsData.transport.counts,
        backgroundColor: BAR_BG_COLOR,
        hoverBackgroundColor: BAR_HOVER_BG_COLOR,
        anchor: LABEL_POSITION,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: IN_BAR_FONT_SIZE
          },
          color: IN_BAR_TEXT_COLOR,
          anchor: IN_BAR_TEXT_POSITION,
          align: IN_BAR_TEXT_ALIGN,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: ChartTitle.TRANSPORT,
        fontColor: TITLE_FONT_COLOR,
        fontSize: TITLE_FONT_SIZE,
        position: TITLE_POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Y_LABELS_FONT_COLOR,
            padding: Y_LABELS_PADDING,
            fontSize: Y_LABELS_FONT_SIZE,
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
    type: CHART_TYPE,
    data: {
      labels: chartsData.types,
      datasets: [{
        data: chartsData.time,
        backgroundColor: BAR_BG_COLOR,
        hoverBackgroundColor: BAR_HOVER_BG_COLOR,
        anchor: LABEL_POSITION,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: IN_BAR_FONT_SIZE
          },
          color: IN_BAR_TEXT_COLOR,
          anchor: IN_BAR_TEXT_POSITION,
          align: IN_BAR_TEXT_ALIGN,
          formatter: (val) => getDuration(val)
        }
      },
      title: {
        display: true,
        text: ChartTitle.TIME,
        fontColor: TITLE_FONT_COLOR,
        fontSize: TITLE_FONT_SIZE,
        position: TITLE_POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Y_LABELS_FONT_COLOR,
            padding: Y_LABELS_PADDING,
            fontSize: Y_LABELS_FONT_SIZE,
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

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  recoverListeners() {}

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
