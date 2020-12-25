/* import loaders and express */
const loaders = require('./loaders/index');
const express = require('express');

/* export script to initialise app */
module.exports = async function startServer() {

  /* create express object and initialise loaders */
  const app = express();
  await loaders(app);

  /* Error Handler */
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });

  return app;
}
