(function() {
    'use strict';
    angular.module('app.routes').controller('motorSaveResponseCtrl', motorSaveResponseCtrl);
    motorSaveResponseCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$timeout', '$sce', '$translate'];

    function motorSaveResponseCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $timeout, $sce, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            makePayment: makePayment,
            formError: '',
            ifArray: ifArray,
            goBack: goBack,
            preloader: false,
            actionDisabled: false
        });
        
        function goTo(state) {
            $state.go(state);
        }


        if(!$rootScope.motorTakaful) {
            $rootScope.motorTakaful = {}
        }
        $rootScope.motorTakaful.declaration1 = false;
        $rootScope.motorTakaful.declaration2 = false;
        $rootScope.motorTakaful.declaration3 = false;

        function ifArray(item) {
            return Array.isArray(item);
        }

        function makePayment(){
            if (!$rootScope.motorTakaful.paymentMode) {
              vm.formError = $translate.instant("Select Payment Mode");
              return;
            }
            console.log($rootScope.motorTakaful.motorSaveData);

            // console.log($rootScope.motorTakaful.motorSaveData['Policy Details']['Reference No']);
            vm.formError = '';
            if ($rootScope.motorTakaful.declaration1 && $rootScope.motorTakaful.declaration2 && $rootScope.motorTakaful.declaration3) {
                var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "QuotNo": $rootScope.motorTakaful['Reference No'],
                        "PaymentMode": $rootScope.motorTakaful.paymentMode
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
                    console.log('Error at helper calculate premium');
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
                    $rootScope.motorTakaful.policyData = response.data.Output;
                    vm.goTo('motor-policy-generate');
                } else {
                    vm.formError = response.data.Output.message;
                }
                processingFinished();
            })
            .catch(function(error) {
                console.log('Error at travel calculate premium');
                processingFinished();
            });
        }

        // function checkPayment(data) {
        //     ApiServices.paymentCheck(data)
        //     .then(function(response) {
        //         console.log(response);
        //         if(response.data && response.data.Output.status == 'True'){
        //             $rootScope.motorTakaful.policyData = response.data.Output.Data;
        //             vm.goTo('motor-policy-generate');
        //         } else {
        //             vm.formError = 'Paayment Failed';
        //         }
        //     })
        //     .catch(function(error) {
        //         console.log('Error at travel calculate premium');
        //         vm.formError = 'Payment Failed';
        //         vm.preloader = false;
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
        // function getPolicyDetails(data) {
        //     ApiServices.generatePolicy(data).then(function(response){
        //         if(response.data && response.data.Output.status == 'True'){
        //             $rootScope.motorTakaful.policyData = response.data.Output.Data;
        //             vm.goTo('motor-policy-generate');
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


        function goBack() {
            window.history.back();
        }
        console.log($rootScope.motorTakaful);

    }
})();