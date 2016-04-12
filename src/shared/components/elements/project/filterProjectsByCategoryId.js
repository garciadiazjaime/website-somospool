import _ from 'lodash';

export default (data, categoryId) => {
  if (_.isArray(data) && data.length && categoryId) {
    return data.filter((item) => {
      return item.categories.indexOf(categoryId) !== -1;
    });
  }
  return data;
};
