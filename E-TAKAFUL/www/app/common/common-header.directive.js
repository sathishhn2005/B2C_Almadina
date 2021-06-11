(function() {
    'use strict';
    angular.module('app.routes').directive('commonHeader', commonHeader);
    commonHeader.$inject = ['ApiServices', '$timeout', 'commonService', '$state', '$ionicScrollDelegate', '$rootScope'];

    function commonHeader(ApiServices, $timeout, commonService, $state, $ionicScrollDelegate, $rootScope) {
        var search = {
            restrict: 'E',
            templateUrl: 'app/common/common-header.html',
            link: linkFunction,
            scope: { //@ is string, & is function, = is object 
                showOptions: '@',
                showBack: '@',
                services: '=',
                logoLink: '@',
                showSteps: '@',
                start: '@',
                end: '@',
                premium: '@',
                language: '@'
            }
            
        };
        function linkFunction(scope, element, attrs) {
            console.log(scope.$parent.rtl);
            console.log(scope);
            scope.goTo = function() {
                console.log('called');
                if (scope.logoLink) {
                    scope.services.goTo(scope.logoLink);
                }
            };
            scope.goBack = function () {
              console.log('called back');
              scope.services.goBack();
            }
        }

        return search;   
    }
})();