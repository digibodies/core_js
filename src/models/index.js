const model = require('./model');
const properties = require('./properties');
module.exports = {
  model: model,
  ...properties
};
