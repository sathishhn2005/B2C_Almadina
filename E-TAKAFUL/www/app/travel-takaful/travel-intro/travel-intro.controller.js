(function() {
    'use strict';
    angular.module('app.routes').controller('travelIntroCtrl', travelIntroCtrl);
    travelIntroCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate'];

    function travelIntroCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });

        init();
        function init() {
            $rootScope.forms.travelTakaful = {};
        }

        function enter() {
            if(!$rootScope.travelTakaful) {
                $rootScope.travelTakaful = {}
            }    
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();