(function () {
  'use strict';

  // Customers controller
  var app=angular.module('customers');

  app.controller('CustomersController', CustomersController);

  CustomersController.$inject = ['$scope', '$state', '$location','$window', 'Authentication','$modal','$log','CustomersService','Notify'];

  function CustomersController ($scope, $state,$location, $window, Authentication,$modal,$log,CustomersService,Notify) {
    var customerCtrl=this;
    customerCtrl.name='haseeb';
    customerCtrl.customers=CustomersService.query();
    customerCtrl.modalCreate = function (size) {
    var modalInstance = $modal.open({

            templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
            controller: function($scope, $modalInstance) {

            $scope.ok = function ()
            {
            $modalInstance.close();
            };

            $scope.cancel = function (){
            $modalInstance.dismiss({$value: 'cancel'});
             };
                    },
      size: size,
    });
    modalInstance.result.then(function (selectedItem) {
    },function(){
      $log.info('modal dismissed at:'+ new Date());
    });
  };

    $scope.modalUpdate = function (size, customer) {
    var modalInstance = $modal.open({
      templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
      controller: function($scope, $modalInstance, customer) {
                    $scope.customer = customer;
                    $scope.ok = function () {
                    $modalInstance.close($scope.customer);
                   };

      $scope.cancel = function () {
      $modalInstance.dismiss({$value: 'cancel'});
    };
                  },
      size: size,
      resolve: {
      customer: function() {
                      return customer;
                  }
      }
    });
  };

    customerCtrl.authentication = Authentication;
    //customerCtrl.customer = customer;
    customerCtrl.error = null;
    customerCtrl.form = {};
  //  $scope.remove = remove;
    customerCtrl.save = save;
    //customerCtrl.create=create;

    // Remove existing Customer
  //   function remove() {
  //     if ($window.confirm('Are you sure you want to delete?')) {
  //       if (customer) {
  //           customer.$remove();
  //
  //           for (var i in this.customers) {
  //               if (this.customers[i] === customer) {
  //                   this.customers.splice(i, 1);
  //               }
  //           }
  //       } else {
  //           this.customer.$remove(function() {});
  //       }
  //
  //   }
  // }
  $scope.find=function(){
    $scope.customers=CustomersService.query();
  };


      customerCtrl.create=function() {
          // Create new Customer object
          var customer = new CustomersService({
              firstName: this.firstName,
              lastName: this.lastName,
              city: this.city,
              country: this.country,
              industry: this.industry,
              email: this.email,
              phone: this.phone,
              referred: this.referred,
              channel: this.channel
          });

          customer.$save(function(response) {

            Notify.sendMsg('NewCustomer', {
                    'id': response._id
                });


      // // Clear form fields
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.city = '';
      $scope.country = '';
      $scope.industry = '';
      $scope.email = '';
      $scope.phone = '';
      $scope.referred = '';
      $scope.channel = '';
  }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
  });
};
                $scope.remove = function(customer) {
                    if (customer) {
                        customer.$remove();

                        for (var i in this.customers) {
                            if (this.customers[i] === customer) {
                                this.customers.splice(i, 1);
                            }
                        }
                    } else {
                        this.customer.$remove(function() {});
                    }
                };
            $scope.update=function(UpdatedCustomer)
            {
              $scope.channelOptions = [
            {id: 1 , item: 'Facebook'},
            {id: 2 , item: 'Twitter'},
            {id: 3 , item: 'Email'},
            ];
              var customer=UpdatedCustomer;
              customer.$update(function() {
              },function(errorMessage){
                $scope.error=errorMessage.data.message;
              });
            };

    // Save Customer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'customerCtrl.form.customerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (customerCtrl.customer._id) {
        customerCtrl.customer.$update(successCallback, errorCallback);
      } else {
        customerCtrl.customer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('viewCustomer', {
          customerId: res._id
        });
      }

      function errorCallback(res) {
        customerCtrl.error = res.data.message;
      }
    }

}

app.directive('customerList', ['CustomersService', 'Notify', function(CustomersService, Notify) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/customers/client/views/customer-list-template.html',
        link: function(scope, element, attrs) {
            //when a new customer is added, update the customer list
               Notify.getMsg('NewCustomer', function(event, data) {
                scope.customerCtrl.customers = CustomersService.query();
                console.log('data'+data);
                 Notify.msg1();
            });
            Notify.msg2();

        }
    };
}]);

} ());
