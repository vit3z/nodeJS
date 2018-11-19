const _ = require('lodash');

const config = require('./default.json');
const environment = process.env.NODE_ENV || 'dev1';
const environmentConfig = config[environment];

let secretConfig = environmentConfig;

console.log("Configuration: ", secretConfig);

module.exports.secretConfig = secretConfig;