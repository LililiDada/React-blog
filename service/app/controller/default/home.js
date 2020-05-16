/* eslint-disable prefer-const */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api接口';
  }

  async getArticleList() {
    console.log(this.ctx.params.pageId);
    let sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as intorduce,' +
              "FROM_UNIXTIME(article.addTime,'%b  %d, %Y' ) as addTime," +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id =type.Id ' +
              'ORDER BY article.addTime DESC ' +
              'LIMIT ' + this.ctx.params.pageId + ', 12';
    const results = await this.app.mysql.query(sql);
    const count = await this.app.mysql.query('SELECT COUNT(*) as count FROM  article');
    this.ctx.body = {
      data: results,
      count: count[0].count,
    };
  }

  async getArticleById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as intorduce,' +
              "FROM_UNIXTIME(article.addTime,'%b  %d, %Y' ) as addTime," +
              'article.article_cointent  as article_cointent  ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id =type.Id ' +
              'WHERE article.id=' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
