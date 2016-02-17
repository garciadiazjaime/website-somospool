import React from 'react';
import { Link } from 'react-router';

const style = process.env.NODE_ENV === 'DEV' ? require('./style.scss') : {};
// import Sprites from '../../../../sprite';


export default class MainMenu extends React.Component {

  getItems(data) {
    return data.map((item, index) => {
      return (
        <li key={index}>
          <Link to={item.url} className={style.navbarNavAnchor} id={item.url}>{item.title}</Link>
        </li>
      );
    });
  }

  getIcons(data) {
    return data.map((item, index) => {
      return (<a key={index} style={item.style} href={item.url}>&nbsp;</a>);
    });
  }

  render() {
    /*eslint-disable */
    // Sprites.General.Logo
    const logo = null;
    return (<div className="container">
        <nav className={style.navbarDefault + ' navbar navbar-default'}>
          <div className="container-fluid">

            <div className={style.navbarHeader + ' navbar-header'}>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainmenu" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="inicio" style={logo}></Link>
            </div>

            <div className={style.navbarCollapse + ' collapse navbar-collapse'} id='mainmenu'>
              <ul className={style.navbarNav + ' nav navbar-nav'}>
                {this.getItems(this.props.items)}
              </ul>
              <div className={style.socialNetwork}>
                {this.getIcons(this.props.icons)}
              </div>
            </div>

          </div>
        </nav>
      </div>
    );
    /*eslint-enable */
  }
}

MainMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  icons: React.PropTypes.array,
};
