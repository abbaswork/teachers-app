/* import loaders */
var expressLoader = require('./express.js');
var sequelizeLoader = require('./sequelize.js');

/* export loader function that intializes seperate loaders */
module.exports = async function loaders(app) {

  /* Initialise loaders */
  await expressLoader(app);
  await sequelizeLoader();

}
