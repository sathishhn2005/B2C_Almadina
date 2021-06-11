(function() {
    'use strict';
    angular.module('app.routes').controller('helperSummaryCtrl', helperSummaryCtrl);
    helperSummaryCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$sce', '$translate'];

    function helperSummaryCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $sce, $translate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            ifArray: ifArray,
            makePayment: makePayment,
            goBack: goBack,
            preloader: false,
            actionDisabled: false,
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        
        function init() {

        }
        function ifArray(item) {
            return Array.isArray(item);
        }
        if(!$rootScope.helperTakaful) {
            $rootScope.helperTakaful = {}
        }

        function makePayment(){
            if (!$rootScope.helperTakaful.paymentMode) {
              vm.formError = $translate.instant("Select Payment Mode");
              return;
            }
            vm.formError = '';
            // console.log($rootScope.helperTakaful.saveData['Policy Details']['Reference No']);
            if($rootScope.helperTakaful.declaration1) {
                var data = {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "QuotNo": $rootScope.helperTakaful['Reference No'],
                        "PaymentMode": $rootScope.helperTakaful.paymentMode
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
                    $rootScope.helperTakaful.policyData = response.data.Output;
                    // getPolicyDetails(data);
                    vm.goTo('helper-policy-generate');
                } else {
                    vm.formError = response.data.Output.message;
                }
                // getPolicyDetails(data);
                processingFinished();
            })
            .catch(function(error) {
                console.log('Error at travel calculate premium');
                // vm.formError = 'Payment Failed';
                processingFinished();
            });
        }

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
        //             $rootScope.helperTakaful.policyData = response.data.Output.Data;
        //             vm.goTo('helper-policy-generate');
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

        function goTo(state) {
            $state.go(state);
        }
        function goBack() {
            window.history.back();
        }
    }
})();