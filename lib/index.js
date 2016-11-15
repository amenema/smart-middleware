/**
 * Created by menzhongxin on 2016/10/26.
 */
var requireDir = require('require-dir')
  , router = require('./router.js')
  , path = require('path');


/**
 * 迭代加载router
 * @param options
 */
exports.router = function(options){
  "use strict";
  if(!options || !options.path)
      throw 'options.path is required.';
  var routers = requireDir(path.join(options.path, '../../../', options.path))
    , router = new router(options);
  routers.forEach(function(current){
    current(router);
  });
};

