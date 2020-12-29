/* import loaders */
var expressLoader = require('./express.js');
var SequelizeBot = require('./../models/db');

/* export loader function that intializes seperate loaders */
module.exports = async function loaders(app) {

  /* Initialise loaders */
  await expressLoader(app);
  console.log('Express intialized');
  await SequelizeBot.init();
  console.log('Sequelize Connection has been established successfully.');

}
