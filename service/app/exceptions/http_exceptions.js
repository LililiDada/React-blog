/* eslint-disable strict */
class HttpExceptions extends Error {
  constructor(msg = '服务器异常', errorCode = 1, httpCode = 400) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.httpCode = httpCode;
  }
}
module.exports = { HttpExceptions };
