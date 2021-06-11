(function() {
    'use strict';
    angular.module('app.routes').controller('helperIntroCtrl', helperIntroCtrl);
    helperIntroCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$ionicHistory', '$timeout'];

    function helperIntroCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $ionicHistory, $timeout) {
        var vm = angular.extend(this, {
            goTo: goTo
        });


        init();
        function init() {
          $rootScope.forms.helperTakaful = {};
        }
        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });

        function enter() {
            if(!$rootScope.helperTakaful) {
                $rootScope.helperTakaful = {}
            }    
        }
        
        function goTo(state) {
            $state.go(state)
        }
    }
})();