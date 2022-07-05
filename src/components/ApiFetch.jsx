import  {useState, useEffect} from 'react'
const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = 'ZVOmBi4eB6PMjAhNNcfZgdoAAFfKBtN0JuokIQ6c';

const style = {
    display: "inline-block",
    padding: "6px",
    width: "100px",
    height: "10px",

  }

export const ApiFetch = () => {
    const [prefectures, setPreFectures] = useState([])

    useEffect(() => {
        fetch(url,{headers: {"X-API-KEY": apiKey}})
        .then(response => response.json())
        .then(resdata => {
            setPreFectures(resdata.result)
        })
    },[])
    
    return (
        <div >
        <h4>都道府県一覧</h4>
        <ul>
        {
             prefectures.map(post => <li style={style} key={post.prefCode}>
            <input type="checkbox" name={post.prefName} onChange={null} id={"checkbox" + post.prefCode}></input> 
            {post.prefName}</li>)
        }
        </ul>
      </div>
    );
  };