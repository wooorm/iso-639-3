'use strict';

var Interface,
    data;

Interface = require('datamap-interface');
data = require('./data/iso-639-3.json');

module.exports = new Interface(data);
