# smart-middleware

[![Travis](https://img.shields.io/badge/npm-1.0.0-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/smart-middleware)
[![Build Status](https://travis-ci.org/amenema/smart-middleware.svg?branch=master)](https://travis-ci.org/amenema/smart-middleware)
[![Coverage Status](https://coveralls.io/repos/github/amenema/smart-middleware/badge.svg?branch=master)](https://coveralls.io/github/amenema/smart-middleware?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/amenema/smart-middleware/https://github.com/amenema/smart-middleware/blob/master/LICENSE)
 
 Router middleware for [koa](https://github.com/koajs/koa/).

> feedbacks are welcome


[cn api click here](http://menzhongxin.com/2016/11/17/smart-middleware/)
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
                        this.body = '_m_1';
                        yield next;
                        this.body += '_end_1';
                      }, function *(next){
                        "use strict";
                        this.body += '_m_2';
                        yield next;
                        this.body += "_end_2";
                      }
                      ]},
                    {url: '\\^(?!/open)', fn: [function *(next){
                      "use strict";
                      this.body += '_m_3';
                      yield next;
                      this.body += '_end_3';
                    }, function *(next){
                      "use strict";
                      this.body += '_m_4';
                      yield next;
                      this.body += '_end_4';
                    }]}
                    ,{url: '\\^(/open)', fn: [function *(next){
                      this.body = '_m_1';
                      yield next;
                      this.body += '_end_1';
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

* when you visit the '**/list**' url, the response body is **\_m_1_m_2_m_3_m_4/list_end_4_end_3_end_2_end_1**
* when you visit the '**/open/user**' url , the response body is **\_m_1/open/user_end_1** 

### middleware roles
 * template: **\{url: 'url', fn: [m1,m2]}**
 * if template.url begins with '**\\\\**', it will be matched by regExp, else it will be matched by '**===**'; 

### middleware load rules:
* the loading sequence is sorted by the middleware; like the example above, when middlewares are **\[[m1, m2], [m3, m4]]**, 
the loading sequences are **\[[m1, m2], [m3, m4]]**.  

## Test
```
npm test
```

## Support
If you have any problem or suggestion please open an [issue](https://github.com/amenema/smart-middleware/issues) here.


