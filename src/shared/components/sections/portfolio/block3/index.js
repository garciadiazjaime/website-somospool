import React from 'react';

const style = require('./style.scss');

export default class Block2 extends React.Component {

  render() {
    return (<div className={style.project}>
      <div className={style.banner}>
        <img src="/images/danke/banner.jpg" />
        <div className={style.legend}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-10 col-sm-6 col-xs-offset-1">
                <h1>
                  Una marca de sabores extraordinarios
                </h1>
                <h2>Danke</h2>
                <h3>
                  Food truck branding
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div clasName="row">
          <div className={'col-xs-12 col-sm-8 col-sm-offset-2 ' + style.description}>
            <h2>Hamburguesas extra-ordinarias</h2>
            <p>
              DANKE es un Food Truck de comida para los amantes de la comida “Gourman”,
              hamburguesas que dan de que hablar, que sobrepasan los límites de lo ordinario
              haciendo énfasis en el sabor y las porciones.
            </p>
            <p>
              El equipo de DANKE contactó a -Branding Pool- cuando todavia no era DANKE,
              participamos en la creación de esta nueva marca desde el principio desarrollando
              su idea de marca, nombre, identidad y aplicaciones en punto de venta.
            </p>
            <p>
              Para su identidad se desarrollo un ambigrama el cual puede leerse en ambos
              sentidos, utilizando elementos gráﬁcos de estilo “Steam Punk” con referencias
              industriales y a la ciencia-ﬁcción de Julio Verne, predominando el color negro con
              detalles en laminado cobre.
            </p>
          </div>
        </div>
      </div>
      <img src="/images/danke/img1.jpg" />
      <img src="/images/danke/img2.jpg" />
      <img src="/images/danke/img3.jpg" />
      <img src="/images/danke/img4.jpg" />
      <img src="/images/danke/img5.jpg" />
      <img src="/images/danke/img6.jpg" />
      <img src="/images/danke/img7.jpg" />
      <img src="/images/danke/img8.jpg" />
      <img src="/images/danke/img9.jpg" />
      <div className="container-fluid">
        <div className={'row ' + style.navigate}>
          <div className="col-xs-5 xs-offset-1 col-sm-7 col-xs-offset-1">
            <a className={style.proyectos} href="/proyectos" title="proyectos">Proyectos</a>
          </div>
          <div className="col-xs-6 col-sm-4">
            <p>Compartir</p>
            <a className={style.sm} href="http://www.facebook.com">facebook</a>
            <a className={style.sm} href="http://www.pinterest.com">pinterest</a>
          </div>
        </div>
      </div>
    </div>);
  }
}

Block2.propTypes = {
  category: React.PropTypes.string,
};
