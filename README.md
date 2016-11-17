# smart-middleware

[![Travis](https://img.shields.io/badge/npm-0.1.1-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/smart-middleware)
[![Build Status](https://travis-ci.org/amenema/smart-middleware.svg?branch=master)](https://travis-ci.org/amenema/smart-middleware)
[![Coverage Status](https://coveralls.io/repos/github/amenema/smart-middleware/badge.svg?branch=master)](https://coveralls.io/github/amenema/smart-middleware?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/amenema/smart-middleware/https://github.com/amenema/smart-middleware/blob/master/LICENSE)
 
 Router middleware for [koa](https://github.com/koajs/koa/tree/v2.x) v2.

> feedbacks are welcome

## Features
* auto loading router
* auto matching middleware by config 

## Installation
install with [npm](https://www.npmjs.com/package/smart-middleware)
```
npm install koa-router
```

## Usage
```
/*step 1 app.js*/
var sm = require('smart-middleware');
var router = require('koa-router')();
var app = require('koa-router')();

var middleware = [
                   {url: '/list',
                     fn: [function *(next){
                       "use strict";
                       this.body += '_m_1';
                       yield next;
                     }, function *(next){
                       "use strict";
                       this.body += '_m_2';
                       yield next;
                     }
                     ]},
                   {url: '\\^(?!/open)', fn: [function *(next){
                     "use strict";
                     this.body = '_m_3';
                     yield next;
                   }, function *(next){
                     "use strict";
                     this.body += '_m_4';
                     yield next;
                   }]}
                   ,{url: '\\(/open)', fn: [function *(next){
                     this.body = '_m_1';
                     yield next;
                   }]}
                 ];
sm.autoLoading({router: router/*required*/, middleware:middleware, path:__dirname +'/routers'/*required absolute path*/});
app.use(router.routes());


/*step 2 /routers/user.js*/
module.exports = function(router){
  router.get('/list', function *(next){
    this.body += '/list';
  });
  router.get('/open/user', function *(next){
    this.body += '/open/user';
  });
};
```

## Test
```
npm test
```
## Support
If you have any problem or suggestion please open an [issue](https://github.com/amenema/smart-middleware/issues) here.


