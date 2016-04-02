/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class ProjectList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.context = context;
  }

  handleClick(item, e) {
    const projectSlug = slugUtil(item.title);
    e.preventDefault();
    this.context.history.push('/portafolio/proyecto/' + projectSlug);
  }

  renderItems(places) {
    if (_.isArray(places) && places.length) {
      return places.slice(0, 21).map((item, index) => {
        const imgUrl = item.cover.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        /*eslint-disable */
        return (<div className={'col-sm-6 col-xs-12 ' + style.placeCard} key={index} onClick={this.handleClick.bind(this, item)}>
            <div className="row">
              <img src={imgUrl} alt={item.title} />
            </div>
          </div>);
        /*eslint-enable */
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    return (<div className={'row '}>
      {this.renderItems(data)}
    </div>);
  }
}

ProjectList.propTypes = {
  data: React.PropTypes.array,
  baseUrl: React.PropTypes.string.isRequired,
};

ProjectList.contextTypes = {
  history: React.PropTypes.object,
};
