(function() {
    'use strict';
    angular.module('app.routes').controller('motorClaimsCtrl', motorClaimsCtrl);
    motorClaimsCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope', 'ApiServices'];

    function motorClaimsCtrl($state, $rootScope, commonService, $scope, ApiServices) {
        var vm = angular.extend(this, {
            goTo: goTo
        });

        
        

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        function init() {
            
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();