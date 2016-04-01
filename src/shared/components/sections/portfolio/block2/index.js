import React from 'react';

import { CategoryList } from '../../../elements/category';
import { ProjectList, filterProjectsByCategory } from '../../../elements/project';
import restClient from '../../../../../server/helpers/rest-client';


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
        path: 'http://127.0.0.1:8000/api/category/',
      }));
    }

    if (!this.state.portfolio.projects) {
      promises.push(restClient({
        path: 'http://127.0.0.1:8000/api/project/',
      }));
    }

    if (promises.length) {
      Promise.all(promises).then((data) => {
        this.setState({
          portfolio: {
            categories: data[0].entity,
            projects: data[1].entity,
          },
        });
      });
    }
  }

  render() {
    const { category } = this.props;
    const { portfolio } = this.state;
    const places = filterProjectsByCategory(portfolio.projects, category);

    return (<div className="container">
      <div className="row">
        <h2>Filtro:</h2>
        <CategoryList data={portfolio.categories} category={category} baseUrl="portafolio" />
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
