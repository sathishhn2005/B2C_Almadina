(function() {
    'use strict';
    angular.module('app.routes').controller('helperCalculateCtrl', helperCalculateCtrl);
    helperCalculateCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService', '$translate'];

    function helperCalculateCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            helperTakafulCalculate: helperTakafulCalculate,
            premiumAmount: '',
            preloader: false,
            formError: '',
            calculateAge: calculateAge,
            goBack: goBack,
            actionDisabled: false
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            console.log(scopes, states);
            init();
            // calculateToDate();
        });


        function init() {
            console.log($rootScope.helperTakaful);
            if(!$rootScope.helperTakaful) {
                $rootScope.helperTakaful = {};
            }
            if(!$rootScope.helperTakaful.Occupation) {
                $rootScope.helperTakaful.Occupation = '';
            }
            if(!$rootScope.helperTakaful.Gender) {
                $rootScope.helperTakaful.Gender = '';
            }
            if(!$rootScope.helperTakaful.Email) {
                $rootScope.helperTakaful.Email = '';
            }
            if(!$rootScope.helperTakaful.Mobile) {
                $rootScope.helperTakaful.Mobile = '';
            }
            
            // if($rootScope.helperTakaful) {
            //     if(!$rootScope.helperTakaful.FromDate) {
            //         $rootScope.helperTakaful.FromDate = new Date();
            //     }
            // }
            if( window.localStorage.getItem('civilid') ) {
                $rootScope.helperTakaful.Sponsorcivilid = parseInt( window.localStorage.getItem('civilid') );
            }

            if(window.localStorage.getItem('email')) {
                $rootScope.helperTakaful.SpoEmail = window.localStorage.getItem('email');
                $rootScope.helperTakaful.Email = window.localStorage.getItem('email');
            }

            if(window.localStorage.getItem('mobile')) {
                $rootScope.helperTakaful.SpoMobile = parseInt(window.localStorage.getItem('mobile'));
            }
            

        }
        setDOBRange();
        function setDOBRange() {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            if($rootScope.helperTakaful) {
                $rootScope.helperTakaful.minDOB = $filter('date')(new Date((year - 50), month, day), "yyyy-MM-dd");
                $rootScope.helperTakaful.maxDOB = $filter('date')(new Date((year - 18), month, day), "yyyy-MM-dd");
            }
        }

        function helperTakafulCalculate(event) {
            event.preventDefault();
            console.log($rootScope.helperTakaful);
            vm.preloader = true;
            // vm.premiumAmount = 120;
            if($rootScope.helperTakaful && $rootScope.forms.helperTakaful.calculateForm && $rootScope.forms.helperTakaful.calculateForm.$valid) {
                var data= {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "Guest": $rootScope.user.guest,
                        // "Civilid":$rootScope.helperTakaful.Civilid,
                        "Email": $rootScope.helperTakaful.Email,
                        "Occupation":$rootScope.helperTakaful.Occupation,
                        "DOB":$filter('date')($rootScope.helperTakaful.DOB, "MM/dd/yyyy"),
                        "Gender":$rootScope.helperTakaful.Gender,
                        "Age":$rootScope.helperTakaful.Age,
                        "SpoMobile":$rootScope.helperTakaful.SpoMobile,
                        "SpoEmail": $rootScope.helperTakaful.SpoEmail
                        // "FromDate":$filter('date')($rootScope.helperTakaful.FromDate, "MM/dd/yyyy"),
                        // "ToDate":$filter('date')($rootScope.helperTakaful.ToDate, "MM/dd/yyyy")
                    }
                }

                vm.formError = '';  
                vm.actionDisabled = true;      
                ApiServices.getHelperDetails(JSON.stringify(data))
                .then(function(response) {
                    console.log(response);
                    vm.preloader = false;
                    vm.actionDisabled = false;
                    if(response.data && response.data.Output.status == 'True'){
                        $rootScope.helperTakaful.calculateData = response.data.Output.Data;
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
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }
        function calculateAge() {
            if($rootScope.helperTakaful.DOB) {
                $rootScope.helperTakaful.Age = commonService.getAge($rootScope.helperTakaful.DOB);
            }
            console.log($rootScope.helperTakaful);
        }
        $rootScope.$watch('helperTakaful.DOB', function (newVal, oldVal) {
            $rootScope.helperTakaful.Age = commonService.getAge($rootScope.helperTakaful.DOB);
        }, true);

        function goTo(state) {
            $state.go(state);
        }
        function goBack() {
            window.history.back();
        }
    }
})();