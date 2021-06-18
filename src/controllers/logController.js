const ControllerBase = require('@1onlinesolution/dws-express-app/lib/controllers/controllerBase');
const { HttpStatusResponse, ipAddress } = require('@1onlinesolution/dws-http');
const { Logger, fileOptions, consoleOptions, mongoOptions } = require('@1onlinesolution/dws-log');
const env = require('../env');

const LOG_TO_FILE = 0;
const LOG_TO_DB = 1;

// fileOptions.filename = `/var/log/${env.appNameShort}/errors.log`;  // gives EACCES error
fileOptions.filename = env.path;
fileOptions.level = 'info';
fileOptions.json = false;
consoleOptions.level = 'info';
consoleOptions.json = false;
mongoOptions.level = 'info';
mongoOptions.db = env.connectionString;
mongoOptions.collection = env.collectionName;

const isProduction = process.env.NODE_ENV === 'production';

class LogController extends ControllerBase {
  constructor(expressApp) {
    super(expressApp);

    this.fileLogger = new Logger({
      label: env.appName,
      level: 'info',
      preferGlobalOptions: true,
      useFile: true,
      fileOptions: fileOptions,
    });

    this.dbLogger = new Logger({
      label: env.appName,
      level: 'info',
      preferGlobalOptions: true,
      useMongoDB: true,
      mongoOptions: mongoOptions,
    });

    this.writeErrorToFile = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_FILE, mode: 'error', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.writeErrorToDb = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_DB, mode: 'error', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.writeWarnToFile = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_FILE, mode: 'warn', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.writeWarnToDb = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_DB, mode: 'warn', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.writeInfoToFile = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_FILE, mode: 'info', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.writeInfoToDb = async (req, res) => {
      const ip = ipAddress(req);
      try {
        await this.logCore({ type: LOG_TO_DB, mode: 'info', ip, ...req.body });
        return res.json(HttpStatusResponse.created('ok', undefined, ip));
      } catch (err) {
        return res.json(HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip));
      }
    };

    this.logCore = async ({ type, mode, ip, message, meta }) => {
      if (!message) return Promise.reject(new Error('message is not valid'));
      if (!ip) return Promise.reject(new Error('IP address is not valid'));

      try {
        switch (mode) {
          case 'error':
            if (type === LOG_TO_FILE) await this.fileLogger.error(message, meta);
            if (type === LOG_TO_DB) await this.dbLogger.error(message, meta);
            break;
          case 'warn':
            if (type === LOG_TO_FILE) await this.fileLogger.warn(message, meta);
            if (type === LOG_TO_DB) await this.dbLogger.warn(message, meta);
            break;

          default:
            if (type === LOG_TO_FILE) await this.fileLogger.info(message, meta);
            if (type === LOG_TO_DB) await this.dbLogger.info(message, meta);
        }

        return HttpStatusResponse.noContent({ message, meta }, undefined, ip);
      } catch (err) {
        return HttpStatusResponse.serverError(undefined, isProduction ? err.message : err, ip);
      }
    };

    Object.freeze(this);
    return this;
  }
}

module.exports = LogController;
