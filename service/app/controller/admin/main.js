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

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    console.log(result);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  // 获取文章列表
  async getArticleList() {
    console.log(this.ctx.params.offset);
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id =type.Id ' +
              'ORDER BY article.id DESC ' +
              'LIMIT ' + this.ctx.params.offset + ', 7';
    const resList = await this.app.mysql.query(sql);
    const count = await this.app.mysql.query('SELECT COUNT(*) as count FROM  article');
    this.ctx.body = {
      list: resList,
      count: count[0].count,
    };
  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 根据文章Id得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 获取关于页面关于我记录
  async getAboutMe() {
    const sql = "SELECT id,content,FROM_UNIXTIME(create_time,'%Y-%m-%d') as createTime FROM about WHERE type=0";
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: results,
    };
  }

  // 删除“关于”页面记录
  async delAbout() {
    const results = await this.app.mysql.delete('about', {
      id: this.ctx.params.id,
    });
    const updateSuccess = results.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 添加“关于”页面记录
  async addAbout() {
    const datas = this.ctx.request.body;
    const result = await this.app.mysql.insert('about', datas);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  // 修改文章
  async updateAbout() {
    const datas = this.ctx.request.body;
    const result = await this.app.mysql.update('article', datas);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }
}

module.exports = MainController;
