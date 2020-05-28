/* eslint-disable strict */
const jwt = require('jsonwebtoken');
module.exports = app => {
  return async function adminauth(ctx, next) {
    const { authorization = '' } = ctx.request.header;
    if (!authorization) ctx.HttpExceptions('请登录！', 40001, 200);
    const token = authorization.replace('Bearer ', '');
    let user = {};
    try {
      user = jwt.verify(token, app.config.jwt.secret);
    } catch (err) {
      err.name === 'TokenExpiredError' ? ctx.HttpExceptions('请重新登录', 40001, 200) : ctx.HttpExceptions('Token 令牌不合法!', 40001, 200);
    }
    ctx.state = {
      id: user.id,
      userName: user.userName,
    };
    await next();
  };
};
