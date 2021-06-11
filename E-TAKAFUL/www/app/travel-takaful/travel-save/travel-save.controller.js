(function() {
    'use strict';
    angular.module('app.routes').controller('travelSaveCtrl', travelSaveCtrl);
    travelSaveCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', 'commonService', '$translate'];

    function travelSaveCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            formError: '',
            formResponse: '',
            // saveTravel: {},
            travelTakafulCalculate: travelTakafulCalculate,
            travelSaveResponse: {},
            summaryModal: '',
            draftNo: '',
            preloader: false,
            calculateAge: calculateAge,
            calculateReturnDate: calculateReturnDate,
            showContent: false,
            changeFamily: changeFamily,
            responseData: [],
            goBack: goBack,
            actionDisabled: false,
            setNationalityText: setNationalityText,
            checkFamily: checkFamily,
            disableSpouse: false,
            disableChild: false,
            childDOB: {},
            childAgeValid: true,
            departureMax: '',
            selectedFamily: 0
        });


        
        if(!$rootScope.travelTakaful) {
            $rootScope.travelTakaful = {}
        }

        function checkFamily() {
            vm.disableSpouse = false;
            vm.disableChild = false;

            var children = 0;
            for(var i = 0; i < $rootScope.travelTakaful.FamilyInfo.length; i++) {
                console.log();
                if($rootScope.travelTakaful.FamilyInfo[i].MemRelationship == '01') {
                    vm.disableSpouse = true;
                }
                if($rootScope.travelTakaful.FamilyInfo[i].MemRelationship == '02') {
                    children = children + 1;
                }
                if (children == 4) {
                    vm.disableChild = true;   
                }

            }

            checkAges()
        }

        var familyDOBs = [];
        function changeFamily(action, index) {

            if (action == true) {
                if($rootScope.travelTakaful.FamilyInfo.length < 5) {
                    $rootScope.travelTakaful.FamilyInfo.push(
                        {
                            "MemName":"",
                            "MemDOB":"",
                            "MemAge":"",
                            "MemRelationship":"",
                            "MemGender":"",
                            "MemPassportNo":""
                        }
                    );
                    vm.checkFamily();
                }
            } else {
                if($rootScope.travelTakaful.FamilyInfo.length > 1) {
                    $rootScope.travelTakaful.FamilyInfo.pop(index);
                    vm.checkFamily();
                }
            }
            setFamilyDOB();
            
        }

        function setFamilyDOB() {
            console.log($rootScope.travelTakaful.FamilyInfo)
            familyDOBs = [];
            for(var i = 0; i < $rootScope.travelTakaful.FamilyInfo.length; i++) {
                // familyDOBs = 
                $rootScope.$watch('travelTakaful.FamilyInfo['+i+'].DOB', function (newVal, oldVal) {

                    // console.log($rootScope.travelTakaful.FamilyInfo[vm.selectedFamily].DOB);
                    if ($rootScope.travelTakaful.FamilyInfo[vm.selectedFamily]) {
                        vm.calculateAge(vm.selectedFamily);
                    }
                }, true);
            }
        }

        // $rootScope.$watch(familyDOBs, function (newVal, oldVal) {
        //     console.log('foo foo foo');
        //     vm.calculateAge(vm.selectedFamily);
        // }, true);

        function init() {
            console.log($rootScope.travelTakaful);
            if($rootScope.travelTakaful) {
                if($rootScope.travelTakaful.for == 'family') {
                    if($rootScope.travelTakaful.FamilyInfo.length < 1) {
                        $rootScope.travelTakaful.FamilyInfo =  [
                            {
                                    "MemName":"",
                                    "MemDOB":"",
                                    "MemAge":"",
                                    "MemRelationship":"",
                                    "MemGender":"",
                                    "MemPassportNo":""
                                }
                        ];
                        setFamilyDOB();
                    }
                } else {
                    $rootScope.travelTakaful.FamilyInfo = []
                }

                if($rootScope.travelTakaful.Age < 0) {
                    $rootScope.travelTakaful.Age =  "";
                }

                if( window.localStorage.getItem('civilid') ) {
                    $rootScope.travelTakaful.Civilid = parseInt( window.localStorage.getItem('civilid') );
                }
                if(window.localStorage.getItem('email')) {
                    $rootScope.travelTakaful.Email = window.localStorage.getItem('email');
                }
                if(window.localStorage.getItem('displayName')) {
                    $rootScope.travelTakaful.AssurName = window.localStorage.getItem('displayName');
                }
                 if(window.localStorage.getItem('mobile')) {
                    $rootScope.travelTakaful.Mobile = parseInt(window.localStorage.getItem('mobile'));
                }
            }
            vm.formError = '';
            vm.formResponse = '';
            console.log($rootScope.travelTakaful);
        }

        function travelTakafulCalculate(event) {
            event.preventDefault();
            console.log($rootScope.travelTakaful, $rootScope.forms.travelTakaful.formName);
            if($rootScope.travelTakaful.FamilyInfo.length > 0) {
                for(var i = 0; i < $rootScope.travelTakaful.FamilyInfo.length; i++) {
                    // console.log(i);
                    $rootScope.travelTakaful.FamilyInfo[i].MemDOB = $filter('date')($rootScope.travelTakaful.FamilyInfo[i].DOB, "MM/dd/yyyy")
                }
            }

            console.log($rootScope.travelTakaful, $rootScope.forms.travelTakaful.formName.$valid, vm.childAgeValid);
            if($rootScope.travelTakaful && $rootScope.forms.travelTakaful.formName.$valid && vm.childAgeValid) {
                var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "Guest": $rootScope.user.guest,
                        "AssurTitle": $rootScope.travelTakaful.AssurTitle,
                        "AssurName": $rootScope.travelTakaful.AssurName,
                        // "IntendDate": $filter('date')($rootScope.travelTakaful.FromDate, "MM/dd/yyyy"),
                        // "IssueDate": $filter('date')($rootScope.travelTakaful.IssueDate, "MM/dd/yyyy"),
                        "FromDate": $filter('date')($rootScope.travelTakaful.FromDate, "MM/dd/yyyy"),
                        "ToDate": $filter('date')($rootScope.travelTakaful.ToDate, "MM/dd/yyyy"),
                        "DOB": $filter('date')($rootScope.travelTakaful.DOB, "MM/dd/yyyy"),
                        "Age": $rootScope.travelTakaful.Age,
                        "TripDays": $rootScope.travelTakaful.TripDays,
                        "Gender": $rootScope.travelTakaful.Gender,
                        "Civilid": $rootScope.travelTakaful.Civilid,
                        "Mobile": $rootScope.travelTakaful.Mobile,
                        "PostBox": "1805",
                        "PostalCode": "130",
                        "City": $rootScope.travelTakaful.City,
                        "ResPhone": $rootScope.travelTakaful.ResPhone,
                        "Email": $rootScope.travelTakaful.Email,
                        "LocalPersonName": $rootScope.travelTakaful.LocalPersonName,
                        "LocalPersonNumber": $rootScope.travelTakaful.LocalPersonNumber,
                        "Nationality": $rootScope.travelTakaful.Nationality,
                        "PassportNo": $rootScope.travelTakaful.PassportNo,
                        "CoverageType": $rootScope.travelTakaful.CoverageType,
                        "WaterSports": $rootScope.travelTakaful.WaterSports,
                        "WinterSports": $rootScope.travelTakaful.WinterSports,
                        "Terrorism": $rootScope.travelTakaful.Terrorism,
                        "Purpose": $rootScope.travelTakaful.Purpose,
                        "Plan": $rootScope.travelTakaful.Plan,
                        "Destination": $rootScope.travelTakaful.Destination,
                        "FamilyInfo": $rootScope.travelTakaful.FamilyInfo,
                        "NationalityText": $rootScope.travelTakaful.NationalityText
                    }
                }
                console.log('data', data);
                vm.preloader = true;
                vm.formError = '';
                vm.formResponse = '';
                vm.actionDisabled = true;
                ApiServices.saveTravelDetails(angular.toJson(data))
                .then(function(response){
                    console.log(response);
                    if(response.data && response.data.Output.status == 'True'){
                        $rootScope.travelTakaful.saveData = $rootScope.travelTakaful
                        // var dataParse = JSON.parse(response.data);
                        vm.responseData = response.data.Output.Data;
                        vm.draftNo = response.data.Output.draftNo;
                        // vm.value = response.data.Output.value;
                        // vm.summaryModal.show(); 
                        $rootScope.travelTakaful.travelSaveData = response.data.Output.Data;
                        $rootScope.travelTakaful['Reference No'] = response.data.Output['Reference No'];
                        $state.go('travel-save-response');
                        vm.actionDisabled = false;
                    } else {
                        vm.formError = $translate.instant("Something Went Wrong");
                        vm.actionDisabled = false;
                    }
                    // console.log(dataParse);
                    // if(dataParse.d &&  dataParse.d.OutValue != 'Falied') {
                        
                    //     console.log(vm.travelSaveResponse);
                        
                    // }
                    vm.preloader = false;
               }).catch(function(error){
                    // console.log(error);
                    vm.preloader = false;
               });
                
            } else {
                vm.formResponse = '';
                if(vm.childAgeValid) {
                    vm.formError = $translate.instant('Enter Valid Details');
                } else {
                    vm.formError = $translate.instant("Child should be below 16 years");
                }
            }

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
            console.log(index);
            index = (typeof index !== 'undefined') ?  index : 100;
            console.log(index);

            if(index != 100) {
                $rootScope.travelTakaful.FamilyInfo[index].MemAge = getAge($rootScope.travelTakaful.FamilyInfo[index].DOB);
                checkAges();
            } else {
                $rootScope.travelTakaful.Age = getAge($rootScope.travelTakaful.DOB);    
            }
        }
        $rootScope.$watch('travelTakaful.DOB', function (newVal, oldVal) {
            vm.calculateAge();
        }, true);


        function checkAges() {
            vm.childDOB = {};
            vm.childAgeValid = true;
            for(var i = 0; i < $rootScope.travelTakaful.FamilyInfo.length; i++) {
                if($rootScope.travelTakaful.FamilyInfo[i].MemRelationship == '02') {
                    if($rootScope.travelTakaful.FamilyInfo[i].MemAge > 16) {
                        vm.childDOB[i] = false;
                    } else {
                        vm.childDOB[i] = true;
                    }   
                } else {
                    vm.childDOB[i] = true;
                }   
            }
            // for(var j = 0; j < vm.childDOB.length; j++) {
            //     console.log(vm.childDOB[j], $rootScope.travelTakaful.FamilyInfo[i].MemAge);
            // }
            if(vm.childDOB) {
                for(var item in vm.childDOB) {
                    if(vm.childDOB[item] == false) {
                        vm.childAgeValid = false;
                    }
                }
            }


            console.log(vm.childDOB);
        }

        function calculateReturnDate() {
            if($rootScope.travelTakaful.FromDate && $rootScope.travelTakaful.TripDays) {
                var inputDate = $rootScope.travelTakaful.FromDate;
                var days = $rootScope.travelTakaful.TripDays;
                $rootScope.travelTakaful.ToDate = commonService.dateCount(inputDate, (days-1), 0, 0, false)
            }
            console.log(inputDate, days);
            
        }
        $rootScope.$watch('travelTakaful.FromDate', function (newVal, oldVal) {
            vm.calculateReturnDate();
        }, true);



        $scope.$on('$ionicView.beforeEnter', function(scopes, states){
            init();
            vm.showContent = false;
        });
        $scope.$on('$ionicView.enter', function(scopes, states){
            vm.departureMax = commonService.dateCount('', 0, 6, 0, true);
            calculateReturnDate();
            $timeout(function() {
                vm.showContent = true;
            }, 200);

            // if($rootScope.travelTakaful.FromDate && $rootScope.travelTakaful.TripDays){
            //     calculateReturnDate();
            // }
        });
        function setNationalityText() {
            // console.log('$rootScope.helperTakaful.Nationality', $rootScope.nationality[$rootScope.helperTakaful.Nationality]);
            $rootScope.travelTakaful.NationalityText = $rootScope.nationality[$rootScope.travelTakaful.Nationality];
        }
        function goBack() {
            window.history.back();
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();