(function() {
    'use strict';
    angular.module('app.routes').controller('profileCtrl', profileCtrl);
    profileCtrl.$inject = ['$state', '$scope', 'commonService', 'ApiServices', '$timeout', '$rootScope', '$ionicPopup', '$translate'];

    function profileCtrl($state, $scope, commonService, ApiServices, $timeout, $rootScope, $ionicPopup, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            preloader: false,
            actionDisabled: false,
            user: {},
            editField: editField,
            formError: "",
            formResponse: "",
            update: {},
            selected: 'name'
        });



        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });

        init();
        function init() {
            if($rootScope.user) {
                vm.user.civilid = $rootScope.user.civilid;
                vm.user.name = $rootScope.user.display_name;
                vm.user.email = $rootScope.user.user_email;
                vm.user.mobile = parseInt($rootScope.user.user_mobile);
            } else {
                vm.user = [];
                vm.user.civilid = window.localStorage.getItem('civilid');
                vm.user.name = window.localStorage.getItem('displayName');
                vm.user.email = window.localStorage.getItem('email');
                vm.user.mobile = parseInt(window.localStorage.getItem('mobile'));
                
            }

            vm.update = {
                "form": "",
                "name": {
                    "text": "Name",
                    "type": "text",
                    "value": vm.user.name,
                    "min": "",
                    "max": "",
                    "pattern": "[^0-9]+",
                    "restrict": ""
                },
                "email": {
                    "text": "Email",
                    "type": "email",
                    "value": vm.user.email,
                    "min": "",
                    "max": "",
                    "pattern": "",
                    "restrict": ""
                },
                "mobile": {
                    "text": "Mobile",
                    "type": "number",
                    "value": vm.user.mobile,
                    "min": "8",
                    "max": "8",
                    "pattern": "",
                    "restrict": ""
                },
            };


        }

        function editField(name) {
            resetMessages();
            if (name == 'civilid') {
                setMessage($translate.instant("Contact Al Madina"), true);
                return;
            }
            vm.selected = name;

            console.log(vm.update);

            if(vm.selected == 'name') {
                var NamePopup = $ionicPopup.show({
                  template: '<input type="text" ng-model="vm.update[vm.selected].value">',
                  title: $translate.instant('Enter new Name'),
                  scope: $scope,
                  buttons: [{
                      text: $translate.instant('Cancel'),
                      onTap: function (e) {
                        return;
                      }
                    },
                    {
                      text: '<b>' + $translate.instant('Update')  + '</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                        if (vm.update[vm.selected].value && commonService.validateName(vm.update[vm.selected].value)) {
                              getPassword();
                        } else {
                          e.preventDefault();
                        }
                      }
                    }
                  ]
                });
            }

            if (vm.selected == 'email') {
                var EmailPopup = $ionicPopup.show({
                  template: '<input type="email" ng-model="vm.update[vm.selected].value">',
                  title: $translate.instant('Enter new Email'),
                  scope: $scope,
                  buttons: [{
                      text: $translate.instant('Cancel'),
                      onTap: function (e) {
                        return;
                      }
                    },
                    {
                      text: '<b>' + $translate.instant('Update') + '</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                        if (vm.update[vm.selected].value && commonService.validateEmail(vm.update[vm.selected].value)) {
                              getPassword();
                        } else {
                          e.preventDefault();
                        }
                      }
                    }
                  ]
                });
            }

            if (vm.selected == 'mobile') {
                var PhonePopup = $ionicPopup.show({
                  template: '<input type="number" pattern="\d*" ng-model="vm.update[vm.selected].value" maxlength="8" minlength="8" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">',
                  title: $translate.instant('Enter new Phone Number'),
                  scope: $scope,
                  buttons: [{
                      text: $translate.instant('Cancel'),
                      onTap: function (e) {
                        return;
                      }
                    },
                    {
                      text: '<b>' + $translate.instant('Update') + '</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                        if (vm.update[vm.selected].value) {
                          getPassword();
                        } else {
                          e.preventDefault();
                        }
                      }
                    }
                  ]
                });
            }


            // var myPopup = $ionicPopup.show({
            //     template: '<form name="testform"><input type="{{vm.update[vm.selected].type}}" ng-model="vm.update[vm.selected].value" minlength="{{vm.update[vm.selected].min}}" maxlength="{{vm.update[vm.selected].max}}"  pattern="{{vm.update[vm.selected].pattern}}"></form>',
            //     title: 'Enter new ' + vm.update[vm.selected]["text"],
            //     //   subTitle: 'Please use normal things',
            //     scope: $scope,
            //     buttons: [{
            //         text: 'Cancel',
            //         onTap: function (e) {
            //           return;
            //         }
            //     },
            //     {
            //         text: '<b>Update</b>',
            //         type: 'button-positive',
            //         onTap: function (e) {
            //             console.log(vm.update, vm.selected, vm.update[vm.selected].value, $scope.testform.$valid);
            //             if (vm.update[vm.selected].value) {
            //                 if(vm.selected == 'email') {
            //                     if (commonService.validateEmail()) {
            //                         return;
            //                     }
            //                 }
            //                 if(vm.selected == 'phone') {
            //                     if (commonService.validatePhone()) {
            //                         return;
            //                     }
            //                 }
            //                 if(vm.selected == 'name') {
            //                     if (commonService.validateName()) {
            //                         return;
            //                     }
            //                 }
            //                 getPassword();
            //             } else {
            //                 e.preventDefault();
            //             }
            //         }
            //     }]
            // });
        }

        vm.update.name.functionName = function () {
            
            var details = {
                "jsonval": {
                    "UserId": "MobileApp",
                    "Name": vm.update[vm.selected].value,
                    "Civilid": vm.user.civilid,
                    "Username": vm.user.email,
                    "Password": vm.user.password
                }
            };
            processing();
            ApiServices.changeName(details).then(function (response) {
                console.log(response);
                if (response.data.Output.status == "True") {
                    setMessage(response.data.Output.message, false);
                    window.localStorage.setItem('displayName', vm.update[vm.selected].value);
                    vm.user.name = vm.update[vm.selected].value;
                    // vm.update[vm.selected].value = 
                    if ($rootScope.user) {
                      $rootScope.user.display_name = vm.update[vm.selected].value;
                    }
                } else {
                    setMessage(response.data.Output.message, true);
                }
                processingFinished();
            }).catch(function(error) {
                processingFinished();
            });

        };

        vm.update.email.functionName = function() {
          
            var details = {
                "jsonval": {
                    "UserId": "MobileApp",
                    "Email": vm.update[vm.selected].value,
                    "Civilid": vm.user.civilid,
                    "Username": vm.user.email,
                    "Password": vm.user.password
                }
            };
            processing();
            ApiServices.changeEmail(details).then(function (response) {
                console.log(response);
                if (response.data.Output.status == "True") {
                    setMessage(response.data.Output.message, false);
                    var emailAlert = $ionicPopup.alert({
                        title: "Success",
                        template: response.data.Output.message
                    });
                    emailAlert.then(function (res) {
                        commonService.logout();
                    });
                } else {
                    setMessage(response.data.Output.message, true);
                }
                processingFinished();
              
            }).catch(function (error) {
                processingFinished();
            });
        };
        vm.update.mobile.functionName = function () {
            var details = {
                "jsonval": {
                    "UserId": "MobileApp",
                    "Mobile": vm.update[vm.selected].value,
                    "Civilid": vm.user.civilid,
                    "Username": vm.user.email,
                    "Password": vm.user.password
                }
            };
            processing();
            ApiServices.changeMobile(details).then(function (response) {
                console.log(response);
                if (response.data.Output.status == "True") {
                    setMessage(response.data.Output.message, false);
                    window.localStorage.setItem('mobile', vm.update[vm.selected].value);
                    vm.user.mobile = vm.update[vm.selected].value;
                    if ($rootScope.user) {
                        $rootScope.user.user_mobile = vm.update[vm.selected].value;
                    }
                } else {
                    setMessage(response.data.Output.message, true);
                }
                processingFinished();
            }).catch(function (error) {
                processingFinished();
            });
        };

        function getPassword() {
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="vm.user.password">',
                title: $translate.instant('Enter Password'),
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
                        if (vm.user.password) {
                            vm.update[vm.selected]['functionName']();
                        } else {
                            e.preventDefault();
                        }
                    }
                }]
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



        function enter() {

        }
        
        
        
        
        function goTo(state) {
            $state.go(state);
        }
    }
})();