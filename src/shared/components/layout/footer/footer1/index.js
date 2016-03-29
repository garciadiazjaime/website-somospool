import React from 'react';

const style = require('./style.scss');
import Powered from './powered';
import Profile from './profile';

export default class FooterAAA extends React.Component {

  render() {
    return (<div className={style.footerWrapper}>
      <div className="container-fluid">
        <Profile />
      </div>
      <Powered />
    </div>);
  }
}

FooterAAA.propTypes = {
  items: React.PropTypes.array.isRequired,
  addresses: React.PropTypes.array,
};
