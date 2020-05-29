// eslint-disable-next-line strict
'use stric';
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList/:pageId', controller.default.home.getArticleList);
  router.get('/default/getMoreTimeline/:offset', controller.default.home.getMoreTimeline);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getAboutList', controller.default.home.getAboutList);
  router.get('/default/getArchiveList', controller.default.home.getArchiveList);
};
