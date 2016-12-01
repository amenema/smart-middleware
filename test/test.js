"use strict"
/**
 * Created by menzhongxin on 2016/11/15.
 */
var sm = require('../lib/index.js')
  , middleware = require('./middleware.js')
  , utils = require('../lib/utils.js')
  , app = require('koa')()
  , router = require('koa-router')()
  , request = require('supertest')
  , should = require('should')
  , req




describe('utils', () => {

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

