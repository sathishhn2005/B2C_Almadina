(function() {
    'use strict';
    angular.module('app.routes').controller('motorIntroCtrl', motorIntroCtrl);
    motorIntroCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', 'commonService'];

    function motorIntroCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, commonService) {
        var vm = angular.extend(this, {
            goTo: goTo,
            actionDisabled: true,
            preloader: true
        });



        init();

        function init() {
          $rootScope.forms.motorTakaful = {};
        }


        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });

        function enter() {
            if(!$rootScope.motorTakaful) {
                $rootScope.motorTakaful = {}
                $rootScope.motorTakaful.AddDriver = 0;
            }    
            vm.preloader = true;
            ApiServices.getMotorFields()
            .then(function(response) {
                    console.log(response);
                    
                    if(response.data.Output.status == "True"){
                        $rootScope.motorTakaful.fieldData = response.data.Output;
                        // console.log(Object.keys($rootScope.motorTakaful.fieldData.vehiclelist).length);
                        $rootScope.vehicleList = [];
                        for (var k in $rootScope.motorTakaful.fieldData.vehiclelist) {
                            if ($rootScope.motorTakaful.fieldData.vehiclelist.hasOwnProperty(k)) {
                                // console.log(k);
                                // console.log($rootScope.motorTakaful.fieldData.vehiclelist[k]);
                                $rootScope.vehicleList.push({'name' : $rootScope.motorTakaful.fieldData.vehiclelist[k], 'value': k});
                            }
                        }

                        console.log($rootScope.vehicleList);
                        console.log($rootScope.motorTakaful.fieldData);


                        // for (var i = 0; i < Object.keys($rootScope.motorTakaful.fieldData.vehiclelist).length; i++) {
                            
                            // console.log($rootScope.motorTakaful.fieldData.vehiclelist[i]);
                        // }
                        vm.actionDisabled = false;
                    } else {
                        console.log('Something Went Wrong');
                        // commonService.authenticateUser($rootScope.user);
                        commonService.logout();
                    }
                    vm.preloader = false;
            })
            .catch(function(error) {
                console.log('Error at helper calculate premium');
                vm.preloader = false;
                commonService.logout();
            });
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();