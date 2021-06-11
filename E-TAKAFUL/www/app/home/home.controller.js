(function() {
    'use strict';
    angular.module('app.routes').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope'];

    function homeCtrl($state, $rootScope, commonService, $scope) {
        var vm = angular.extend(this, {
            goTo: goTo
        });

        function goTo(state) {
            $state.go(state);
            commonService.init();
        }
        $scope.$on('$ionicView.enter', function(scopes, states){
            $rootScope.user = {}
        });
    }
})();