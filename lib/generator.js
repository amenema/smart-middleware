'use strict'
/**
 * Created by menzhongxin on 2016/11/24.
 */
const _ = require('lodash')
const utils = require('./utils')
const base = require('./router')

let dealFile = file => {
    let router = require(file)
    router(base)
}

let load = (path, options) => {
    let file = []
    let dir = []
    let ignore = options.ignore|| []
    let target = options.target|| undefined
    utils.load(path, (err, rs) => {
        _.each(rs, c => {
            if(ignore.indexOf(path + '/' + c) < 0){
                if(utils.isDir(c, path)){
                    dir.push(path + '/' + c)
                }else if(c === target || target === undefined){
                    file.push(path + '/' + c)
                }
            }
        })
        _.each(dir, c => {
            load(c, options)
        })
        _.each(file, c=> {
            dealFile(c)
        })
    })
}

let init = exports.init = (path, options) => {
    base.init(options)
    load(path, options)
}

