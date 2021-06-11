(function() {
    'use strict';
    angular.module('app.routes').controller('motorSummaryCtrl', motorSummaryCtrl);
    motorSummaryCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService'];

    function motorSummaryCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService) {
        var vm = angular.extend(this, {
            goTo: goTo,
            motorResponse: '',
            goBack: goBack,
            selectPremium: selectPremium
        });

    
        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });



        console.log($rootScope.motorTakaful);

        
        function init() {

            if($rootScope.motorTakaful && $rootScope.motorTakaful.calculateData) {
                console.log($rootScope.motorTakaful.calculateData, 'response');
                vm.motorResponse = $rootScope.motorTakaful.calculateData;
            }
            console.log('vm.motorResponse', vm.motorResponse);

        }

        function goTo(state) {
            $state.go(state);
        }

        function selectPremium(premium) {
            if(premium == 'Comprehensive'){
                $rootScope.motorTakaful.ProdCode = '2501';
                $rootScope.motorTakaful.selectedPremium = $rootScope.motorTakaful.calculateData.Data.Premium.Comprehensive;
            }
            if(premium == 'Compulsary') {
                $rootScope.motorTakaful.ProdCode = '2510';
                $rootScope.motorTakaful.selectedPremium = $rootScope.motorTakaful.calculateData.Data.Premium.Compulsary;

            }
            $state.go('motor-save');
        }

        function goBack() {
            window.history.back();
        }
    }
})();