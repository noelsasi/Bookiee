'use strict';

const expect = require('chai').expect;

const config = require('../../../config/config');

describe('config', () => {
  it('should load', () => {
    expect(process.env.NODE_ENV).to.eql('test');

    expect(config).to.eql({
      root: config.root,
      app: {
        name: 'webdoctor'
      },
      port: process.env.PORT || 3000,
      db: 'sqlite://localhost/webdoctor-test',
      storage: config.storage
    });
  });
});
