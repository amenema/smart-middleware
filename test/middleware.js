/**
 * Created by menzhongxin on 2016/10/27.
 * middleware rules:
 *    template: {url: 'url', fn: [fn1,fn2]}
 *    url: (url.indexOf('\') === 0)? 'this is regexp' : 'this is common String'
 *
 * middle load rules:
 *    reference koa Onion model, in the middleware array ,
 *    the middleware[0] was wrapped in the middleware[length-1];
 *    and in the fn array , is opposite on the middle array. the fn[length-1] was wrapped
 *    in the fn[0];
 */
module.exports = [
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
