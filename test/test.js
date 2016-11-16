/**
 * Created by menzhongxin on 2016/11/15.
 */
var kk = require('../lib/index.js')
  , middleware = require('./middleware.js')
  , app = require('koa')()
  , router = require('koa-router')()
  , request = require('supertest')
  , should = require('should')
  , req;

describe('autoLoading', function(){
  "use strict";

  beforeEach(function(){
    kk.autoLoading({router: router, middleware: middleware, path: __dirname + '/routers'});
    app.use(router.routes());
    req = request(app.listen());
  });

  it('should return /list', function(done){
    "use strict";
    req.get('/list')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        res.text.should.be.eql('_m_3_m_4_m_1_m_2/list');
        done();
      });
  });

  it('should return /open/user', function(done){
    "use strict";
    req.get('/open/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        res.text.should.be.eql('_m_1/open/user');
        done();
      });
  });
});