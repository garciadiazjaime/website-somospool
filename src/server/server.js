/* eslint max-len: [2, 500, 4] */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import bodyParser from 'body-parser';

import DataWrapper from './dataWrapper';
import config from '../../config';
import apiRoutes from './helpers/api';
import routes from '../shared/config/routes';
import restClient from './helpers/rest-client';

const app = express();

const _portfolioData = {
  categories: [],
  projects: [],
};

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.static('static'));

app.use('/api/', apiRoutes);

app.get('/*', (req, res, next) => {
  const promises = [];

  if (req.url.indexOf('portafolio') !== -1) {
    promises.push(new Promise((resolve, reject) => {
      restClient({
        path: 'http://127.0.0.1:8000/api/category/',
      }).then((response) => {
        resolve(response.entity);
      }, (response) => {
        reject(response);
      });
    }));

    promises.push(new Promise((resolve, reject) => {
      restClient({
        path: 'http://127.0.0.1:8000/api/project/',
      }).then((response) => {
        resolve(response.entity);
      }, (response) => {
        reject(response);
      });
    }));
  }

  if (promises.length) {
    Promise.all(promises).then((data) => {
      _portfolioData.categories = data[0];
      _portfolioData.projects = data[1];
      next();
    });
  } else {
    next();
  }
}, (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const props = req.url.indexOf('portafolio') !== -1 ? {
        categories: _portfolioData.categories,
        projects: _portfolioData.projects,
      } : {};
      const content = renderToString(<DataWrapper data={props}><RoutingContext {...renderProps} /></DataWrapper>);
      res.render('index', { content, props });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    console.log(err);
  }

  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
