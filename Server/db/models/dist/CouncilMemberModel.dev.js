"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require("../config/dbconfig"),
    POSTGRESQL_DEVELOPMENT_HOST = _require2.POSTGRESQL_DEVELOPMENT_HOST;

var _require3 = require("./CouncilModel"),
    Council = _require3.Council;

var _require4 = require("./LecturerModel"),
    Lecturer = _require4.Lecturer;

var _require5 = require("./RoleModel"),
    Role = _require5.Role;

var sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
var CouncilMember = sequelize.define("council_member", {
  councilId: {
    type: DataTypes.UUID,
    references: {
      model: Council,
      key: 'councilId'
    },
    primaryKey: true
  },
  lecturerId: {
    type: DataTypes.UUID,
    references: {
      model: Lecturer,
      key: 'lecturerId'
    },
    primaryKey: true
  },
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: Role,
      key: "roleId"
    }
  },
  workUnit: {
    type: DataTypes.STRING(50)
  }
});
Council.belongsToMany(Lecturer, {
  through: CouncilMember,
  foreignKey: 'councilId'
});
Lecturer.belongsToMany(Council, {
  through: CouncilMember,
  foreignKey: 'lecturerId'
});
Role.hasOne(CouncilMember, {
  foreignKey: "roleId"
});

var initCouncilMember = function initCouncilMember() {
  return regeneratorRuntime.async(function initCouncilMember$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", CouncilMember.sync({
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
  CouncilMember: CouncilMember,
  initCouncilMember: initCouncilMember
};