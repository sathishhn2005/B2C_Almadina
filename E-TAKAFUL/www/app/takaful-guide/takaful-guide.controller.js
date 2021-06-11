(function() {
    'use strict';
    angular.module('app.routes').controller('takafulGuideCtrl', takafulGuideCtrl);
    takafulGuideCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope'];

    function takafulGuideCtrl($state, $rootScope, commonService, $scope) {
        var vm = angular.extend(this, {
            goTo: goTo
        });

        function goTo(state) {
            $state.go(state);
        }
    }
})();