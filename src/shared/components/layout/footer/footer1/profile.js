import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class FooterTop extends React.Component {

  render() {
    return (<div className="row">
      <div className={'col-xs-12 col-sm-4 col-xs-12" ' + style.column}>
        <h4>Ven</h4>
        <p>AV. GUANAJUATO 2350 COL. CACHO TIJUANA BAJA CALIFORNIA</p>
      </div>
      <div className={'col-xs-12 col-sm-4 col-xs-12" ' + style.column}>
        <h4>LIKE</h4>
        <ul>
          <li><Link to="">FACEBOOK</Link></li>
          <li><Link to="">INSTAGRAM</Link></li>
          <li><Link to="">BEHANCE</Link></li>
        </ul>
      </div>
      <div className={'col-xs-12 col-sm-4 col-xs-12" ' + style.column}>
        <h4>HOLA</h4>
        <ul>
          <li>390 05 05</li>
          <li>HOLA@SOMOSPOOL.COM</li>
        </ul>
      </div>
    </div>);
  }
}
