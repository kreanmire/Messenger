'use strict';

class DevelopController {

  ping(req, res){

    return {pong: process.uptime()};
  }

  version(req, res){

    return require('../../version');
  }

}

module.exports = new DevelopController();
