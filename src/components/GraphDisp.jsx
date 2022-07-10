import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const GraphDisp = ({ series }) => {
  const options = {
    title: {
      text: '人口総数',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      gridLineWidth: 1,
      tickInterval: 5,
      min: 1960,
      max: 2040,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: '総人口（万人）',
      },
      minTickInterval: 50000,
      gridLineWidth: 1,
      labels: {
        formatter() {
          return `${this.value / 10000}`;
        },
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        cursor: 'default',
        fontWeight: 'normal',
      },
      itemHoverStyle: {
        fontWeight: 'bold',
      },
      itemMarginBottom: 4,
    },
    accessibility: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '',
      useHTML: true,
      formatter() {
        const value = (Math.round(this.y / 1000) / 10).toFixed(1);
        return `
          <div style="margin-bottom: 16px">${this.x}年</div>
          <div>${this.series.name}</div>
          <div>
            <span style="font-size: 2rem; color: ${this.color}">${value}</span>
            <span>万人</span>
          </div>`;
      },
      shape: 'square',
      borderWidth: 0,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    series: series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};
