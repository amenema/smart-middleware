/**
 * Created by menzhongxin on 2016/11/15.
 */
var kk = require('../lib/index.js')
  , middleware = require('./middleware.js')
  , utils = require('../lib/utils.js')
  , app = require('koa')()
  , router = require('koa-router')()
  , request = require('supertest')
  , should = require('should')
  , req;

describe('utils', function(){
  "use strict";
  it("isArray", function(done){
    utils.isArray({}).should.be.false();
    utils.isArray([]).should.be.true();
    utils.isArray('').should.be.false();
    utils.isArray(1).should.be.false();
    utils.isArray(true).should.be.false();
    utils.isArray(function(){}).should.be.false();
    done();
  })
});

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
        console.log(res.text);
        res.text.should.be.eql('_m_1_m_2_m_3_m_4/list_end_4_end_3_end_2_end_1');
        done();
      });
  });

  it('should return /open/user', function(done){
    "use strict";
    req.get('/open/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        console.log(res.text);
        res.text.should.be.eql('_m_1/open/user_end_1');
        done();
      });
  });
});