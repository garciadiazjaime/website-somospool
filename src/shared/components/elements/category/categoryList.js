/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';

export default class CategoryList extends React.Component {


  renderItems(data, category, baseUrl) {
    if (_.isArray(data)) {
      return data.map((item, index) => {
        const slug = slugUtil(item.name);
        const activeClassName = slug === category ? 'active' : '';
        return (<li key={index}>
          <h2>
            <Link to={'/' + baseUrl + '/' + slug} title={item.name} className={style[activeClassName]}>
              {item.name}
            </Link>
          </h2>
        </li>);
      });
    }
    return null;
  }

  render() {
    const { data, category, baseUrl } = this.props;
    const activeClassName = !category ? 'active' : '';
    return (<ul>
      <li>
        <h2>
          <Link to={'/' + baseUrl} title="ver todos" className={style[activeClassName]}>
            Todos
          </Link>
        </h2>
      </li>
      {this.renderItems(data, category, baseUrl)}
    </ul>);
  }
}

CategoryList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
  baseUrl: React.PropTypes.string.isRequired,
};
