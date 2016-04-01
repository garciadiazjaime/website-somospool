import React from 'react';

const style = require('./style.scss');


export default class Powered extends React.Component {

  render() {
    return (<div className={style.powered}>
        <div className="container-fluid">
          <div className="row">
            <div className={'col-xs-4 ' + style.column}>
              <p>Derechos reservados &copy; BrandingPool</p>
            </div>
            <div className={'col-xs-4 ' + style.column}>
              <p>Código por <a href="http://www.mintitmedia.com">Mint</a></p>
            </div>
            <div className={'col-xs-4 ' + style.column}>
              <span className={style.logo} />
            </div>
          </div>
        </div>
    </div>);
  }
}
