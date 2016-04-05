import React from 'react';
import _ from 'lodash';

import { CategoryList } from '../../../elements/category';
import { ProjectList, filterProjectsByCategory } from '../../../elements/project';
import restClient from '../../../../../server/helpers/rest-client';
const style = require('./style.scss');


export default class Block2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      portfolio: props.portfolio,
    };
  }

  componentDidMount() {
    const promises = [];
    if (!this.state.portfolio.categories) {
      promises.push(restClient({
        path: window._apiUrl + 'api/category/',
      }));
    }

    if (!this.state.portfolio.projects) {
      promises.push(restClient({
        path: window._apiUrl + 'api/project/',
      }));
    }

    if (promises.length) {
      Promise.all(promises).then((data) => {
        const { portfolio } = this.state;

        if (data[0] && _.isArray(data[0].entity)) {
          portfolio.categories = data[0].entity;
        }

        if (data[1] && _.isArray(data[1].entity)) {
          portfolio.projects = data[1].entity;
        }

        this.setState({
          portfolio,
        });
      });
    }
  }

  render() {
    const { category } = this.props;
    const { portfolio } = this.state;
    const places = filterProjectsByCategory(portfolio.projects, category);

    return (<div>
      <div className={style.filtro}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              <h2>Filtro:</h2>
            </div>
            <div className="col-xs-10 col-sm-11">
              <CategoryList data={portfolio.categories} category={category} baseUrl="portafolio" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <ProjectList data={places} baseUrl="portafolio" />
      </div>
    </div>);
  }
}

Block2.propTypes = {
  category: React.PropTypes.string,
  portfolio: React.PropTypes.object,
};
