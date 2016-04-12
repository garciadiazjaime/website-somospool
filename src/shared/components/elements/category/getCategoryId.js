import _ from 'lodash';
import slugUtil from '../../../utils/slug';

export default (data, category) => {
  if (_.isArray(data) && data.length && category) {
    for (let i = 0, len = data.length; i < len; i++) {
      const slug = slugUtil(data[i].name);
      if (slug === category) {
        return data[i].id;
      }
    }
  }
  return null;
};
