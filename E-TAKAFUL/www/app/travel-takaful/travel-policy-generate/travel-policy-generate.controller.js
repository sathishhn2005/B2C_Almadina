(function() {
    'use strict';
    angular.module('app.routes').controller('travelPolicyGenerateCtrl', travelPolicyGenerateCtrl);
    travelPolicyGenerateCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', 'commonService'];

    function travelPolicyGenerateCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, commonService) {
        var vm = angular.extend(this, {
            goTo: goTo,
            goBack: goBack,
            downloadPDF: downloadPDF
        });
        
        function init() {
 
        }



           


        function goTo(state) {
            $state.go(state);
        }
        function goBack() {
            window.history.back();
        }
        function downloadPDF(url) {
            commonService.getPdf(url);
        }


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });
        

    }
})();