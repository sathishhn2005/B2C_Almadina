(function() {
    'use strict';
    angular.module('app.routes').controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$state', '$scope', 'commonService', 'ApiServices', '$timeout', '$translate'];

    function registerCtrl($state, $scope, commonService, ApiServices, $timeout, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            createUser: createUser,
            register: '',
            formError: '',
            formResponse: '',
            preloader: false,
            actionDisabled: false
        });

        vm.register = {
            "formName": '',
            "full_name": '',
            "password": '',
            "civilid": '',
            "email": ''
        };
        $scope.$on('$ionicView.enter', function(scopes, states){
            vm.register.full_name =  '';
            vm.register.password =  '';
            vm.register.civilid =  '';
            vm.register.email =  '';
        });


        function createUser(event) {
            event.preventDefault();
            console.log(vm.register);
            if(vm.register.formName.$valid) {
                vm.formError = '';
                vm.formResponse = '';
                vm.preloader = true;
                vm.actionDisabled = true;
               ApiServices.registerUser(vm.register.full_name, vm.register.password, vm.register.civilid, vm.register.email, vm.register.phone)
               .then(function(response){
                    if(response.data.Status == "Success") {
                        vm.formResponse = response.data.message;
                        $timeout(function() {
                            $state.go('login');
                        },2000);
                    } else {
                        vm.formError = response.data.message;
                    }
                    vm.preloader = false;
                    vm.actionDisabled = false;
               }).catch(function(error){
                    console.log(error);
                    vm.preloader = false;
                    vm.actionDisabled = false;
               });
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