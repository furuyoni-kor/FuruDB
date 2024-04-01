export const createQueryString = (queryArray: [string, string | null][]) => {
  const filteredArray = queryArray.filter(([key, value]) => value) as [
    string,
    string
  ][];

  filteredArray.sort((prev, next) => (prev < next ? -1 : 1));

  return filteredArray.map(([key, value]) => `${key}=${value}`).join("&");
};
