'use strict';

/**
 * Module dependencies
 */


module.exports = function(app) {

  var customersPolicy = require('../policies/customers.server.policy'),
  customers = require('../controllers/customers.server.controller');
  // Customers Routes
  app.route('/api/customers').all(customersPolicy.isAllowed)
    .get(customers.list)
    .post(customers.create);

  app.route('/api/customers/:customerId').all(customersPolicy.isAllowed)
    .get(customers.read)
    .put(customers.update)
    .delete(customers.delete);

  // Finish by binding the Customer middleware
  app.param('customerId', customers.customerByID);
};