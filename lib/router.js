/**
 * Created by menzhongxin on 2016/10/26.
 */
var METHOD = ['get', 'post', 'put', 'delete']
  , util = require('./utils.js');

var BaseRouter = function(){};
module.exports = new BaseRouter();

/**
 * 迭代在路由头部插入中间件,按照中间件的顺序添加
 * @param args
 * @param middleware
 */
var insertMiddleware = function(args, middleware){
  "use strict";
  !util.isArray(middleware) && (middleware = [middleware]);
  for(var i = 0; i < middleware.length; i ++) {
    args.splice(i + 1, 0, middleware[i]);
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
    , rules = options.rules || []
    , rule
    , len = rules.length
    , templateUrl = '';

  if(typeof url !== 'string')
    throw new Error('miss url !');
  if(!util.isArray(rules)){
    throw new Error('options.middleware should be a Array!');
  }

  while (len > 0){
    len -= 1;
    rule = rules[len];
    templateUrl = rule.url;
    if(templateUrl.indexOf('\\') == 0){
      new RegExp(templateUrl.substring(1), 'i').test(url) && insertMiddleware(args, rule.fn);
    }else{
      (templateUrl === url) && insertMiddleware(args, rule.fn);
    }
  }

  router[method].apply(router, args);
};

BaseRouter.prototype.init = function(options){
  "use strict";
  METHOD.forEach(function(method){
    "use strict";
    BaseRouter.prototype[method] = function(){
      doMethod(Array.prototype.slice.call(arguments), method, options);
    };
  });
};



