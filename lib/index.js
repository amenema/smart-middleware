/**
 * Created by menzhongxin on 2016/10/26.
 */
var requireDir = require('require-dir')
  , router = require('./router.js');


/**
 * 迭代加载router
 * @param options
 */
exports.router = function(options){
  "use strict";
  var routers = requireDir(options.path)
    , router = new router(options);
  routers.forEach(function(current){
    current(router);
  });
};

