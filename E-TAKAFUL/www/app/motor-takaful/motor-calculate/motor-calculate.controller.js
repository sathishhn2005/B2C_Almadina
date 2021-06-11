(function() {
    'use strict';
    angular.module('app.routes').controller('motorCalculateCtrl', motorCalculateCtrl);
    motorCalculateCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService', '$translate'];

    function motorCalculateCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            motorTakafulCalculate: motorTakafulCalculate,
            premiumAmount: '',
            preloader: false,
            formError: '',
            goBack: goBack,
            actionDisabled: false,
            fieldData: [],
            setVehicleName: setVehicleName,
            // setAgencyRepair: setAgencyRepair,
            mfgMaxYear: '',
            mfgMinYear: '',
            driverAgeMin: driverAgeMin,
            setFirstRegDate: setFirstRegDate,
            maxFirstRegDate: '',
            minFirstRegDate: '',
            claimSelected: false,
            getVehicleInfo: getVehicleInfo,
            getLicenseInfo: getLicenseInfo,
            verify: verify,
            validated: false,
            checkShowOrangeCard: checkShowOrangeCard,
            actionDisabled: false,
        });



        function checkShowOrangeCard() {
            if ($rootScope.motorTakaful.GeographicalAera !== '01') {
                console.log($rootScope.motorTakaful.GeographicalAera);
                $rootScope.motorTakaful.showOrangeCard = true;
                if ($rootScope.motorTakaful.BranchList) {
                    $rootScope.motorTakaful.BranchList = '';
                }
            } else {
                $rootScope.motorTakaful.showOrangeCard = false;
            }
        }

        function verify(e) {
            // e.preventDefault();
            vm.actionDisabled = true;
            getLicenseInfo();
            getVehicleInfo();
        }


        if ($rootScope.motorTakaful) {
            $rootScope.motorTakaful.DrivingLicenseNumber = parseInt(window.localStorage.getItem('civilid'));
        }

        function getLicenseInfo() {

        }


        function getVehicleInfo() {

            if ($rootScope.motorTakaful.RegistrationLetter && $rootScope.motorTakaful.RegistrationNo && $rootScope.motorTakaful.DrivingLicenseNumber) {
                var data = {
                    "jsonval": {
                        "UserId": "MobileApp",
                        "LicenseNumber": $rootScope.motorTakaful.DrivingLicenseNumber,
                        "PlateNo": $rootScope.motorTakaful.RegistrationNo,
                        "PalteChar": $rootScope.motorTakaful.RegistrationLetter
                    }
                };
                vm.preloader = true;
                ApiServices.getLisenceVehicleInfo(data).then(function(response){
                    console.log(response)
                    vm.actionDisabled = false;
                    if (response && response.data && response.data.Output) {
                        var responseOutput = response.data.Output;
                        if (responseOutput.status === "True") {
                            $rootScope.motorTakaful.ChassisNo = responseOutput.Data.ChassisNumber;
                            $rootScope.motorTakaful.EngineNo = responseOutput.Data.EngineNumber;
                            $rootScope.motorTakaful.ManufacturingYear = responseOutput.Data.MakeYear;
                            $rootScope.motorTakaful.RegistrationLetter = responseOutput.Data.PlateCode;
                            $rootScope.motorTakaful.VehicleType = responseOutput.Data.RegistraionTypeDesc;
                            $rootScope.motorTakaful.VehicleTypeID = responseOutput.Data.RegistraionType;
                            $rootScope.motorTakaful.VehicleMakeText = responseOutput.Data.VehicleMake;
                            $rootScope.motorTakaful.VehicleMake = responseOutput.Data.VehicleMakeID;
                            $rootScope.motorTakaful.isMulkiya = new Date(responseOutput.Data.MulkiyaEndDate);
                            $rootScope.motorTakaful.LicenceFirstIssued = responseOutput.Data.DateFirstIssued;
                            $rootScope.motorTakaful.DriverDateofBirth = responseOutput.Data.DateofBirth;
                            console.log('$rootScope.motorTakaful.isMulkiya ', $rootScope.motorTakaful.isMulkiya, new Date(responseOutput.Data.MulkiyaEndDate));
                            if ($rootScope.motorTakaful.DriverDateofBirth) {
                                vm.validated = true;
                                vm.formError = '';
                            }
                        } else {
                            vm.validated = false;
                            vm.formError = responseOutput.message;
                        }
                        vm.preloader = false;
                    }
                }).catch(function(error){
                    console.log(error)
                    vm.preloader = false;
                })
                // ApiServices.getVehicleInfo(data).then(function(response) {
                //     vm.actionDisabled = false;
                //     if (response && response.data && response.data.Output) {
                //         var responseOutput = response.data.Output;
                //         if (responseOutput.status === "True") {
                //             $rootScope.motorTakaful.ChassisNo = responseOutput.Data.ChassisNumber;
                //             $rootScope.motorTakaful.EngineNo = responseOutput.Data.EngineNumber;
                //             $rootScope.motorTakaful.ManufacturingYear = responseOutput.Data.MakeYear;
                //             $rootScope.motorTakaful.RegistrationLetter = responseOutput.Data.PlateCode;
                //             $rootScope.motorTakaful.VehicleType = responseOutput.Data.RegistraionTypeDesc;
                //             $rootScope.motorTakaful.VehicleTypeID = responseOutput.Data.RegistraionType;
                //             $rootScope.motorTakaful.VehicleMakeText = responseOutput.Data.VehicleMake;
                //             $rootScope.motorTakaful.VehicleMake = responseOutput.Data.VehicleMakeID;
                //             $rootScope.motorTakaful.isMulkiya = new Date(responseOutput.Data.MulkiyaEndDate);
                //             console.log('$rootScope.motorTakaful.isMulkiya ', $rootScope.motorTakaful.isMulkiya, new Date(responseOutput.Data.MulkiyaEndDate));
                //             if ($rootScope.motorTakaful.DriverDateofBirth) {
                //                 vm.validated = true;
                //                 vm.formError = '';
                //             }
                //         } else {
                //             vm.validated = false;
                //             vm.formError = responseOutput.message;
                //         }
                //     }
                //     vm.preloader = false;

                // }).catch(function(error) {
                //     console.log(error);
                //     vm.preloader = false;
                // });

                $rootScope.$watch('motorTakaful.ManufacturingYear', function (newVal, oldVal) {
                    vm.setFirstRegDate();
                }, true);


                // var data1 = {
                //     "jsonval": {
                //         "UserId": "MobileApp",
                //         "LicenseNumber": $rootScope.motorTakaful.DrivingLicenseNumber
                //     }
                // };
                // vm.preloader = true;
                
                // ApiServices.getLicenseInfo(data1).then(function (response) {
                //     console.log(response);
                //     if (response && response.data && response.data.Output) {
                //         var responseOutput = response.data.Output;
                //         if (responseOutput.status === "True") {
                //             $rootScope.motorTakaful.LicenceFirstIssued = responseOutput.Data.DateFirstIssued;
                //             $rootScope.motorTakaful.DriverDateofBirth = responseOutput.Data.DateofBirth;
                //             if ($rootScope.motorTakaful.EngineNo) {
                //                 vm.validated = true;
                //                 vm.formError = '';
                //             }
                //         } else {
                //             vm.validated = false;
                //             vm.formError = responseOutput.message;
                //         }
                //     } 
                //     vm.preloader = false;
                // }).catch(function (error) {
                //     console.log(error);
                //     vm.preloader = false;
                // });
            }
        }

        // console.log($rootScope.motorTakaful.fieldData);
        // $rootScope.motorTakaful.fieldData.vehiclelist = ['1','2','3']


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
            // calculateToDate();
        });

        function setFirstRegDate() {
            console.log($rootScope.motorTakaful.ManufacturingYear);
            if ($rootScope.motorTakaful.ManufacturingYear){
                $rootScope.motorTakaful.FirstRegDate = '';
                var dateString = $rootScope.motorTakaful.ManufacturingYear.toString() + '-01-01';
                console.log('date', dateString);
                var date = new Date(dateString);
                vm.minFirstRegDate = commonService.dateCount(date, 0, 0, 0, true);
                vm.maxFirstRegDate = commonService.dateCount(date, -1, 0, 3, true);
                console.log('vm.minFirstRegDate', vm.minFirstRegDate, 'vm.maxFirstRegDate', vm.maxFirstRegDate);
            }
        }


        function init() {
            var d = new Date();
            vm.mfgMaxYear = commonService.dateCount(false, 0, 0, 1, true);
            vm.mfgMinYear = commonService.dateCount(false, 0, 0, -25, true);



            if(!$rootScope.motorTakaful) {
                $rootScope.motorTakaful = {}
            }

            // console.log($rootScope.motorTakaful.fieldData)
            // if (!$rootScope.motorTakaful.fieldData) {
            //     $rootScope.motorTakaful.fieldData = $rootScope.motorFields;
            // }

            console.log($rootScope.motorTakaful);

            if(window.localStorage.getItem('email')) {
                $rootScope.motorTakaful.UserId = window.localStorage.getItem('email');
                $rootScope.motorTakaful.Email = window.localStorage.getItem('email');
            }
            if(window.localStorage.getItem('displayName')) {
                $rootScope.motorTakaful.InsuredName = window.localStorage.getItem('displayName');
                $rootScope.motorTakaful.InsName = window.localStorage.getItem('displayName');
            }
            if( window.localStorage.getItem('civilid') ) {
                $rootScope.motorTakaful.CivilID = parseInt( window.localStorage.getItem('civilid') );
            }
            if( window.localStorage.getItem('mobile') ) {
                $rootScope.motorTakaful.MobileNo = parseInt( window.localStorage.getItem('mobile') );
            }
            // if(!$rootScope.motorTakaful.VehicleType) {
            //     $rootScope.motorTakaful.VehicleType = '101';
            // }

            if (!$rootScope.motorTakaful.Tonnage) {
                $rootScope.motorTakaful.Tonnage = '1005';
            }

        }

        function motorTakafulCalculate(event) {
            event.preventDefault();
            console.log($rootScope.motorTakaful);
            if (!$rootScope.motorTakaful.hasClaim) {
                vm.formError = $translate.instant('Enter Valid Details');
                vm.claimSelected = false;
                return;
            } else {
                vm.claimSelected = true;
                vm.formError = '';
            }

            if ($rootScope.motorTakaful.hasClaim == 'Y' || $rootScope.motorTakaful.VehicleTypeID !== '1') {
                vm.formError = $translate.instant("Please contact Al Madina 80080808");
                return;
            } else {
                vm.formError = '';
            }
            // console.log($rootScope.motorTakaful.VehicleValue)
            // if ($rootScope.motorTakaful.VehicleValue > 50000) {
            //     vm.formError = "Enter Valid Details";
            //     vm.invalidVehicleValue = true;
            //     return;
            // } else {
            //     vm.invalidVehicleValue = false;
            //     vm.formError = '';
            // }
            vm.preloader = true;

            if($rootScope.motorTakaful && $rootScope.forms.motorTakaful.calculateForm && $rootScope.forms.motorTakaful.calculateForm.$valid) {
                var data= {
                    "jsonval":{
                        "Guest": $rootScope.user.guest,
                        "UserId": "MobileApp",
                        "Title": $rootScope.motorTakaful.Title,
                        "InsName": $rootScope.motorTakaful.InsName,
                        "MobileNo": $rootScope.motorTakaful.MobileNo,
                        "Email": $rootScope.motorTakaful.Email,
                        "VehicleMake": $rootScope.motorTakaful.VehicleMake,
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
                        "OutsideCapitalArea": $rootScope.motorTakaful.OutsideCapitalArea
                        // "FromDate":$filter('date')($rootScope.motorTakaful.FromDate, "MM/dd/yyyy"),
                        // "ToDate":$filter('date')($rootScope.motorTakaful.ToDate, "MM/dd/yyyy")
                    }
                }

                vm.formError = '';        
                ApiServices.getMotorDetails(JSON.stringify(data))
                .then(function(response) {
                    console.log(response);
                    vm.preloader = false;
                    vm.actionDisabled = false;
                    if (response.data && response.data.Output && response.data.Output.status == 'True'){
                        $rootScope.motorTakaful.calculateData = response.data.Output;
                        vm.goTo('motor-summary');
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                })
                .catch(function(error) {
                    vm.preloader = false;
                    vm.actionDisabled = false;
                    vm.formError = '';
                    console.log('Error at helper calculate premium');
                });
               
            } else {
                vm.preloader = false;
                vm.actionDisabled = false;
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }
        // function setAgencyRepair() {
        //     var inputDate = $rootScope.motorTakaful.FirstRegDate;
        //     if(inputDate) {


                

        //         var d = new Date();
        //         var year = d.getFullYear();
        //         var month = d.getMonth();
        //         var day = d.getDate();


        //         var repairDate = new Date(year - 3, month, day + 1)
        //         if(inputDate < repairDate) {
        //             // console.log('ended');
        //             // $rootScope.motorTakaful.AgencyRepair = '0';
        //         } else {
        //             // console.log('in isnidre');
        //             // $rootScope.motorTakaful.AgencyRepair = '01';
        //         }

        //         // console.log(year, returnDate);
        //         // $rootScope.motorTakaful.EndDate = returnDate;
        //     }

        //     // var dateLimit = new Date() 
            

        // }

        function driverAgeMin() {
            // var inputDate = $rootScope.motorTakaful.DriverDateofBirth;
            // if(inputDate) {
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth();
                var day = d.getDate();
                var minAge = $filter('date')(new Date((year - 18), month, day), "yyyy-MM-dd");    
                return minAge;
            // }
            
        }

        function setVehicleName() {
            // console.log($rootScope.motorTakaful.VehicleMakeText.value);
            // console.log($rootScope.motorTakaful.VehicleMake2);
            // $rootScope.motorTakaful.VehicleMake = $rootScope.motorTakaful.VehicleMake2.key;
            // // $rootScope.motorTakaful.VehicleMakeText = $rootScope.motorTakaful.fieldData.vehiclelist[$rootScope.motorTakaful.VehicleMake]
            // $rootScope.motorTakaful.VehicleMakeText = $rootScope.motorTakaful.VehicleMake2.value;
        }

        function goTo(state) {
            $state.go(state);
        }
        function goBack() {
            window.history.back();
        }
    }
})();