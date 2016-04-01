import React from 'react';

import Block1 from './block1';
import Block2 from './block2';
import Block3 from './block3';

export default class PortfolioSection extends React.Component {
  render() {
    const { category } = this.props.params;
    return (<div>
      <Block1 />
      <Block2 category={category} />
      <Block3 />
      </div>);
  }
}

PortfolioSection.propTypes = {
  params: React.PropTypes.any,
};
