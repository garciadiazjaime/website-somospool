/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
const style = require('./style.scss');
import Carousel from '../../../../elements/carousel';

export default class Block1 extends React.Component {

  constructor(props) {
    super(props);
    this.shareFacebook = this.shareFacebook.bind(this);
    this.displayImages = this.displayImages.bind(this);
    this.state = {
      images: [],
    };
  }

  getImage(url, index) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          url,
          index,
        });
      };
      img.onerror = () => {
        reject(url);
      };
      img.src = url;
    });
  }

  getTextEl(item, index) {
    if (item && item.text && item.text.length) {
      const bits = item.text.split('\r\n');
      if (bits.length > 1) {
        return bits.map((text, index2) => {
          if (index2 === 0) {
            return (<h2 key={index2}>{text}</h2>);
          } else if (text === '') {
            return (<br />);
          }
          return (<p key={index2}>{text}</p>);
        });
      }
    }
    return (<p key={index}>
      {item.text}
    </p>);
  }

  getImageEl(project, item, index) {
    if (item && _.isArray(item.image_set) && item.image_set.length) {
      const imgUrl = item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      this.state.images.push({
        url: imgUrl,
        index,
      });
      return (<img src="/images/placeholder.png" alt={project.title} className={'img-responsive ' + style.imagePlaceholder } id={'image_' + index} />);
    }
    return null;
  }

  getSliderEl(project, item, index) {
    if (item && _.isArray(item.image_set) && item.image_set.length) {
      return item.image_set.map((image, index2) => {
        const imageId = index + '_' + index2;
        const data = {
          image_set: [image],
        };
        const className = index2 === 0 ? 'active' : '';
        return (<div className={'item ' + className} key={index2}>
          {this.getImageEl(project, data, imageId)}
        </div>);
      });
    }
    return null;
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

  displayImages(images) {
    const imageData = images.shift();
    const rescursive = this.displayImages;
    if (imageData) {
      this.getImage(imageData.url, imageData.index)
        .then((data) => {
          $('#image_' + data.index).attr('src', data.url).css('maxHeight', 'inherit');
          rescursive(images);
        })
        .catch((url) => {
          console.log('Error loading ' + url);
          rescursive(images);
        });
    }
  }

  renderImage(project, item, index) {
    return (<div key={index} className="row">
      {this.getImageEl(project, item, index)}
    </div>);
  }

  renderText(item, index) {
    const textEl = this.getTextEl(item, index);
    return (<div className="container-fluid" key={index}>
      <div clasName="row">
        <div className={'col-xs-12 col-sm-8 col-sm-offset-2 ' + style.description_solo}>
          {textEl}
        </div>
      </div>
    </div>);
  }

  renderImageImage(project, item, index) {
    if (item && _.isArray(item.image_set) && item.image_set.length) {
      const imagesEl = item.image_set.slice(0, 2).map((image, index2) => {
        const imageId = index + '_' + index2;
        const data = {
          image_set: [image],
        };
        return (<div className="col-sm-6 col-xs-12" key={index2}>
          <div className="row">
            {this.getImageEl(project, data, imageId)}
          </div>
        </div>);
      });
      return (<div key={index}>
          <div className="row">
            {imagesEl}
          </div>
        </div>);
    }
    return null;
  }

  renderTextImage(project, item, index, type) {
    const textEl = this.getTextEl(item, index);
    const imageEl = this.getImageEl(project, item, index);
    const content = [];
    if (type === 'TEXT_IMAGE') {
      content.push((<div className={'col-xs-12 col-sm-6 ' + style.description} key={1}>
        {textEl}
      </div>), (<div className={'col-xs-12 col-sm-6'} key={2}>
        <div className="row">
          {imageEl}
        </div>
      </div>));
    } else {
      content.push((<div className={'col-xs-12 col-sm-6'} key={2}>
        <div className="row">
          {imageEl}
        </div>
      </div>), (<div className={'col-xs-12 col-sm-6 ' + style.description} key={1}>
        {textEl}
      </div>));
    }
    return (<div className="container-fluid" key={index}>
      <div clasName="row">
        {content}
      </div>
    </div>);
  }

  renderSlider(project, item, index) {
    const sliderEl = this.getSliderEl(project, item, index);
    const carouselClasses = {
      inner: style.inner,
      controls: {
        base: style.controls,
        prev: style.prev,
        next: style.next,
      },
    };
    return (<div key={index} className="row">
        <Carousel id={'project_carousel_' + index} interval={8000} classes={carouselClasses}>
          {sliderEl}
        </Carousel>
      </div>);
  }

  renderSliderText(project, item, index, type) {
    const sliderEl = this.getSliderEl(project, item, index);
    const textEl = this.getTextEl(item, index);
    const content = [];
    const carouselClasses = {
      inner: style.inner,
      controls: {
        base: style.controls,
        prev: style.prev,
        next: style.next,
      },
    };
    if (type === 'SLIDER_TEXT') {
      content.push((<div className="col-xs-12 col-sm-6" key={1}>
        <div className="row">
          <Carousel id={'project_carousel_' + index} interval={8000} classes={carouselClasses}>
            {sliderEl}
          </Carousel>
        </div>
      </div>), (<div className="col-xs-12 col-sm-6" key={2}>
        {textEl}
      </div>));
    } else {
      content.push((<div className="col-xs-12 col-sm-6" key={2}>
        {textEl}
      </div>), (<div className="col-xs-12 col-sm-6" key={1}>
        <div className="row">
          <Carousel id={'project_carousel_' + index} interval={8000} classes={carouselClasses}>
            {sliderEl}
          </Carousel>
        </div>
      </div>));
    }
    return (<div key={index}>
      {content}
    </div>);
  }

  renderSliderImage(project, item, index, type) {
    const images = _.clone(item.image_set);
    let imageData = {};
    let sliderData = {};
    if (type === 'SLIDER_IMAGE') {
      imageData = {
        image_set: [images.pop()],
      };
      sliderData = {
        image_set: images,
      };
    } else {
      imageData = {
        image_set: [images.shift()],
      };
      sliderData = {
        image_set: images,
      };
    }
    const sliderEl = this.getSliderEl(project, sliderData, index);
    const imageEl = this.getImageEl(project, imageData, index);
    const content = [];
    const carouselClasses = {
      inner: style.inner,
      controls: {
        base: style.controls,
        prev: style.prev,
        next: style.next,
      },
    };
    if (type === 'SLIDER_IMAGE') {
      content.push((<div className="col-xs-12 col-sm-6" key={1}>
        <div className="row">
          <Carousel id={'project_carousel_' + index} interval={8000} classes={carouselClasses}>
            {sliderEl}
          </Carousel>
        </div>
      </div>), (<div className="col-xs-12 col-sm-6" key={2}>
        <div className="row">
          {imageEl}
        </div>
      </div>));
    } else {
      content.push((<div className="col-xs-12 col-sm-6" key={2}>
        <div className="row">
          {imageEl}
        </div>
      </div>), (<div className="col-xs-12 col-sm-6" key={1}>
        <div className="row">
          <Carousel id={'project_carousel_' + index} interval={8000} classes={carouselClasses}>
            {sliderEl}
          </Carousel>
        </div>
      </div>));
    }
    return (<div key={index}>
      {content}
    </div>);
  }

  renderProject(data) {
    if (data && data.info && _.isArray(data.blocks) && data.blocks.length) {
      return data.blocks.map((item, index) => {
        switch (item.type.toUpperCase()) {
          case 'IMAGE':
            return this.renderImage(data.info, item, index);
          case 'TEXT':
            return this.renderText(item, index);
          case 'IMAGE_IMAGE':
            return this.renderImageImage(data.info, item, index);
          case 'TEXT_IMAGE':
          case 'IMAGE_TEXT':
            return this.renderTextImage(data.info, item, index, item.type.toUpperCase());
          case 'SLIDER':
            return this.renderSlider(data.info, item, index);
          case 'SLIDER_TEXT':
          case 'TEXT_SLIDER':
            return this.renderSliderText(data.info, item, index, item.type.toUpperCase());
          case 'SLIDER_IMAGE':
          case 'IMAGE_SLIDER':
            return this.renderSliderImage(data.info, item, index, item.type.toUpperCase());
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
    this.displayImages(this.state.images);
    return (<div className={style.project}>
      {projectEl}
      <div className="container-fluid">
        <div className={'row ' + style.navigate}>
          <div className="col-xs-5 xs-offset-1 col-sm-7 col-xs-offset-1">
            <Link className={style.proyectos} to="/" title="proyectos">Proyectos</Link>
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
