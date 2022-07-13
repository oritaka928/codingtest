export const DelSeries = async (series, name) => {
  const delname = await series.filter((series) => series.name !== name);
  return delname;
};
