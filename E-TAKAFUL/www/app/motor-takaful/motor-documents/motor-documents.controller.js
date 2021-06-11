(function() {
    'use strict';
    angular.module('app.routes').controller('motorDocumentsCtrl', motorDocumentsCtrl);
    motorDocumentsCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', 'commonService', '$translate'];

    function motorDocumentsCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            goBack: goBack,
            submitPhotoForm: submitPhotoForm,
            selectFile: selectFile
        });

        function selectFile(e) {
            e.preventDefault();
            document.getElementsByName(e.target.getAttribute('data-input'))[0].click();
        }

        
        if(!$rootScope.motorTakaful) {
            $rootScope.motorTakaful = {}
        }
        function init() {
            console.log($rootScope.motorTakaful);
        }

        function submitPhotoForm(event) {
            // console.log($rootScope.forms.motorTakaful);
            // console.log($rootScope.forms.motorTakaful.photoForm.NCBCertificate.$invalid);

            if($rootScope.forms.motorTakaful.photoForm && $rootScope.forms.motorTakaful.photoForm.$valid) {
                // console.log($rootScope.forms.motorTakaful.photoForm.NCBCertificate);
                callApi();
            } else {
                vm.formResponse = '';
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }




        function callApi() {
            processing();
            var data = {
                "jsonval":{
                    "Guest": $rootScope.user.guest,
                    "UserId": "MobileApp",
                    "ProdCode": $rootScope.motorTakaful.ProdCode,
                    "MobileNo": $rootScope.motorTakaful.MobileNo,
                    "Email": $rootScope.motorTakaful.Email,
                    "VehicleMake": $rootScope.motorTakaful.VehicleMake,
                    "VehicleMakeText": $rootScope.motorTakaful.VehicleMakeText, 
                    "VehicleType": "101",
                    "ManufacturingYear": $rootScope.motorTakaful.ManufacturingYear,
                    "SeatingCapacity": $rootScope.motorTakaful.SeatingCapacity,
                    "Tonnage": $rootScope.motorTakaful.Tonnage,
                    "GeographicalAera": $rootScope.motorTakaful.GeographicalAera,
                    "FirstRegDate": $filter('date')($rootScope.motorTakaful.FirstRegDate, "MM/dd/yyyy"),
                    "DriverDateofBirth": $filter('date')(new Date($rootScope.motorTakaful.DriverDateofBirth.split("/").reverse().join("-")), "MM/dd/yyyy"),
                    "VehicleValue": $rootScope.motorTakaful.VehicleValue,
                    "RoadAssistance": $rootScope.motorTakaful.RoadAssistance,
                    "NoClaimsYear": $rootScope.motorTakaful.NoClaimsYear,
                    "PurchaseType": $rootScope.motorTakaful.PurchaseType,
                    "OutsideCapitalArea": $rootScope.motorTakaful.OutsideCapitalArea,
                    "LicenceFirstIssued": $filter('date')(new Date($rootScope.motorTakaful.LicenceFirstIssued.split("/").reverse().join("-")), "MM/dd/yyyy"),
                    "StartDate": $filter('date')($rootScope.motorTakaful.StartDate, "MM/dd/yyyy"),
                    "EndDate": $filter('date')($rootScope.motorTakaful.EndDate, "MM/dd/yyyy"),
                    "InsTitle": $rootScope.motorTakaful.Title,
                    "InsuredName": $rootScope.motorTakaful.InsuredName,
                    "CivilID": $rootScope.motorTakaful.CivilID,
                    "PostBox": $rootScope.motorTakaful.PostBox,
                    "PostalCode": $rootScope.motorTakaful.PostalCode,
                    "City": $rootScope.motorTakaful.City,
                    "ResPhoneNo": $rootScope.motorTakaful.ResPhoneNo,
                    "Nationality": $rootScope.motorTakaful.Nationality,
                    "PassportNo": "",
                    "RegistrationNo": $rootScope.motorTakaful.RegistrationNo,
                    "RegistrationLetter": $rootScope.motorTakaful.RegistrationLetter,
                    "EngineNo": $rootScope.motorTakaful.EngineNo,
                    "ChassisNo": $rootScope.motorTakaful.ChassisNo,
                    "VehicleCC": $rootScope.motorTakaful.VehicleCC,
                    "PlateColor": $rootScope.motorTakaful.PlateColor,
                    "Color": $rootScope.motorTakaful.Color,
                    "Cylinder": $rootScope.motorTakaful.Cylinder,
                    "BanksName": $rootScope.motorTakaful.BanksName,
                    "AgencyRepair": '',
                    "DriverInfo": $rootScope.motorTakaful.DriverInfo,
                    "PlateColor":"",
                    "Color":"",
                    "Cylinder":"",
                    "NCBCertificate": $rootScope.motorTakaful.NCBCertificate,
                    "DriverLicence": $rootScope.motorTakaful.DriverLicence,
                    "Mulkiya": $rootScope.motorTakaful.Mulkiya,
                    "Others": $rootScope.motorTakaful.Others
                }
            };
                // console.log('data', data);
                ApiServices.saveMotorDetails(angular.toJson(data))
                .then(function(response){
                    // console.log(response);
                    if(response.data && response.data.Output.status == 'True'){
                        vm.responseData = response.data.Output.Data;
                        vm.draftNo = response.data.Output.draftNo;
                        $rootScope.motorTakaful.motorSaveData = response.data.Output.Data;
                        $rootScope.motorTakaful['Reference No'] = response.data.Output['Reference No'];
                        $state.go('motor-save-response');
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
               }).catch(function(error){
                    processingFinished();
               });
        }



        $scope.$on('$ionicView.beforeEnter', function(scopes, states){
            init();
            vm.showContent = false;
        });
        $scope.$on('$ionicView.enter', function(scopes, states){
            $timeout(function() {
                vm.showContent = true;
            }, 200);
        });
        function goBack() {
            window.history.back();
        }
        function goTo(state) {
            $state.go(state);
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
    }
})();