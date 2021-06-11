(function() {
    'use strict';
    angular.module('app.routes').controller('claimCtrl', claimCtrl);
    claimCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout', 'commonService'];

    function claimCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout, commonService) {
        var vm = angular.extend(this, {
            goTo: goTo,
            intimateClaim: intimateClaim,
            formError: '',
            preloader: false,
            formResponse: '',
            actionDisabled: false,
            drivers: [],
            setDriver: setDriver,
            customDriver: false,
            changeDriverInfo: changeDriverInfo,
            getLicenseInfo: getLicenseInfo,
            goBack: goBack,
            driverAge: '',
            calculateAge: calculateAge,
            yesterday: '',
            verify: verify,
            maxLossDate: ''
        });


        $scope.$watch('claim.claimDriverDateofBirth', function () {
            vm.calculateAge();
        });

        function verify() {
            getLicenseInfo();
        }


        function calculateAge() {
            console.log('changed', $rootScope.claim.claimDriverDateofBirth);
            if ($rootScope.claim.claimDriverDateofBirth) {
                $rootScope.claim.claimDriverAge = commonService.getAge($rootScope.claim.claimDriverDateofBirth);
                console.log('calc age', $rootScope.claim.claimDriverAge);
                if ($rootScope.claim.DriverNamePre === "Other") {
                    if (parseInt($rootScope.claim.claimDriverAge) < 25) {
                        $rootScope.claim.excess = 100;
                    } else {
                        $rootScope.claim.excess = 75;
                    }
                } else {
                    if (parseInt($rootScope.claim.claimDriverAge) < 25) {
                        $rootScope.claim.excess = 75;
                    } else {
                        $rootScope.claim.excess = 50;
                    }
                }
            }
        }

        function getLicenseInfo() {
            if ($rootScope.claim.DrivingLicenseNumber) {
                var data = {
                    "jsonval": {
                        "UserId": "MobileApp",
                        "LicenseNumber": $rootScope.claim.DrivingLicenseNumber
                    }
                };
                vm.preloader = true;
                ApiServices.getLicenseInfo(data).then(function (response) {
                    console.log(response);
                    var responseOutput = response.data.Output;
                    if (responseOutput.status === "True") {
                        $rootScope.claim.claimDriverDateofBirth = responseOutput.Data.DateofBirth;
                        $rootScope.claim.claimDriverAge = responseOutput.Data.Age;
                    } else {
                        alert(responseOutput.message);
                    }
                    vm.preloader = false;
                }).catch(function (error) {
                    console.log(error);
                    vm.preloader = false;
                });
            }
        }


        function setDriver() {
            console.log($rootScope.claim.DriverNamePre);
            if($rootScope.claim.DriverNamePre === "Other") {
                vm.customDriver = true;
            } else {
                vm.customDriver = false;
                $rootScope.claim.DriverName = $rootScope.claim.DriverNamePre;
            }
        }
        

        function getDriversList() {
            var data = {
                "jsonval": {
                    "UserId": "MobileApp",
                    "ClassCode": $rootScope.claim.ClassCode,
                    "PolNo": $rootScope.claim.PolNo
                }
            }
            vm.preloader = true;
            vm.actionDisabled = true;
            ApiServices.getDriversList(data).then(function (response) {
                console.log(response);
                var responseOutput = response.data.Output;
                if (responseOutput.status === "True") {
                    vm.drivers = responseOutput.driverInfo;
                }
                vm.preloader = false;
                vm.actionDisabled = false;

            }).catch(function (error) {
                console.log(error);
                vm.preloader = false;
                vm.actionDisabled = false;
            });
        }

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
            var d = new Date();
            d.setDate(d.getDate() - 1);
            vm.yesterday = $filter('date')(d, "yyyy-MM-dd");

            if (commonService.isBeforeToday($rootScope.claim.policyEndDate)) {
                vm.maxLossDate = $filter('date')(new Date($rootScope.claim.policyEndDate), "yyyy-MM-dd");
            } else {
                vm.maxLossDate = $rootScope.today;
            }
            
        });

        if(!$rootScope.claim) {
            $rootScope.claim = {};
        } 
        $rootScope.claim.DriverInfo = [{
            "DriverName": "",
            "DriverMobile": "",
            "VehicleRegno": "",
            "VehicleMake": ""
        }];
        function changeDriverInfo(action, index) {

            if (action == true) {
                if ($rootScope.claim.DriverInfo.length < 3) {
                    $rootScope.claim.DriverInfo.push(
                        {
                            "DriverName": "",
                            "DriverMobile": "",
                            "VehicleRegno": "",
                            "VehicleMake": ""
                        }
                    );
                    // vm.checkFamily();
                }
            } else {
                if ($rootScope.claim.DriverInfo.length > 1) {
                    $rootScope.claim.DriverInfo.pop(index);
                    // vm.checkFamily();
                }
            }
        }


        function init() {   
            if( window.localStorage.getItem('email') ) {
                $rootScope.claim.UserId = window.localStorage.getItem('email');
            }
            // if( window.localStorage.getItem('civilid') ) {
            //     $rootScope.policy.CivilID = parseInt( window.localStorage.getItem('civilid') );
            // }
            // if( window.localStorage.getItem('mobile') ) {
            //     $rootScope.policy.MobileNo = parseInt( window.localStorage.getItem('mobile') );
            // }
            getDriversList();
        }

        function intimateClaim() {
            processingFinished();


            console.log($rootScope.claim);

            if($rootScope.forms.claim.claimForm && $rootScope.forms.claim.claimForm.$valid) {
                vm.formError = '';
                $state.go('claim-documents');
                // submitIntimateClaim(details);

            } else {
                // vm.formResponse = '';
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }

        // function submitIntimateClaim(details) {
        //     processing();
        //     ApiServices.getClaimIntimation(details)
        //     .then(function(response) {
        //             console.log(response);
        //             if(response.data.Output.status == "True") {
        //                 // vm.formResponse = response.data.Output.message;
        //                 $rootScope.claim.intData = response.data.Output;
        //                 $state.go('claim-intimate-response');
        //             } else {
        //                 vm.formError = response.data.Output.message;
        //             }
        //             processingFinished();
        //     })
        //     .catch(function(error) {
        //         processingFinished();
        //         console.log('Error at Claim Intimation');
        //     });
        // }


        // function processing() {
        //     vm.formError = '';
        //     vm.formResponse = '';
        //     vm.preloader = true;
        //     vm.actionDisabled = true;
        // }
        function processingFinished() {
            vm.preloader = false;
            vm.actionDisabled = false;
        }

        function goBack() {
            window.history.back();
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();