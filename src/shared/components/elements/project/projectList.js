/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class ProjectList extends React.Component {

  getTitle(data, baseUrl) {
    const placeSlug = slugUtil(data.title);
    return (<Link to={'/' + baseUrl + '/' + placeSlug} title={data.title}>
        {data.title}
      </Link>);
  }

  renderItems(places, baseUrl) {
    if (_.isArray(places) && places.length) {
      return places.slice(0, 21).map((item, index) => {
        return (<div className={'col-sm-6 col-xs-12 ' + style.placeCard} key={index}>
            <img src="/images/placeholder.png" alt={item.title} />
            <h3 key={index}>
              {this.getTitle(item, baseUrl)}
            </h3>
            <h4>
              {item.subtitle}
            </h4>
            <p>{item.categories.join(' ')}</p>
          </div>);
      });
    }
    return null;
  }

  render() {
    const { data, baseUrl } = this.props;
    return (<div className={'row ' + style.container}>
      {this.renderItems(data, baseUrl)}
    </div>);
  }
}

ProjectList.propTypes = {
  data: React.PropTypes.array,
  baseUrl: React.PropTypes.string.isRequired,
};
