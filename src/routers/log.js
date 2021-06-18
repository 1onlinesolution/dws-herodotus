const LogController = require('../controllers/logController');

module.exports = (app) => {
  let routerInfo = app.addRouter('/api');
  const router = routerInfo.router;

  const controller = new LogController(app);
  router.post('/file/error', controller.writeErrorToFile);
  router.post('/file/warn', controller.writeWarnToFile);
  router.post('/file/info', controller.writeInfoToFile);

  router.post('/db/error', controller.writeErrorToDb);
  router.post('/db/warn', controller.writeWarnToDb);
  router.post('/db/info', controller.writeInfoToDb);

  return router;
};
