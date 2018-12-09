(function () {
  'use strict';
  angular
    .module('customers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {
    $stateProvider
      .state('customers', {
       url: '/customers',
        abstract: true,
        templateUrl: 'modules/customers/client/views/list-customers.client.view.html',
        template: '<ui-view/>'
      })
      .state('customers.list', {
        url: '',
        templateUrl: 'modules/customers/client/views/list-customers.client.view.html',
      //  template: '<ui-view/>',
        data: {
        pageTitle: 'Customers List'
        }
      })
      .state('editCustomer', {
        url: '/:customerId/edit',
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
      //  controller: 'CustomersController',
      //  controllerAs: 'customerCtrl',
        template: '<ui-view/>',
        resolve: {
          customerResolve: getCustomer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Customer {{ customerResolve.name }}'
        }
      });
      // .state('viewCustomer', {
      //   url: '/customers/:customerId',
      //   templateUrl: 'modules/customers/client/views/view-customer.client.view.html',
      //   controller: 'CustomersController',
      //   controllerAs: 'customerCtrl',
      //   resolve: {
      //     customerResolve: getCustomer
      //   },
      //   data: {
      //     pageTitle: 'Customer {{ customerResolve.name }}'
      //   }
      // });
  }

  getCustomer.$inject = ['$stateParams', 'CustomersService'];
  function getCustomer($stateParams, CustomersService) {
    return CustomersService.get({
      customerId: $stateParams.customerId
    }).$promise;
  }
  newCustomer.$inject = ['CustomersService'];
  function newCustomer(CustomersService) {
    return new CustomersService();
  }
}());
