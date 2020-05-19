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

  async getAboutList() {
    let desSql = "SELECT id,content,FROM_UNIXTIME(create_time,'%b  %d, %Y') as createTime FROM about WHERE type=0";
    const describe = await this.app.mysql.query(desSql);
    let recSql = "SELECT id,content,FROM_UNIXTIME(create_time,'%b  %d, %Y') as createTime FROM about WHERE type=1 ORDER BY create_time DESC";
    const record = await this.app.mysql.query(recSql);
    this.ctx.body = { describe, record };
  }

  async getArchiveList() {
    let sql = "SELECT id,title,FROM_UNIXTIME(addTime,'%b  %d, %Y') as date,FROM_UNIXTIME(addTime,'%b %Y') as month FROM article ORDER BY addTime DESC";
    const results = await this.app.mysql.query(sql);
    // 把源数据先变成目标数据的规则
    let resultsRule = [];
    results.forEach(item => {
      let olditem = {
        cateTitle: item.month,
        postList: [],
      };
      let list = {
        id: item.id,
        title: item.title,
        date: item.date,
      };
      olditem.postList.push(list);
      resultsRule.push(olditem);
      console.log(resultsRule);
    });
    /**
     * 先去重，后合并
     * 1、数据源去重
     * 2、吧去重后的数据和数据中相同的cateTitle的数据合并postList
     */
    let newResults = [];
    let newObj = {}; // { 'Jun 2020': true, 'May 2020': true }
    resultsRule.forEach((el, i) => {
      if (!newObj[el.cateTitle]) {
        newResults.push(el);
        newObj[el.cateTitle] = true;
      } else {
        newResults.forEach(el => {
          if (el.cateTitle === resultsRule[i].cateTitle) {
            el.postList = [ ...el.postList, ...resultsRule[i].postList ]; // es6语法
          }
        });
      }
    });
    this.ctx.body = { data: newResults };
  }
}

module.exports = HomeController;
