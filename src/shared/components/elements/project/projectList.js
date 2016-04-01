/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class PlaceList extends React.Component {

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
            <div className="row">
              <img src="/images/placeholder.png" alt={item.title} />
              <div className={style.legend}>
                <h3 key={index}>
                  {this.getTitle(item, baseUrl)}
                </h3>
                <h4>
                  {item.subtitle}
                </h4>
              </div>
            </div>
          </div>);
      });
    }
    return null;
  }

  render() {
    const { data, baseUrl } = this.props;
    return (<div className={'row '}>
      {this.renderItems(data, baseUrl)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  baseUrl: React.PropTypes.string.isRequired,
};
