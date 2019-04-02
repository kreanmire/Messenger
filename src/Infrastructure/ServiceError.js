'use strict';

const codes = require('./../response_codes');

let DEFAULT_ERROR = codes.SERVER_ERROR;

class ServiceError extends Error {
  constructor(error, data){
    super();
    if (!error) {
      error = DEFAULT_ERROR;
    }

    this.name = this.constructor.name;
    this.code = error.code || error.CODE;
    this.data = data;
    this.message = error.message || error.MESSAGE;
  }
}

module.exports = {
  name: 'ServiceError',
  model: ServiceError
};
