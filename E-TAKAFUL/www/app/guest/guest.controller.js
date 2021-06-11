(function() {
    'use strict';
    angular.module('app.routes').controller('guestCtrl', guestCtrl);
    guestCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$scope', '$translate'];

    function guestCtrl($state, $rootScope, ApiServices, $scope, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            formError: '',
            formResponse: '',
            guest: {},
            guestUser: guestUser,
            preloader: false,
            actionDisabled: false
        });

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();    
        });

        
        function init() {

        }


        function guestUser(event) {
            event.preventDefault();


            if(vm.guest.guestForm.$valid) {
                console.log(vm.guest);  
                $rootScope.user.guest = true;
                $rootScope.user.user_email = vm.guest.email;
                $rootScope.user.user_mobile = vm.guest.phone;
                $rootScope.user.display_name = vm.guest.full_name;
                $rootScope.user.civilid = '';

                window.localStorage.removeItem('civilid');
                window.localStorage.setItem('displayName', vm.guest.full_name);
                window.localStorage.setItem('email', vm.guest.email);
                window.localStorage.setItem('mobile', vm.guest.phone);


                $state.go('menu');
            } else {
                vm.formResponse = '';
                vm.formError = $translate.instant('All fields are required');
            }
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();