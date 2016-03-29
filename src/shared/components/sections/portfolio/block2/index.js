import React from 'react';

import CategoriesData from '../../../../data/categories';
import ProjectsData from '../../../../data/projects';
import { CategoryList } from '../../../elements/category';
import { ProjectList, filterProjectsByCategory } from '../../../elements/project';


export default class Block2 extends React.Component {

  render() {
    const { category } = this.props;
    const places = filterProjectsByCategory(ProjectsData, category);

    return (<div className="container">
      <div className="row">
        <h2>Filtro:</h2>
        <CategoryList data={CategoriesData} category={category} baseUrl="portafolio" />
      </div>
      <div className="row">
        <ProjectList data={places} baseUrl="portafolio" />
      </div>
    </div>);
  }
}

Block2.propTypes = {
  category: React.PropTypes.string,
};
