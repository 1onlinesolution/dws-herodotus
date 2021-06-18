const path = require('path');
const { getenv } = require('@1onlinesolution/dws-utils');

const CORS_ORIGIN = getenv('CORS_ORIGIN', false);
const corsOptions = {};
if (typeof CORS_ORIGIN !== 'undefined' && CORS_ORIGIN !== '') {
  corsOptions.origin = CORS_ORIGIN;
}

module.exports = {
  appName: getenv('APP_NAME'),
  appNameShort: getenv('APP_NAME_SHORT'),
  env: getenv('NODE_ENV'),
  port: parseInt(getenv('PORT_HERODOTUS'), 10),
  corsOptions: corsOptions,
  connectionString: getenv('HERODOTUS_DATABASE_URL'),
  collectionName: getenv('COLLECTION_NAME', false) || 'log',
  bodyParser: {
    urlencodedLimit: getenv('BODYPARSER_URLENCODED_LIMIT', false) || '1mb',
    jsonLimit: getenv('BODYPARSER_JSON_LIMIT', false) || '1mb',
  },
  path: path.resolve(__dirname, '../log/errors.log'),
};
