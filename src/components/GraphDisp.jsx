
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



export const GraphDisp = ({series}) => {

   
  
    const options = {
        title: {
          text: '人口総数'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointInterval: 5,
            pointStart: 1960
          }
        },
        accessibility: {
          enabled:false
        },
        series: series
    }
    
    
    return(
        <>
        <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
}