
const asyncNedb = require('../lib/asyncNedb');

const packInfoDb = asyncNedb.init({
  filename: config.dbFiles.packInfo,
  autoload: true,
});

// load 数据库
packInfoDb.loadDatabase();

module.exports = packInfoDb;