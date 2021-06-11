(function() {
    'use strict';
    angular.module('app.routes').controller('helperSponsorCtrl', helperSponsorCtrl);
    helperSponsorCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', 'commonService', '$translate'];

    function helperSponsorCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, commonService, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            helperTakafulSponsor: helperTakafulSponsor,
            formError: '',
            calculateToDate: calculateToDate,
            calculateAge: calculateAge,
            goBack: goBack,
            setNationalityText: setNationalityText,
            maxPolicyDate: '',
            postalCode: '',
            setPostalCode: setPostalCode,
            validateMobile: validateMobile,
            validMobile: true
        });

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
            vm.maxPolicyDate = commonService.dateCount('', 0, 1, 0, true);
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
        });

        function setPostalCode() {
            if ($rootScope.helperTakaful.SpoPostalCode) {
                $rootScope.helperTakaful.SpoCity = vm.postalCode[$rootScope.helperTakaful.SpoPostalCode];
            }
        }


        if(!$rootScope.helperTakaful) {
            $rootScope.helperTakaful = {}
        }

        // $rootScope.helperTakaful.Civilid = "sdfsdf4334";
        // $rootScope.helperTakaful.Occupation = "Driver";
        // $rootScope.helperTakaful.DOB = new Date("3/11/1989");
        // $rootScope.helperTakaful.Gender = "Male";
        // $rootScope.helperTakaful.Age = "28";
        // $rootScope.helperTakaful.FromDate = new Date("1/28/2018");
        // $rootScope.helperTakaful.ToDate = new Date("2/17/2018");



        
        function init() {
            console.log($rootScope.helperTakaful);    
            if(!$rootScope.helperTakaful.NoYears) {
                $rootScope.helperTakaful.NoYears = 2;
            }
            if( window.localStorage.getItem('civilid') ) {
                $rootScope.helperTakaful.Sponsorcivilid = parseInt( window.localStorage.getItem('civilid') );
            }
            if(window.localStorage.getItem('displayName')) {
                $rootScope.helperTakaful.SpoName = window.localStorage.getItem('displayName');
            }
        }

        function validateMobile() {
            if ($rootScope.helperTakaful.Mobile) {
                if ($rootScope.helperTakaful.Mobile.toString().length < 8) {
                  vm.validMobile = false;
                } else {
                  vm.validMobile = true;                    
                }
            } else {
                vm.validMobile = true;
            }
        }

        function helperTakafulSponsor(event) {
            event.preventDefault();
            // console.log($rootScope.helperTakaful.Mobile, $rootScope.helperTakaful.Mobile.length);
            if (!vm.validMobile) {
                vm.validateMobile();
                vm.formError = $translate.instant('Enter Valid Details');
                return;
            } 

            console.log('passed mob valid');
            if($rootScope.helperTakaful && $rootScope.forms.helperTakaful.sponsorForm.$valid) {
                console.log('valid');
                vm.goTo('helper-declaration');
            } else {
                console.log('inValid');
                vm.formError = $translate.instant('Enter Valid Details');
            }
        }


        function goTo(state) {
            console.log($rootScope.helperTakaful);
            $state.go(state);
        }
        function calculateToDate() { //for helper taka, to date is  +2 years
            if($rootScope.helperTakaful.FromDate) {
                var years = 2;
                if($rootScope.helperTakaful.NoYears) {
                    years = $rootScope.helperTakaful.NoYears;
                }
                var currentDate = new Date($rootScope.helperTakaful.FromDate);
                var toDate = currentDate.setFullYear(currentDate.getFullYear() + years);
                // toDate = toDate.setDate(toDate.getDate()-1);
                toDate = new Date(toDate);
                toDate.setDate(toDate.getDate() - 1);
                $rootScope.helperTakaful.ToDate = new Date(toDate);
            }
            // if($rootScope.helperTakaful.FromDate && $rootScope.helperTakaful.NoYears) {
            //     var years = $rootScope.helperTakaful.NoYears;
            //     var currentDate = new Date($rootScope.helperTakaful.FromDate);
            //     var toDate = currentDate.setFullYear(currentDate.getFullYear() + years);
            //     toDate = toDate.setDate(toDate.getDate()-1);
            //     $rootScope.helperTakaful.ToDate = new Date(toDate);
            // }
        }
        function calculateAge() {
            if($rootScope.helperTakaful.DOB) {
                $rootScope.helperTakaful.Age = commonService.getAge($rootScope.helperTakaful.DOB);
            }
            console.log($rootScope.helperTakaful);
        }
        $rootScope.$watch('helperTakaful.DOB', function (newVal, oldVal) {
            vm.calculateAge();
        }, true);

        $rootScope.$watch('helperTakaful.FromDate', function (newVal, oldVal) {
            vm.calculateToDate();
        }, true);

        function setNationalityText(item, text) {
            console.log('$rootScope.helperTakaful.Nationality', $rootScope.nationality[$rootScope.helperTakaful.Nationality]);
            console.log(item, text);
            $rootScope.helperTakaful[text] = $rootScope.nationality[$rootScope.helperTakaful[item]];
            console.log(item, $rootScope.helperTakaful);
        }


        function goBack() {
            window.history.back();
        }
    }
})();