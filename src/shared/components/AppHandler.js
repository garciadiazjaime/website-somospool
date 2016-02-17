import React from 'react';

import menuData from '../menuData';
import Menu from './layout/menu/menuAAA';
import FooterAAA from './layout/footer/footerAAA';


export default class AppHandler extends React.Component {

  render() {
    return (
      <div>
        <Menu items={menuData.items} icons={menuData.icons} />
        {this.props.children}
        <FooterAAA />
      </div>
    );
  }
}

AppHandler.propTypes = {
  children: React.PropTypes.object.isRequired,
};
