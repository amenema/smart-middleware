'use strict'
/**
 * Created by menzhongxin on 2016/11/15.
 */
let fs = require('fs')
let path = require('path')

let exists = exports.exists =  path => {
  return fs.existsSync(path)
}

let isDir = exports.isDir = (path, father) => {
  father = father||''
  return exists(father + '/' + path) && fs.statSync(father + '/' + path).isDirectory()
}

let isFile = exports.isFile = path => {
  return exists(path) && fs.statSync(path).isFile()
}

exports.load = (path, cb) => {
  if(!isDir(path)){
    cb(null, [])
  }else{
    fs.readdir(path, (err, rs) => {
      if(err){
        cb(err)
      }else{
        cb(null, rs)
      }
    })
  }
}

exports.isArray= function (obj) {
  return toString.call(obj) === "[object Array]";
};
