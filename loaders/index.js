/* import express loader which contains setup for express */
var expressLoader = require('./express.js');

/* export loader function that intializes seperate loaders */
module.exports = async function loaders(app){

  /* Initialise express loader */
  await expressLoader(app);
  console.log('Express Initialized');
}
