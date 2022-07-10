import { useState, useEffect } from 'react';
import { CheckList } from './CheckList';
import { GraphDisp } from './GraphDisp';

const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const purl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=';
const colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'];
export const ApiFetch = () => {
  const [prefectures, setPreFectures] = useState([]);
  const [series, setSeries] = useState([]);

  //都道府県一覧を取得(初回のみ)
  console.log(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    fetch(url, { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY } })
      .then((response) => response.json())
      .then((resdata) => {
        setPreFectures(resdata.result);
      });
  }, []);

  //checkboxクリック時人口取得
  const ClickCheck = async (event) => {
    const delflg = series.some((series) => series.name === prefectures[event.target.id - 1].prefName);
    const delname = series.filter((series) => series.name !== prefectures[event.target.id - 1].prefName);

    if (delflg) {
      setSeries(delname);
    } else {
      //url+id
      await fetch(`${purl}${event.target.id}`, { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY } })
        .then((response) => response.json())
        .then((resdata) => {
          if (resdata.result.data[0].data.length !== 0) {
            const res_series = {
              name: prefectures[event.target.id - 1].prefName,
              data: resdata.result.data[0].data.map((post) => [post.value]),
              color: colors[(event.target.id - 1) % 8],
            };
            const newseries = [...series, res_series];
            setSeries(newseries);
          }
        });
    }
  };

  return (
    <div>
      <h4>都道府県一覧</h4>

      <ul>
        <CheckList prefectures={prefectures} onChange={ClickCheck} />
      </ul>
      {series.length !== 0 && <GraphDisp series={series} />}
    </div>
  );
};
