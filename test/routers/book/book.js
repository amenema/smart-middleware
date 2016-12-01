/**
 * Created by menzhongxin on 2016/12/1.
 */
module.exports = function(router){
  router.get('/open/book/update', function *(next){
    this.body += '/open/book/update';
  });
  router.get('/open/book/delete', function *(next){
    this.body += '/open/book/delete';
  });
};