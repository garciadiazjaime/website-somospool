export default (data, category) => {
  if (category) {
    return data.filter((item) => {
      return item.categories.indexOf(category) !== -1;
    });
  }
  return data;
};
