# smart-middleware

[![Travis](https://img.shields.io/badge/npm-0.1.1-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/smart-middleware)
[![Build Status](https://travis-ci.org/amenema/smart-middleware.svg?branch=master)](https://travis-ci.org/amenema/smart-middleware)
[![Coverage Status](https://coveralls.io/repos/github/amenema/smart-middleware/badge.svg?branch=master)](https://coveralls.io/github/amenema/smart-middleware?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/amenema/smart-middleware/https://github.com/amenema/smart-middleware/blob/master/LICENSE)
 
 Router middleware for [koa](https://github.com/koajs/koa/).

> feedbacks are welcome
## CN
[click here](http://menzhongxin.com/2016/11/17/smart-middleware/)
## Features
* auto loading router
* auto matching middleware by config 

## Installation
install with [npm](https://www.npmjs.com/package/smart-middleware)
```
npm install smart-middleware
```

## Usage
```
/*step 1 app.js*/
var sm = require('smart-middleware');
var router = require('koa-router')();
var app = require('koa-router')();

var middlewares = [
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
sm.autoLoading({router: router/*required*/, middleware:middlewares, path:__dirname +'/routers'/*required absolute path*/});
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

when you visited the '/list' url , the response body is '_m_3_m_4_m_1_m_2/list'
when you visited the '/open/user'  url , the response body is '_m_1/open/user' 

### middleware roles
 *    template: {url: 'url', fn: [fn1,fn2]}
 *    url: (url.indexOf('\') === 0)? 'this is regexp' : 'this is common String'

### middle load rules:
 *    reference koa Onion model, in the middleware array ,
      the middleware[0] was wrapped in the middleware[length-1];
 *    in the fn array , is opposite on the middle array. the fn[length-1] was wrapped in the fn[0];

## Test
```
npm test
```

## Support
If you have any problem or suggestion please open an [issue](https://github.com/amenema/smart-middleware/issues) here.


