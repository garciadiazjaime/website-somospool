import React from 'react';

const style = require('./style.scss');

import CategoriesData from '../../../../data/categories';
import ProjectsData from '../../../../data/projects';
import { CategoryList } from '../../../elements/category';
import { ProjectList, filterProjectsByCategory } from '../../../elements/project';


export default class Block2 extends React.Component {

  render() {
    const { category } = this.props;
    const places = filterProjectsByCategory(ProjectsData, category);

    return (<div>
      <div className={style.filtro}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              <h2>Filtro:</h2>
            </div>
            <div className="col-xs-10 col-sm-11">
              <CategoryList data={CategoriesData} category={category} baseUrl="portafolio" />
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
};
