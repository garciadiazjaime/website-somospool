Somospool Website
----

[![Build Status](https://travis-ci.org/garciadiazjaime/website-somospool.svg)](https://travis-ci.org/garciadiazjaime/website-somospool)

Run project:
----
a) let's install all packages:

`npm install`
`bower install`

b) let's run the server

`npm start`

By default server will run on http://127.0.0.1:3030/

Note: `npm run sprites` requires 'sass'
http://sass-lang.com/install

Deploy project
`npm run update`
`git status`
`git diff`
`npm run deploy`

Login rch
setup -l setup email

Remove Cartridge
http://stackoverflow.com/questions/31323791/how-do-you-delete-a-database-cartridge-on-an-openshift-app

Setting up Envs
rhc env set DB_NAME=value -a app
rhc env set DB_USER=value -a app
rhc env set DB_PASSWORD=value -a app
rhc env set DJANGO_SETTINGS_MODULE=settings.prod -a app
rhc env set SENDGRID_API_KEY=value -a app

Checking Envs
rhc env list -a app

Code to increase jslint max line length limit
/* eslint max-len: [2, 500, 4] */
