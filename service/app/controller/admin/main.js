/* eslint-disable no-undef */
/* eslint-disable no-return-assign */

'use strict';
const Controller = require('egg').Controller;
const utility = require('utility');
const jwt = require('jsonwebtoken');
// const loginRule = {
//   userName: { required: true },
//   passWord: { required: true },
// };
class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  // 注册
  async register() {
    const userName = this.ctx.request.body.userName;
    const results = await this.app.mysql.select('admin_user', { where: { userName } });
    console.log(results);
    if (results.length > 0) ctx.HttpExceptions('该用户已存在', 20002, 200);
    const passWord = this.ctx.request.body.passWord;
    const md5PassWord = utility.md5(passWord);
    // eslint-disable-next-line no-unused-vars
    const result = await this.app.mysql.insert('admin_user', { userName, passWord: md5PassWord });
    this.ctx.body = { data: '注册成功' };
  }
  // 登录
  async login() {
    const { ctx } = this;
    const { userName, passWord } = ctx.request.body;
    // this.ctx.validate(loginRule, this.ctx.request.body);
    const result = await this.app.mysql.get('admin_user', { userName });
    if (!result) ctx.HttpExceptions('该用户不存在！', 20002, 200);
    if (utility.md5(passWord) !== result.passWord) ctx.HttpExceptions('密码不正确!!', 20003, 200);
    const token = jwt.sign({ id: result.id, userName: result.userName }, this.config.jwt.secret, { expiresIn: this.config.jwt.expiresIn });
    ctx.body = { data: '登录成功', token };
  }

  // 获取后台分类信息
  async getTypeInfo() {
    console.log(this.ctx.state);
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {
      data: resType,
    };
  }
}

module.exports = MainController;
