var fs = require('fs');

// auth settings
module.exports = {

  port: 8181,

  https : false,

  httpsOptions : {
     key: fs.readFileSync('./resources/https/key.pem'),
     cert: fs.readFileSync('./resources/https/key-cert.pem')
  }

};
