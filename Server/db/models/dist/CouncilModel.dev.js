"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require("../config/dbconfig"),
    POSTGRESQL_DEVELOPMENT_HOST = _require2.POSTGRESQL_DEVELOPMENT_HOST;

var sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
var Council = sequelize.define("council", {
  councilId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  councilName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  councilDesc: DataTypes.TEXT,
  time: DataTypes.DATE,
  location: DataTypes.STRING(100)
});

var initCouncil = function initCouncil() {
  return regeneratorRuntime.async(function initCouncil$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Council.sync({
            alert: true
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  Council: Council,
  initCouncil: initCouncil
};