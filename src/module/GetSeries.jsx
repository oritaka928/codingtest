const purl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=';
const colors = ['#0000FF', '#008080', '#008000', '#00FF00', '#00FFFF', '#FFFF00', '#FF0000', '#FF00FF'];

export const GetSeries = async (name, id) => {
  const response = await fetch(`${purl}${id}`, { headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY } });
  const res = await response.json();
  try {
    const res_series = {
      name: name,
      data: res.result.data[0].data.map((post) => post.value),
      color: colors[(id - 1) % 8],
    };
    return res_series;
  } catch (error) {
    const err_series = null;
    return err_series;
  }
};
