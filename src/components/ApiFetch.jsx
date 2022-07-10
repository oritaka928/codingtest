import { useState, useEffect } from 'react';
import { CheckList } from './CheckList';
import { GraphDisp } from './GraphDisp';

const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const purl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=';

export const ApiFetch = () => {
  const [prefectures, setPreFectures] = useState([]);
  const [series, setSeries] = useState([]);

  //都道府県一覧を取得(初回のみ)
  useEffect(() => {
    fetch(url, { headers: { 'X-API-KEY': process.env.API_KEY } })
      .then((response) => response.json())
      .then((resdata) => {
        setPreFectures(resdata.result);
      });
  }, []);

  //checkboxクリック時人口取得
  const ClickCheck = async (event) => {
    let fetchflg = true;

    //checkbox on→off時の削除動作
    for (let i = 0; i < series.length; i++) {
      if (series[i].name === prefectures[event.target.id - 1].prefName) {
        const delseries = [...series];
        delseries.splice(i, 1);
        setSeries(delseries);
        fetchflg = false;
      }
    }

    if (fetchflg === true) {
      //url+id
      await fetch(`${purl}${event.target.id}`, { headers: { 'X-API-KEY': process.env.API_KEY } })
        .then((response) => response.json())
        .then((resdata) => {
          if (resdata.result.data[0].data.length !== 0) {
            const res_series = {
              name: prefectures[event.target.id - 1].prefName,
              data: resdata.result.data[0].data.map((post) => [post.value]),
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
