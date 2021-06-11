(function() {
    'use strict';
    angular.module('app.routes').controller('travelSummaryCtrl', travelSummaryCtrl);
    travelSummaryCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService'];

    function travelSummaryCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService) {
        var vm = angular.extend(this, {
            goTo: goTo,
            travelResponse: '',
            goBack: goBack,
            selectPremium: selectPremium,
            downloadPDF: downloadPDF
        });

    
        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });



        console.log($rootScope.travelTakaful);

        
        function init() {

            if($rootScope.travelTakaful && $rootScope.travelTakaful.calculateData) {
                console.log($rootScope.travelTakaful.calculateData, 'response');
                vm.travelResponse = $rootScope.travelTakaful.calculateData.Output;
            }

            console.log('vm.travelResponse', vm.travelResponse);

        }

        function goTo(state) {
            $state.go(state);
        }

        function selectPremium(premium) {
            if(premium == 'regular'){
                $rootScope.travelTakaful.Plan = '02';
                $rootScope.travelTakaful.selectedPremium = $rootScope.travelTakaful.calculateData.Output.Data.Premium.regularPrem;
            }
            if(premium == 'premium') {
                $rootScope.travelTakaful.Plan = '01';
                $rootScope.travelTakaful.selectedPremium = $rootScope.travelTakaful.calculateData.Output.Data.Premium.prestigePrem;

            }
            $state.go('travel-save');
        }
        function downloadPDF(url) {
            commonService.getPdf(url);
        }

        function goBack() {
            window.history.back();
        }
    }
})();