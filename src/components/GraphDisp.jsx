
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



export const GraphDisp = ({population}) => {

    const options = {
        title: {
          text: '人口増減率'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointInterval: 18,
            pointStart: 1960
          }
        },
        series: [
            {name: "北海道", data: [population]}
    ]
    }


    return(
        <>
        <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
}