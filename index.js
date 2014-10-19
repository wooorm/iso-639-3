'use strict';

/**
 * Dependencies.
 */

var Interface;

Interface = require('datamap-interface');

/**
 * Data.
 */

var data;

data = require('./data/iso-639-3.json');

/**
 * Expose iso-639-3.
 */

module.exports = new Interface(data);
