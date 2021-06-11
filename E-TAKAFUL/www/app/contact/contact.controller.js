(function() {
    'use strict';
    angular.module('app.routes').controller('contactCtrl', contactCtrl);
    contactCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope'];

    function contactCtrl($state, $rootScope, commonService, $scope) {
        var vm = angular.extend(this, {
            goTo: goTo
        });

        function goTo(state) {
            $state.go(state);
        }
    }
})();