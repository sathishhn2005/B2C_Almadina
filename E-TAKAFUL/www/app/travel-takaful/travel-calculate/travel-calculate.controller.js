(function() {
    'use strict';
    angular.module('app.routes').controller('travelCalculateCtrl', travelCalculateCtrl);
    travelCalculateCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService', '$translate'];

    function travelCalculateCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            travelCalculate: travelCalculate,
            // selectCoverage: selectCoverage,
            calculateAge: calculateAge,
            travelCalculate: travelCalculate,
            preloader: false,
            setInsureType: setInsureType,
            actionDisabled: false,
            yesterday: ''
        });

        function setInsureType(type) {
            console.log($rootScope.travelTakaful);
            $rootScope.travelTakaful.for = type;
            $rootScope.travelTakaful.CoverageType = '';
            checkAge();
            // if(type == 'family') {
            //     $rootScope.travelTakaful.CoverageType = '04';
            // } else {
            //     $rootScope.travelTakaful.CoverageType = '01';
            // }
        }


        $scope.$on('$ionicView.enter', function(scopes, states){
            enter();
        });


        init();
        function init() {
            $rootScope.travelTakaful = {
              "for": "",
              "SessionId": "",
              "TripDays": "",
              "Age": "",
              "Email": "",
              "CoverageType": "",
              "WaterSports": false,
              "WinterSports": false,
              "Terrorism": false,
              "AssurName": "",
              "FromDate": "",
              "ToDate": "",
              "DOB": "",
              "Gender": "",
              "Civilid": "",
              "Mobile": "",
              "PostBox": "",
              "PostalCode": "",
              "ResPhone": "",
              "City": "",
              "Email": "",
              "LocalPersonName": "",
              "LocalPersonNumber": "",
              "Nationality": "",
              "PassportNo": "",
              "Purpose": "",
              "Plan": "",
              "Destination": "",
              "FamilyInfo": []
            }
        }

        
        function enter() {
            var d = new Date();
            d.setDate(d.getDate()-1);
            vm.yesterday = $filter('date')(d, "yyyy-MM-dd");
            console.log(vm.yesterday);

            console.log($rootScope.travelTakaful);

            if (!$rootScope.travelTakaful) {
                console.log('no travel taka');
                init();
            }

        }


        function travelCalculate(event) {
            console.log($rootScope.travelTakaful);
            if(event) {
                event.preventDefault();
            }

            var data = {
                "jsonval":{
                    "Guest": $rootScope.user.guest,
                    "UserId": "MobileApp",
                    "SessionId":""  ,
                    "TripDays": "",
                    "DOB": "",
                    "Age": "",
                    "Email": "",
                    "CoverageType": "",
                    "WaterSports": false,
                    "WinterSports": false,
                    "Terrorism": false
                }
            }
            if(window.localStorage.getItem('email')) {
                data.jsonval.Email = window.localStorage.getItem('email');
            }
            if($rootScope.travelTakaful) {
                if(!$rootScope.travelTakaful.for) {
                    vm.formError = $translate.instant("Please select Insure Type"); 
                    return;
                }
                if(!$rootScope.travelTakaful.CoverageType) {
                    vm.formError = $translate.instant("Please select Travelling To"); 
                    return;
                } else {
                    data.jsonval.CoverageType = $rootScope.travelTakaful.CoverageType;
                }
                if(!$rootScope.travelTakaful.DOB) {
                    vm.formError = $translate.instant("Please fill DOB"); 
                    return;
                } else {
                    data.jsonval.DOB = $filter('date')($rootScope.travelTakaful.DOB, "MM/dd/yyyy");
                }
                if($rootScope.travelTakaful.TripDays) {
                    data.jsonval.TripDays = $rootScope.travelTakaful.TripDays;
                } else {
                    vm.formError = $translate.instant("Please Select Travel Days"); 
                    return;
                }

                console.log($rootScope.travelTakaful.Age)
                if($rootScope.travelTakaful.Age || $rootScope.travelTakaful.Age == 0) {
                    data.jsonval.Age = $rootScope.travelTakaful.Age;
                }

                if($rootScope.travelTakaful.WaterSports) {
                    data.jsonval.WaterSports = $rootScope.travelTakaful.WaterSports;
                }
                if($rootScope.travelTakaful.WinterSports) {
                    data.jsonval.WinterSports = $rootScope.travelTakaful.WinterSports;
                }
                if($rootScope.travelTakaful.Terrorism) {
                    data.jsonval.Terrorism = $rootScope.travelTakaful.Terrorism;
                }
                $rootScope.travelTakaful.SessionId = (Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2));
                data.jsonval.SessionId = $rootScope.travelTakaful.SessionId;
            }

            
            vm.preloader = true;
            vm.formError = '';
            vm.actionDisabled = true;
            ApiServices.getTravelDetails(JSON.stringify(data))
            .then(function(response){
                console.log(response, 'response');
                if(response.data.Output && response.data.Output.status == "True") {
                    vm.travelResponse = response.Data;
                    $rootScope.travelTakaful.calculateData = response.data;
                    $state.go('travel-summary');
                } else {
                    vm.formError = $translate.instant("Something Went Wrong");
                }
                vm.preloader = false;
                vm.actionDisabled = false;
            }).catch(function(error){
                vm.preloader = false;
                vm.actionDisabled = false;
            });
        }

        function calculateAge(){
            console.log('on change', $rootScope.travelTakaful.DOB);
        }

        $rootScope.$watch('travelTakaful.DOB', function (newVal, oldVal) {
            $rootScope.travelTakaful.Age = commonService.getAge($rootScope.travelTakaful.DOB);
            checkAge();
            
        }, true);


        function checkAge() {
            console.log('check age', $rootScope.travelTakaful.Age);
            if (($rootScope.travelTakaful.Age || $rootScope.travelTakaful.Age === 0) && $rootScope.travelTakaful.for) {
                console.log('check age has for and age');
                if ($rootScope.travelTakaful.for === "individual") {
                    console.log('check age has indi');
                    if ($rootScope.travelTakaful.Age < 18 || $rootScope.travelTakaful.Age > 65) {
                        vm.formError = $translate.instant("The insured must be at least 18 years of age and not more than 65 years of age");
                        vm.actionDisabled = true;
                    } else {
                        vm.actionDisabled = false;
                        vm.formError = "";
                    }
                }
                if ($rootScope.travelTakaful.for === "family") {
                    console.log('check age has fami');
                    if ($rootScope.travelTakaful.Age < 21 || $rootScope.travelTakaful.Age > 65) {
                        vm.formError = $translate.instant("The insured must be at least 21 years of age and not more than 65 years of age");
                    } else {
                        vm.actionDisabled = false;
                        vm.formError = "";
                    }
                }
            }
        }


        function goTo(state) {
            console.log($rootScope.travelTakaful);            
            $state.go(state);
        }
    }
})();