import React from 'react';

import Block1 from './block1';
import Block2 from './block2';
import Block3 from './block3';
import data from './data';

export default class AboutSection extends React.Component {
  render() {
    return (<div>
      <Block1 data={data.block1} />
      <Block2 data={data.block2} />
      <Block3 data={data.block3} />
      </div>);
  }
}
