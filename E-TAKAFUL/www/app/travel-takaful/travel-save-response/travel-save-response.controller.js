(function() {
    'use strict';
    angular.module('app.routes').controller('travelSaveResponseCtrl', travelSaveResponseCtrl);
    travelSaveResponseCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', '$sce', '$translate'];

    function travelSaveResponseCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, $sce, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            makePayment: makePayment,
            formError: '',
            ifArray: ifArray,
            goBack: goBack,
            preloader: false,
            actionDisabled: false,
            url: ''
        });
        
        function goTo(state) {
            $state.go(state);
        }

        if(!$rootScope.travelTakaful) {
            $rootScope.travelTakaful = {}
        }
        $rootScope.travelTakaful.declaration1 = false;
        $rootScope.travelTakaful.declaration2 = false;
        $rootScope.travelTakaful.declaration3 = false;
        $rootScope.travelTakaful.declaration4 = false;

        function ifArray(item) {
            return Array.isArray(item);
        }

        function makePayment(){
            console.log($rootScope.travelTakaful.paymentMode);
            if (!$rootScope.travelTakaful.paymentMode){
                vm.formError = $translate.instant("Select Payment Mode");
                return;
            }
            // console.log($rootScope.travelTakaful.travelSaveData['Policy Details']['Reference No']);
            vm.formError = '';
            if($rootScope.travelTakaful.declaration1 && $rootScope.travelTakaful.declaration2 && $rootScope.travelTakaful.declaration3 && $rootScope.travelTakaful.declaration4) {
                var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "QuotNo": $rootScope.travelTakaful['Reference No'],
                        "PaymentMode": $rootScope.travelTakaful.paymentMode
                    }
                }
                processing();
                ApiServices.payment(data)
                .then(function(response) {
                    console.log(response);
                    if(response.data.Output.status == "True") {
                        var url = $sce.trustAsResourceUrl(response.data.Output.response);
                        var ref = window.open(url, '_blank','location=no');
                         ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf("/mobile-payment/") > -1) {
                                ref.close();
                                checkPayment(data);
                            }
                        });
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
                })
                .catch(function(error) {
                    console.log('Error at travel calculate premium');
                    processingFinished();
                });

            } else {
                vm.formError = $translate.instant("Accept all Declarations");
            }
        }

        function checkPayment(data) {
            processing();
            ApiServices.paymentCheck(data)
            .then(function(response) {
                console.log(response);
                if(response.data && response.data.Output.status == 'True'){
                    $rootScope.travelTakaful.policyData = response.data.Output;
                    vm.goTo('travel-policy-generate');
                } else {
                    vm.formError = response.data.Output.message;
                }
                processingFinished();
            })
            .catch(function(error) {
                console.log('Error at travel calculate premium');
                // vm.formError = 'Payment Failed';
                processingFinished();
            });
        }



        // function getPolicyDetails(data) {
        //     ApiServices.generatePolicy(data).then(function(response){
        //         if(response.data && response.data.Output.status == 'True'){
        //             $rootScope.travelTakaful.policyData = response.data.Output.Data;
        //             vm.goTo('travel-policy-generate');
        //         } else {
        //             vm.formError = 'Something Went Wrong';
        //         }
        //         vm.preloader = false;
        //         vm.actionDisabled = false;
        //     }).catch(function(error){
        //         vm.preloader = false;
        //         vm.actionDisabled = false;
        //         console.log('error in policy generate');
        //     });
        // }
        function processing() {
            vm.formError = '';
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
        

    }
})();