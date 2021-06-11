(function() {
    'use strict';
    angular.module('app.routes').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$scope', '$ionicPopup', '$translate'];

    function loginCtrl($state, $rootScope, ApiServices, $scope, $ionicPopup, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            formError: '',
            formResponse: '',
            login: {},
            loginUser: loginUser,
            preloader: false,
            actionDisabled: false,
            forgotPassword: forgotPassword
        });


        
        init();
        function init() {
            $rootScope.user = {};
            console.log($rootScope)
        }

        vm.login = {
            "formName": '',
            "email": '',
            "password": '',
            // "civilid": '',
            "remember": ''
        };
        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();    
        });

        
        function enter() {
            vm.login.email = '';
            vm.login.password = '';
            // vm.login.civilid = '';
            vm.login.remember = '';

            if (window.localStorage.getItem('email')) {
                vm.login.email = window.localStorage.getItem('email');
            }
            if (window.localStorage.getItem('password')) {
                vm.login.password = window.localStorage.getItem('password');
            }
            // if (window.localStorage.getItem('civilid')) {
            //     vm.login.civilid = parseInt(window.localStorage.getItem('civilid'));
            // }
        }


        function loginUser(event) {
            event.preventDefault();


            if(vm.login.formName.$valid) {
                // console.log(vm.login.email, vm.login.password, vm.login.civilid);

                processing();
                ApiServices.loginUser(vm.login.email, vm.login.password)
                .then(function(response){
                    if(response.data && response.data.Status == "Success") {
                        console.log(response.data);
                        window.localStorage.setItem('civilid', response.data.message.civilid);
                        window.localStorage.setItem('displayName', response.data.message.display_name);
                        window.localStorage.setItem('email', response.data.message.user_email);
                        window.localStorage.setItem('mobile', response.data.message.user_mobile);
                        if(vm.login.remember) {
                            window.localStorage.setItem('password', vm.login.password);
                        }
                        $rootScope.user.guest = false;
                        $rootScope.user.user_email = response.data.message.user_email;
                        $rootScope.user.user_mobile = response.data.message.user_mobile;
                        $rootScope.user.display_name = response.data.message.display_name;
                        $rootScope.user.civilid = response.data.message.civilid;
                        $state.go('menu');
                    } else {
                        vm.formError = response.data.message;
                    }
                    processingFinished();
                }).catch(function(error){
                    console.log(error);
                    processingFinished();
                });
            } else {
                vm.formResponse = '';
                vm.formError = $translate.instant('All fields are required');
            }
        }

        function forgotPassword() {
            resetMessages();
            vm.login.resetPasswordEmail = '';
            var myPopup = $ionicPopup.show({
                template: '<form name="vm.login.passwordForm"><input type="email" ng-model="vm.login.resetPasswordEmail"></form>',
                title: $translate.instant('Enter Email'),
                scope: $scope,
                buttons: [{
                    text: $translate.instant('Cancel'),
                  onTap: function (e) {
                      return;
                  }
                },
                {
                    text: '<b>' + $translate.instant('Okay') + '</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (vm.login.resetPasswordEmail && vm.login.passwordForm.$valid) {
                            callPasswordReset();
                        } else {
                            e.preventDefault();
                        }


                        // if (vm.login.resetPasswordEmail) {
                        //     callPasswordReset();
                        // } else {
                        //     e.preventDefault();
                        // }
                    }
                }]
            });

        }

        function callPasswordReset() {
            processing();
            var details = {
                "jsonval": {
                    "UserId": "MobileApp",
                    "user_email": vm.login.resetPasswordEmail
                }
            }
            ApiServices.forgotPassword(details).then(function (response) {
                console.log(response);
                if (response.data.Output && response.data.Output.status == "True") {
                    setMessage(response.data.Output.message, false);
                } else {
                    setMessage(response.data.Output.message, true);
                }
                processingFinished();
            }).catch(function(error) {
                processingFinished();
            });
        }



        function setMessage(msg, error) {
            if(!error) {
                vm.formResponse = msg;
            } else {
                vm.formError = msg;
            }
        }

        function processing() {
            resetMessages();
            vm.preloader = true;
            vm.actionDisabled = true;
        }

        function resetMessages() {
            vm.formError = '';
            vm.formResponse = '';
        }

        function processingFinished() {
            vm.preloader = false;
            vm.actionDisabled = false;
        }

        function goTo(state) {
            $state.go(state);
        }
    }
})();