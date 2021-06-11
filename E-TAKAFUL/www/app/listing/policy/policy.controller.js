(function() {
    'use strict';
    angular.module('app.routes').controller('policyCtrl', policyCtrl);
    policyCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate'];

    function policyCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        function init() {
            if(!$rootScope.motorTakaful) {
                $rootScope.motorTakaful = {}
                $rootScope.motorTakaful.AddDriver = 0;
            }    
            ApiServices.getMotorFields()
            .then(function(response) {
                    console.log(response);
                    
                    if(response.data.Output.status == "True"){
                        $rootScope.motorTakaful.fieldData = response.data.Output;
                    } else {
                        console.log('Something Went Wrong');
                    }
            })
            .catch(function(error) {
                console.log('Error at helper calculate premium');
            });

        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();