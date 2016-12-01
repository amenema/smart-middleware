/**
 * Created by menzhongxin on 2016/12/1.
 */
module.exports = function(router){
  router.get('/open/book/list', function *(next){
    this.body += '/book/list';
  });
  router.get('/open/book/info', function *(next){
    this.body += '/open/book/info';
  });
};