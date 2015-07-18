'use strict';

let koa    = require('koa');
let fs     = require('fs');
let serve  = require('koa-static');
let router = require('koa-route');
let argv   = require('minimist')(process.argv.slice(2));

let app = koa();
let port = argv.p || 3000;

function* fetch () {
  let path = './www/data.json';
  this.body = fs.createReadStream(path);
}

// serve static
app.use(serve(__dirname + '/www/'));

// routes
app.use(router.get('/fetch', fetch));

// Hey! Listen.
app.listen(port);
console.log('Started server on port ' + port);