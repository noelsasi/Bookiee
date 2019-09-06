const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'bookie'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres:noel1997@localhost/bookie-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bookie'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/bookie-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bookie'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/bookie-production'
  }
};

module.exports = config[env];
