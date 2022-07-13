import { useState, useEffect } from 'react';
import { CheckList } from './CheckList';
import { GraphDisp } from './GraphDisp';
import { GetSeries } from '../module/GetSeries';
import { DelSeries } from '../module/DelSeries';

const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

export const ApiFetch = () => {
  const [prefectures, setPreFectures] = useState([]);
  const [series, setSeries] = useState([]);

  //都道府県一覧を取得(初回のみ)
  useEffect(() => {
    fetch(url, { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY } })
      .then((response) => response.json())
      .then((resdata) => {
        setPreFectures(resdata.result);
      });
  }, []);

  //checkboxクリック時人口取得
  const handleClickCheck = async (prefName, prefCode, checke) => {
    let c_series = series.slice();
    if (checke) {
      const res_series = await GetSeries(prefName, prefCode);
      if (res_series === null) {
        setSeries(c_series);
      } else {
        const new_series = [...c_series, res_series];
        setSeries(new_series);
      }
    } else {
      const del_series = await DelSeries(c_series, prefName);
      setSeries(del_series);
    }
  };

  return (
    <div>
      <h4>都道府県一覧</h4>

      <ul>
        <CheckList prefectures={prefectures} onChange={handleClickCheck} />
      </ul>
      {series.length !== 0 && <GraphDisp series={series} />}
    </div>
  );
};
