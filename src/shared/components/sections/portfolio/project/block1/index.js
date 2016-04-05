import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
const style = require('./style.scss');

export default class Block2 extends React.Component {

  constructor(props) {
    super(props);
    this.shareFacebook = this.shareFacebook.bind(this);
  }

  shareFacebook() {
    const projectUrl = encodeURIComponent(window.location.href);
    const data = [
      'https://www.facebook.com/dialog/share?', // url
      'app_id=1128940077157028', // app_id
      '&display=popup', // display
      '&href=' + projectUrl, // href
      '&redirect_uri=' + projectUrl, // redirect_uri
    ];
    const url = data.join('');
    window.open(url, '_blank');
  }

  renderImage(project, item, index) {
    if (item && _.isArray(item.image_set) && item.image_set.length) {
      const imgUrl = item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      return (<div key={index}>
          <img src={imgUrl} alt={project.title} className="img-responsive" />
        </div>);
    }
    return null;
  }

  renderProject(data) {
    if (data && data.info && _.isArray(data.blocks) && data.blocks.length) {
      return data.blocks.map((item, index) => {
        switch (item.type.toUpperCase()) {
          case 'IMAGE':
            return this.renderImage(data.info, item, index);
          default:
            return null;
        }
      });
    }
    return null;
  }

  render() {
    const { project } = this.props;
    const projectEl = this.renderProject(project);
    return (<div className={style.project}>
      {projectEl}
      <div className="container-fluid">
        <div className={'row ' + style.navigate}>
          <div className="col-xs-5 xs-offset-1 col-sm-7 col-xs-offset-1">
            <Link className={style.proyectos} to="/portafolio" title="proyectos">Proyectos</Link>
          </div>
          <div className="col-xs-6 col-sm-4">
            <p>Compartir</p>
            <a className={style.sm} onClick={this.shareFacebook}>facebook</a>
            <a className={style.sm} href="https://www.pinterest.com/pin/create/button/" data-pin-custom>pinterest</a>
          </div>
        </div>
      </div>
    </div>);
  }
}

Block2.propTypes = {
  project: React.PropTypes.object,
};
