// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth(app);
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/register', controller.admin.main.register);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
};
