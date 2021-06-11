(function() {
    'use strict';
    angular.module('app.routes').controller('helperDeclarationCtrl', helperDeclarationCtrl);
    helperDeclarationCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate'];

    function helperDeclarationCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            helperTakafulSponsor: helperTakafulSponsor,
            goBack: goBack,
            formError: '',
            actionDisabled: false
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        if(!$rootScope.helperTakaful) {
            $rootScope.helperTakaful = {}
        }

        
        function init() {

        }

        function helperTakafulSponsor() {
            console.log($rootScope.forms.helperTakaful.declarationForm);

            if($rootScope.helperTakaful && $rootScope.forms.helperTakaful.declarationForm.$valid) {
                var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "Guest": $rootScope.user.guest,
                        "Email": $rootScope.helperTakaful.Email,
                        "AssurTitle": $rootScope.helperTakaful.AssurTitle,
                        "AssurName": $rootScope.helperTakaful.AssurName,
                        "Occupation": $rootScope.helperTakaful.Occupation,
                        "DOB": $filter('date')($rootScope.helperTakaful.DOB, "MM/dd/yyyy"),
                        "Age": $rootScope.helperTakaful.Age,
                        "Gender": $rootScope.helperTakaful.Gender,
                        "Mobile": $rootScope.helperTakaful.Mobile,
                        "FromDate": $filter('date')($rootScope.helperTakaful.FromDate, "MM/dd/yyyy"),
                        "ToDate": $filter('date')($rootScope.helperTakaful.ToDate, "MM/dd/yyyy"),
                        "NoYears": $rootScope.helperTakaful.NoYears,
                        "CivilID": $rootScope.helperTakaful.CivilID,
                        "Nationality": $rootScope.helperTakaful.Nationality,
                        "PassportNo": $rootScope.helperTakaful.PassportNo,
                        "SpoTitle": $rootScope.helperTakaful.SpoTitle,
                        "SpoName": $rootScope.helperTakaful.SpoName,
                        "SpoGender": $rootScope.helperTakaful.SpoGender,
                        "SpoCivilID": $rootScope.helperTakaful.Sponsorcivilid,
                        "SpoEmail": $rootScope.helperTakaful.SpoEmail,
                        "SpoMobile": $rootScope.helperTakaful.SpoMobile,
                        "SpoPostalCode": $rootScope.helperTakaful.SpoPostalCode,
                        "SpoPostBox": $rootScope.helperTakaful.SpoPostBox,
                        "SpoCity": $rootScope.helperTakaful.SpoCity,
                        "SpoNationality": $rootScope.helperTakaful.SpoNationality,
                        "NationalityText": $rootScope.helperTakaful.NationalityText,
                        "SpoNationalityText": $rootScope.helperTakaful.SpoNationalityText
                    }
                }

                // $filter('date')($rootScope.helperTakaful.DOB, "MM/dd/yyyy"),

                vm.formError = '';
                vm.preloader = true;
                vm.actionDisabled = true;
                ApiServices.saveHelperDetails(JSON.stringify(data)).then(function(response) {
                    console.log(response);
                    vm.preloader = false;
                    if(response.data && response.data.Output.status == 'True'){
                        $rootScope.helperTakaful.saveData = response.data.Output.Data;
                        $rootScope.helperTakaful['Reference No'] = response.data.Output['Reference No'];
                        vm.goTo('helper-summary');
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    vm.actionDisabled = false;
                }).catch(function(error) {
                    console.log(error);
                    vm.preloader = false;
                    vm.actionDisabled = false;
                    vm.formError = '';
                    console.log('Error at helper calculate premium');
                });


            } else {
                vm.formError = $translate.instant("helper declaration");
            }
        }
        function goBack() {
            window.history.back();
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();