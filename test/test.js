"use strict"
/**
 * Created by menzhongxin on 2016/11/15.
 */
var sm = require('../lib/index.js')
  , middleware = require('./middleware.js')
  , utils = require('../lib/utils.js')
  , app = require('koa')()
  , path = require('path')
  , router = require('koa-router')()
  , request = require('supertest')
  , should = require('should')
  , req

describe('util test', () => {
  let routers,config,fakeUrl
  beforeEach( () => {
    routers = path.join(__dirname, '/routers')
    config = path.join(__dirname, './middleware.js')
    fakeUrl = path.join(__dirname, '/fake')
  })

  it('throw err', (done) => {
    utils.load('', (err, rs) => {
      err.message.should.be.equal("ENOENT: no such file or directory, scandir ''")
      done()
    })
  })

  it('exists', (done) => {
    utils.exists(routers).should.be.true()
    utils.exists(fakeUrl).should.be.false()
    done()
  })

  it('isDir', (done) => {
    utils.isDir(routers).should.be.true()
    utils.isDir(config).should.be.false()
    done()
  })

  it('isFile', (done) => {
    utils.isFile(routers).should.be.false()
    utils.isFile(config).should.be.true()
    done()
  })

  it('load a file', (done) => {
    utils.load(config, (err, rs) => {
      rs.length.should.be.equal(0)
      done()
    })
  })

  it('load a dir', (done) => {
    utils.load(routers, (err, rs) => {
      rs.length.should.be.equal(2)
      done()
    })
  })

  it("isArray", done => {
    utils.isArray({}).should.be.false()
    utils.isArray([]).should.be.true()
    utils.isArray('').should.be.false()
    utils.isArray(1).should.be.false()
    utils.isArray(true).should.be.false()
    utils.isArray(() => {}).should.be.false()
    done()
  })

})


describe('autoLoading', () => {

  beforeEach(() => {
    var ignore = __dirname + '/routers/book/book.js'
    sm.autoLoading(__dirname + '/routers', {router: router, rules: middleware, ignore: [ignore]})
    app.use(router.routes())
    req = request(app.listen())
  })
  it('should return /list', done => {
    req.get('/list')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        console.log(res.text)
        res.text.should.be.eql('_m_1_m_2_m_3_m_4/list_end_4_end_3_end_2_end_1')
        done()
      })
  })

  it('should return /open/user', done => {
    req.get('/open/user')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        console.log(res.text)
        res.text.should.be.eql('_m_1/open/user_end_1')
        done()
      })
  })

  it('should return /open/book/', done => {
    
    req.get('/open/book/list')
      .expect(200)
      .end( (err, res) => {
        should.not.exist(err)
        res.text.should.be.eql('_m_1/book/list_end_1')
        done()
      })
  })

  it('ignore test', done => {

    req.get('/open/book/delete')
      .end((err, res) => {
        should.not.exist(err)
        res.statusCode.should.be.eql(404)
        res.text.should.be.eql('Not Found')
        done()
      })
  })
})

