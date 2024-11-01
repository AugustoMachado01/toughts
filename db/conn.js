const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "augustomachado01", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();

  console.log("conectou ao banco de dados");
} catch (error) {
  console.log(`Nao foi possivel conectar ${error}`);
}

module.exports = sequelize;
