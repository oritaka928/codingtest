import  {useState, useEffect} from 'react'
import { CheckList } from "./CheckList";

const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = 'ZVOmBi4eB6PMjAhNNcfZgdoAAFfKBtN0JuokIQ6c';

export const ApiFetch = () => {
    const [prefectures, setPreFectures] = useState([])

    useEffect(() => {
        fetch(url,{headers: {"X-API-KEY": apiKey}})
        .then(response => response.json())
        .then(resdata => {
            setPreFectures(resdata.result)
        })
    },[])

    
    const ClickCheck = (event) => {
        console.log(event.target.id)
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
      </div>
    );
  };