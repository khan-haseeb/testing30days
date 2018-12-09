'use strict';


angular.module('customers')
    //Customers service used to communicate Customers REST endpoints
      .factory('CustomersService', ['$resource',
       function($resource) {
       return $resource('api/customers/:customerId', {
                customerId: '@_id'
            }, {
                    update: {
                    method: 'PUT'
                }
            });
        }
    ])


    .factory('Notify', ['$rootScope', function($rootScope) {
        var notify = {};

        notify.sendMsg = function(msg, data) {
            data = data || {};
            $rootScope.$emit(msg, data);
            console.log('message sent!');
        };


        notify.msg1=function(){
        //  $rootScope.$emit();
          console.log('inside function');
        };

                notify.msg2=function(){
                //  $rootScope.$emit();
                  console.log('outside function');
                };


        notify.getMsg = function(msg, func, scope) {
            var unbind = $rootScope.$on(msg, func);

            if (scope) {
                scope.$on('destroy', unbind);
            }
        };

        return notify;
    }])
;
