import  {useState, useEffect} from 'react'
import { CheckList } from "./CheckList";
import { GraphDisp } from "./GraphDisp";


const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = 'ZVOmBi4eB6PMjAhNNcfZgdoAAFfKBtN0JuokIQ6c';
const purl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=';


export const ApiFetch = () => {

    const [prefectures, setPreFectures] = useState([])
    const [population, setPopulation] = useState([])

    const test = {
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
          {name: "北海道", data: []}
  ]
  }


    //都道府県一覧を取得(初回のみ)
    useEffect(() => {
        fetch(url,{headers: {"X-API-KEY": apiKey}})
        .then(response => response.json())
        .then(resdata => {
            setPreFectures(resdata.result)
        })
    },[])

    //checkboxクリック時人口取得
    const ClickCheck = (event) => {
        //url+id
        fetch(`${purl}${event.target.id}`,{headers: {"X-API-KEY": apiKey}})
        .then(response => response.json())
        .then(resdata => {
            setPopulation(resdata.result)
        })
         for (let i = 0; i <18; i++) {
          test.series[0].data[i] = population.data[0].data[i].value
         }
        //options.series[0].data = population.data[0].data
        //console.log(population.data[0].data[0].value)
        //console.log(test.series[0].data)
    }


    return (
        <div >
        <h4>都道府県一覧</h4>
        <ul>
        <CheckList 
        prefectures ={prefectures}
        onChange={ClickCheck}
        />
        </ul>
        <GraphDisp 
        population ={test}
        />
      </div>
    );
  };