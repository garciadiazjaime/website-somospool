/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
const style = require('./style.scss');

export default class Block1 extends React.Component {

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
      // <img src={imgUrl} alt={project.title} className="img-responsive" />
      console.log('imgUrl', imgUrl);

      (function (imageIndex) {
        console.log('imageIndex:start', imageIndex);
        const downloadingImage = new Image();
        downloadingImage.onload = function () {
          // image.src = this.src;
          console.log('imageIndex:end', imageIndex);
          $('#image_' + imageIndex).attr('src', this.src);
        };
        downloadingImage.src = imgUrl;
      })(index);

      return (<div key={index}>
          <img src="/images/landing.gif" alt={project.title} className="img-responsive" id={'image_' + index} />
        </div>);
    }
    return null;
  }

  renderDescription(project, item, index) {
    let response;
    if (item && item.text && item.text.length) {
      const bits = item.text.split('\r\n');
      if (bits.length > 1) {
        response = bits.map((text, index2) => {
          if (index2 === 0) {
            return (<h2 key={index2}>{text}</h2>);
          } else if (text === '') {
            return (<br />);
          }
          return (<p key={index2}>{text}</p>);
        });
      } else {
        response = (<p key={index}>
          {item.text}
        </p>);
      }
      return (<div className="container-fluid" key={index}>
        <div clasName="row">
          <div className={'col-xs-12 col-sm-8 col-sm-offset-2 ' + style.description}>
            {response}
          </div>
        </div>
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
          case 'DESCRIPTION':
            return this.renderDescription(data.info, item, index);
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

Block1.propTypes = {
  project: React.PropTypes.object,
};
