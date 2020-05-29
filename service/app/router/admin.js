// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth(app);
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/register', controller.admin.main.register);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.get('/admin/getArticleList/:offset', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getAboutMe', adminauth, controller.admin.main.getAboutMe);
  router.get('/admin/getAboutTime', adminauth, controller.admin.main.getAboutTime);
  router.get('/admin/delAbout/:id', adminauth, controller.admin.main.delAbout);
  router.post('/admin/addAbout', adminauth, controller.admin.main.addAbout);
  router.post('/admin/updateAbout', adminauth, controller.admin.main.updateAbout);
};
