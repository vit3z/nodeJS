const express = require('express');
const config = require('./config/config.js');

// environment variables
process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'staging';

// config variables

// module variables
const app = express();

app.get('/', (req, res) => {
    res.json(global.gConfig);
});

console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
console.log('+++++++++++++++++++++++++++++++++++++++++++++');

/* app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
}); */