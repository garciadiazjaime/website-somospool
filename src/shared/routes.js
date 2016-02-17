import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';

import AppHandler from './components/AppHandler';
import HomeSection from './components/sections/home';
import PortfolioSection from './components/sections/portfolio';
import AboutSection from './components/sections/about';
import ServicesSection from './components/sections/services';
import ContactSection from './components/sections/contact';


export default(
  <Router>
    <Route path="/" component={AppHandler}>
      <IndexRoute component={HomeSection} />
      <Route path="home" component={HomeSection} />
      <Route path="portafolio" component={PortfolioSection} />
      <Route path="nosotros" component={AboutSection} />
      <Route path="servicios" component={ServicesSection} />
      <Route path="contact" component={ContactSection} />
    </Route>
  </Router>
);
