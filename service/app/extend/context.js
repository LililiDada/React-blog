/* eslint-disable strict */
const { HttpExceptions } = require('../exceptions/http_exceptions');
module.exports = {
  HttpExceptions(msg, errorCode, httpCode) {
    throw new HttpExceptions(msg, errorCode, httpCode);
  },
};
