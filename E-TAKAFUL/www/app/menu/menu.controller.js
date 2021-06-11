(function() {
    'use strict';
    angular.module('app.routes').controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope', '$ionicHistory', '$translate', 'ApiServices'];

    function menuCtrl($state, $rootScope, commonService, $scope, $ionicHistory, $translate, ApiServices) {
        var vm = angular.extend(this, {
            goTo: goTo
        });
    
        init();

        function init() {
            
        }

        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });
        function enter() {
            commonService.authenticateUser($rootScope.user);
            $translate.refresh();

            // if(!$rootScope.translateVersion) { // Set Translate File
            //     $rootScope.translateVersion = response.data.lang;
            // } else {
            //     if(commonService.cmpVersions ($rootScope.translateVersion, response.data.lang) != 0) { // Refresh Translate File
            //         $translate.refresh();
            //         $rootScope.translateVersion = response.data.lang;
            //     }
            // }

            ApiServices.getMotorFields()
            .then(function(response) {
                if(response.data.Output.status == "True"){
                    $rootScope.motorFields = response.data.Output;
                } else {
                    console.log('Something Went Wrong');
                }
            });


        }
        function goTo(state) {
            // $state.go(state, {reload: true});
            $ionicHistory.clearCache().then(function () {
              $state.go(state);
            });
        }
    }
})();