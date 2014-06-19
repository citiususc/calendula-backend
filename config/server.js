var fs = require('fs');

// auth settings
module.exports = {

  https : false,

  httpsOptions : {
     key: fs.readFileSync('./resources/https/key.pem'),
     cert: fs.readFileSync('./resources/https/key-cert.pem')
  }

};
