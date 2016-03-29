import React from 'react';

const style = require('./style.scss');


export default class Powered extends React.Component {

  render() {
    const data = [{
      name: 'POOL',
      url: 'http://somospool.com',
      title: 'somos pool',
    }, {
      name: 'MINT',
      url: 'http://mintitmedia.com',
      title: 'Diseño y Desarrollo Web en Tijuana',
    }];

    return (<div className={style.powered}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              Derechos reservados &copy; BrandingPool
            </div>
            <div className="col-xs-12 col-sm-6">
              Código por:&nbsp;
              <a href={data[1].url} title={data[1].title} target="_blank">{data[1].name}</a>
            </div>
          </div>
        </div>
    </div>);
  }
}
