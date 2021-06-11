(function() {
    'use strict';
    angular.module('app.routes').controller('productsCtrl', productsCtrl);
    productsCtrl.$inject = ['$state', '$rootScope', 'commonService', '$scope', 'ApiServices'];

    function productsCtrl($state, $rootScope, commonService, $scope, ApiServices) {
        var vm = angular.extend(this, {
            goTo: goTo
        });

        
        

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        function init() {
            ApiServices.getBrochures().then(function(response){
                if (response.data && response.data.Output) {
                    $rootScope.brochures = response.data.Output;
                    console.log($rootScope.brochures);
                }
            }).catch(function(error) {

            });

            $rootScope.motorTakaful = {};
            $rootScope.travelTakaful = {};
            $rootScope.helperTakaful = {};
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();