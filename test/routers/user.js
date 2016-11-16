/**
 * Created by menzhongxin on 2016/11/16.
 */
module.exports = function(router){
  router.get('/list', function *(next){
    this.body += '/list';
  });
  router.get('/open/user', function *(next){
    this.body += '/open/user';
  });
};
