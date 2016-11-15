/**
 * Created by menzhongxin on 2016/10/26.
 */
var METHOD = ['get', 'post', 'put', 'delete'];
var util = require('./utils.js');
var BaseRouter = function(options){
  "use strict";
  this.options = options;
};
module.exports = BaseRouter;

/**
 * 迭代在路由头部插入中间件,按照中间件的顺序添加
 * @param args
 * @param middleware
 */
var insertMiddleware = function(args, middleware){
  "use strict";
  !util.isArray(middleware) && (middleware = [middleware]);
  for(var i = 0; i < middleware.length; i ++) {
    args.insert(i + 1, middleware[i]);
  }
};

/**
 * 匹配method
 * @param args
 * @param method
 * @param options
 */
var doMethod = function(args, method, options){
  "use strict";
  var url = args[0]
    , router = options.router
    , middlewares = options.middleware || []
    , middleware;

  if(typeof url !== 'string')
    throw new Error('miss url !');
  if(!util.isArray(middlewares)){
    throw new Error('options.middleware should be a Array!');
  }

  for(var i = 0 ; i < middlewares.length; i++){
    middleware= middlewares[i];
    if(middleware.url.indexOf('\\') == 0){
      new RegExp(middleware.url.substring(1), 'i').test(url) && insertMiddleware(args, middleware.fn);
    }else{
      (middleware.url === url) && insertMiddleware(args, middleware.fn);
    }
  }

  router[method].apply(router, args);
};


METHOD.forEach(function(method){
  "use strict";
  BaseRouter[method] = function(){
    doMethod(Array.prototype.slice.call(arguments), method, this.options);
  };
});

