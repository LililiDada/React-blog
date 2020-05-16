// eslint-disable-next-line strict
'use stric';
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList/:pageId', controller.default.home.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
};
