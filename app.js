/* Copyright (C) Abbas Khan - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abbas Khan <abbaskhanwork@gmail.com>, Jan 2021
 */

/* import loaders + express */
const loaders = require('./loaders/index');
const express = require('express');

/* export script to initialise app */
module.exports = async function startServer() {

  /* create express object and initialise loaders */
  const app = express();
  await loaders(app);

  /* Error Handler */
  app.listen(process.env.PORT || '5000', err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server ready on Port: `, process.env.PORT || '5000');
  });

  return app;
}
