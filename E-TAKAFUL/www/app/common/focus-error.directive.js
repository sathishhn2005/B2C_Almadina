(function() {
    'use strict';
    angular.module('app.routes').directive('focusError', focusError);
    focusError.$inject = ['ApiServices', '$timeout', 'commonService', '$state', '$ionicScrollDelegate', '$rootScope'];

    function focusError(ApiServices, $timeout, commonService, $state, $ionicScrollDelegate, $rootScope) {
        var search = {
            restrict: 'A',
            link: linkFunction
            
        };
        function linkFunction(scope, element, attrs) {
           element.on('submit', function () {

                // find the first invalid element
                var firstInvalid = element[0].querySelector('.ng-invalid');

                // if we find one, set focus
                console.log(firstInvalid)
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }

        return search;   
    }
})();