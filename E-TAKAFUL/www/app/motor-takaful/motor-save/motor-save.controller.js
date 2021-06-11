(function() {
    'use strict';
    angular.module('app.routes').controller('motorSaveCtrl', motorSaveCtrl);
    motorSaveCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', 'commonService', '$translate'];

    function motorSaveCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            formError: '',
            formResponse: '',
            // saveTravel: {},
            motorTakafulSave: motorTakafulSave,
            travelSaveResponse: {},
            summaryModal: '',
            draftNo: '',
            preloader: false,
            calculateAge: calculateAge,
            // calculateReturnDate: calculateReturnDate,
            showContent: false,
            changeFamily: changeFamily,
            enableDriver: enableDriver,
            responseData: [],
            goBack: goBack,
            actionDisabled: false,
            setNationalityText: setNationalityText,
            setBank: setBank,
            policyStartMax: '',
            ifMulkiya: true,
            checkMulkiya: checkMulkiya,
            maxMulkiyaDate: '',
            setPostalCode: setPostalCode,
            postalCode: {},
            minMulkiyaDate: '',
            setBranch: setBranch
        });

        function setBranch() {
            if ($rootScope.motorTakaful.showBranch === 0) {
                motorTakaful.BranchList = ''
            }
        }

        function setBank() {
            if($rootScope.motorTakaful.Finance) {
                $rootScope.motorTakaful.BanksName = '';
            }
        }        
        vm.minMulkiyaDate = commonService.dateCount(false, 1, 0, 0, true);
        vm.maxMulkiyaDate = commonService.dateCount(false, 30, 0, 0, true);


        // vm.maxPolicyDate = commonService.dateCount('', 0, 1, 0, true);
        // $rootScope.motorTakaful.StartDate = new Date();
        $rootScope.motorTakaful.AddDriver = 0;

        function changeFamily(action, index) {
            if (action == true) {
                if($rootScope.motorTakaful.DriverInfo.length < 7) {
                    $rootScope.motorTakaful.DriverInfo.push(
                        {
                            "DriverName": "",
                            "DriverAge": "",
                            "DriverLicType": "",
                            "DriverLicNo": "",
                            "Relationship": ""
                        }
                    );
                }
            } else {
                if($rootScope.motorTakaful.DriverInfo.length > 1) {
                    $rootScope.motorTakaful.DriverInfo.pop(index);
                }
            }
        }

        function enableDriver() {
            $rootScope.motorTakaful.DriverInfo = [];
            $rootScope.motorTakaful.DriverInfo.push(
                {
                    "DriverName": "",
                    "DriverAge": "",
                    "DriverLicType": "",
                    "DriverLicNo": "",
                    "Relationship": ""
                }
            );
        }
        
        // vm.calculateReturnDate();
        function init() {

            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var maxStart = new Date(year, month + 1, day);
            // vm.policyStartMax = maxStart;

            vm.policyStartMax = $filter('date')(new Date(year, month + 1, day), "yyyy-MM-dd");
            console.log('vm.policyStartMax', vm.policyStartMax);
            
            if(!$rootScope.motorTakaful) {
                $rootScope.motorTakaful = {};
            }
            console.log($rootScope.motorTakaful);
            if($rootScope.motorTakaful) {
                
                $rootScope.motorTakaful.DriverInfo =  [];
            }
            vm.formError = '';
            vm.formResponse = '';
            console.log($rootScope.motorTakaful);
            if ($rootScope.brochures && $rootScope.brochures.citylist) {
                vm.postalCode = $rootScope.brochures.citylist;
            } else  {
                ApiServices.getBrochures().then(function (response) {
                    if (response.data && response.data.Output) {
                        vm.postalCode = response.data.Output.citylist;
                    }
                }).catch(function (error) {
                    console.log('error at fetching citylist');
                });
            }
        }
        
        function setPostalCode() {
            if ($rootScope.motorTakaful.PostalCode) {
                $rootScope.motorTakaful.City = vm.postalCode[$rootScope.motorTakaful.PostalCode];
            }
        }


        function checkMulkiya(saveData) {
            console.log('asdas', $rootScope.motorTakaful.isMulkiya);
            if($rootScope.motorTakaful.isMulkiya) {
                $rootScope.motorTakaful.StartDate = commonService.dateCount($rootScope.motorTakaful.isMulkiya, 1, 0, 0, false);
                $rootScope.motorTakaful.EndDate = commonService.dateCount($rootScope.motorTakaful.isMulkiya, 0, 0, 1, false);
            }
        }

        // $rootScope.$watch('motorTakaful.isMulkiya', function (newVal, oldVal) {
        //     vm.checkMulkiya();
        // }, true);

        function motorTakafulSave(event) {
            if($rootScope.motorTakaful.isMulkiya) {
                vm.checkMulkiya(true);
            }

            if($rootScope.motorTakaful.AddDriver == 0) {
                $rootScope.motorTakaful.DriverInfo = [];
            } else {
                console.log($rootScope.motorTakaful.DriverInfo);
                for(var i = 0; i < $rootScope.motorTakaful.DriverInfo.length; i++) {
                    console.log(i, $rootScope.motorTakaful.DriverInfo[i]);
                } 
            }
            console.log($rootScope.motorTakaful, $rootScope.forms.motorTakaful.saveForm);
            if($rootScope.motorTakaful && $rootScope.forms.motorTakaful.saveForm && $rootScope.forms.motorTakaful.saveForm.$valid) {
                // callApi();
                $state.go('motor-documents');
            } else {
                vm.formResponse = '';
                if(vm.ifMulkiya){
                    vm.formError = $translate.instant('Enter Valid Details');
                }
            }
        }
        
        function callMulkiyaApi() {
            processing();
            var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "ProdCode": $rootScope.motorTakaful.ProdCode,
                        "MobileNo": $rootScope.motorTakaful.MobileNo,
                        "Email": $rootScope.motorTakaful.Email,
                        "VehicleMake": $rootScope.motorTakaful.VehicleMake,
                        "VehicleMakeText": $rootScope.motorTakaful.VehicleMakeText, 
                        "VehicleType": '101',
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
                        branchlist: $rootScope.motorTakaful.BranchList
                    }
                }
                ApiServices.mulkiyaMail(angular.toJson(data))
                .then(function(response){
                    console.log(response);
                    vm.formError = response.data.Output.message;
                    processingFinished();
               }).catch(function(error){
                    vm.formError = $translate.instant("Something Went Wrong");
                    processingFinished();
               });    
        }

        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        function calculateAge(index){
            index = (typeof index !== 'undefined') ?  index : '';
            if(index) {
                $rootScope.motorTakaful.DriverInfo[(index - 1)].MemAge = getAge($rootScope.motorTakaful.DriverInfo[(index - 1)].MemDOB);
            } else {
                $rootScope.motorTakaful.Age = getAge($rootScope.motorTakaful.DOB);    
            }

        }

        // function calculateReturnDate() {
        //     if($rootScope.motorTakaful.StartDate) {
        //         var inputDate = $rootScope.motorTakaful.StartDate;

        //         var d = new Date(inputDate);
        //         var year = d.getFullYear();
        //         var month = d.getMonth();
        //         var day = d.getDate();
        //         var returnDate = new Date(year + 1, month, day - 1)
        //         $rootScope.motorTakaful.EndDate = returnDate;
        //     }
            
        // }


        $scope.$on('$ionicView.beforeEnter', function(scopes, states){
            init();
            vm.showContent = false;
        });
        $scope.$on('$ionicView.enter', function(scopes, states){
            vm.checkMulkiya();
            $timeout(function() {
                vm.showContent = true;
            }, 200);

            // if($rootScope.motorTakaful.FromDate && $rootScope.motorTakaful.TripDays){
            //     calculateReturnDate();
            // }
        });
        function setNationalityText() {
            // console.log('$rootScope.helperTakaful.Nationality', $rootScope.nationality[$rootScope.helperTakaful.Nationality]);
            $rootScope.motorTakaful.NationalityText = $rootScope.nationality[$rootScope.motorTakaful.Nationality];
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