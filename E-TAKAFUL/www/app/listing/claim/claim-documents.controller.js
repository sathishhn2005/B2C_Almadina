(function() {
    'use strict';
    angular.module('app.routes').controller('claimDocumentsCtrl', claimDocumentsCtrl);
    claimDocumentsCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout'];

    function claimDocumentsCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout) {
        var vm = angular.extend(this, {
            goTo: goTo,
            goBack: goBack,
            intimateClaim: intimateClaim,
            formError: '',
            preloader: false,
            test: test,
            uploadme: '',
            pickFile: pickFile,
            loadComplete: false,
            selectFile: selectFile
        });


        function selectFile(e) {
            e.preventDefault();
            document.getElementsByName(e.target.getAttribute('data-input'))[0].click();
        }

        function pickFile() {
          console.log('pick a file')
          fileChooser.open(successCallback, failureCallback);
        }

        function successCallback(response) {
          console.log(response);
        }

        function failureCallback(error) {
          console.log(error);
        }


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });
        $scope.$on('$ionicView.leave', function (scopes, states) {
            vm.loadComplete = false;
        });

        function test() {
            console.log($rootScope.claim.Picture1);
        }

        if(!$rootScope.claim) {
            $rootScope.claim = {}
        } 
        function init() { 
            $timeout(function() {
                vm.loadComplete = true;
            }, 200);
            if( window.localStorage.getItem('email') ) {
                $rootScope.claim.UserId = window.localStorage.getItem('email');
            }
        }
        function intimateClaim() {
            processingFinished();
            var details = {
              "jsonval": {
                    "UserId": "MobileApp",
                    "PolicyNo": $rootScope.claim.PolNo,
                    "LossDate": $rootScope.claim.LossDate,
                    "ThirdPartyYN": $rootScope.claim.ThirdPartyYN,
                    "TPVehicleNo": $rootScope.claim.TPVehicleNo,
                    "AccidentLocation": $rootScope.claim.AccidentLocation,
                    "ROPYN": $rootScope.claim.ROPYN,
                    "DriverName": $rootScope.claim.DriverName,
                    "DrDOB": $filter('date')(new Date($rootScope.claim.claimDriverDateofBirth.split("/").reverse().join("-")), "MM/dd/yyyy"),
                    "DrAge": $rootScope.claim.claimDriverAge,
                    "Excess": $rootScope.claim.excess,
                    "DrivingLicenseNumber": $rootScope.claim.DrivingLicenseNumber,
                    "MobileNo": $rootScope.claim.MobileNo,
                    "AccidentDesc": $rootScope.claim.AccidentDesc,
                    "Licence": $rootScope.claim.Licence,
                    "MrtaForm": $rootScope.claim.MrtaForm,
                    "MulkiyaForm": $rootScope.claim.MulkiyaForm,
                    "Bonet": $rootScope.claim.Bonet,
                    "WindowScreen": $rootScope.claim.WindowScreen,
                    "Roof": $rootScope.claim.Roof,
                    "Window": $rootScope.claim.Window,
                    "Boot": $rootScope.claim.Boot,
                    "DoorLeftFront": $rootScope.claim.DoorLeftFront,
                    "DoorLeftBack": $rootScope.claim.DoorLeftBack,
                    "DoorRightFront": $rootScope.claim.DoorRightFront,
                    "DoorRightBack": $rootScope.claim.DoorRightBack,
                    "CapLeftFront": $rootScope.claim.CapLeftFront,
                    "CapLeftBack": $rootScope.claim.CapLeftBack,
                    "CapRightFront": $rootScope.claim.CapRightFront,
                    "CapRightBack": $rootScope.claim.CapRightBack,
                    "DriverInfo": $rootScope.claim.DriverInfo
                }
            };

            if ($rootScope.claim.DriverInfo && 
                $rootScope.claim.DriverInfo[0] && 
                ($rootScope.claim.DriverInfo[0].DriverMobile || $rootScope.claim.DriverInfo[0].DriverName || $rootScope.claim.DriverInfo[0].VehicleMake || $rootScope.claim.DriverInfo[0].VehicleRegno)) {

            } else {
                details.jsonval.DriverInfo = [];
            }
            
            

                
            if($rootScope.forms.claim.claimDocumentsForm && $rootScope.forms.claim.claimDocumentsForm.$valid) {
                submitIntimateClaim(details)
            } else {
                // vm.formResponse = '';
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }

        function submitIntimateClaim(details) {
            processing();
            console.log(details);
            ApiServices.getClaimIntimation(details)
            .then(function(response) {
                    console.log(response);
                    if(response.data.Output.status == "True") {
                        // vm.formResponse = response.data.Output.message;
                        $rootScope.claim.intData = response.data.Output;
                        $state.go('claim-intimate-response');
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
            })
            .catch(function(error) {
                processingFinished();
                console.log('Error at Claim Intimation');
            });
        }


        function processing() {
            vm.formError = '';
            vm.formResponse = '';
            vm.preloader = true;
            vm.actionDisabled = true;
        }
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