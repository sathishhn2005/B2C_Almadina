(function() {
    'use strict';
    angular.module('app.routes').controller('claimIntimateResponseCtrl', claimIntimateResponseCtrl);
    claimIntimateResponseCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout', '$sce'];

    function claimIntimateResponseCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout, $sce) {
        var vm = angular.extend(this, {
            goTo: goTo,
            actionDisabled: false,
            makePayment: makePayment,
            goBack: goBack
        });


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        function init() {   

        }

        function makePayment() {
            if (!$rootScope.claim.claimdeclaration1 || !$rootScope.claim.claimdeclaration2 || !$rootScope.claim.claimdeclaration3) {
                vm.formError = $translate.instant("Accept all Declarations");
                return;
            }
            if (!$rootScope.claim.paymentMode) {
                vm.formError = $translate.instant("Select Payment Mode");
                return;
            }
            vm.formError = '';
            if (!$rootScope.claim.CivilID) {
                $rootScope.claim.CivilID = parseInt(window.localStorage.getItem('civilid'));
            }
            var data = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "refno": $rootScope.claim.intData.Data.IntRefNo, 
                    "CivilId": $rootScope.claim.CivilID,
                    "PaymentMode": $rootScope.claim.paymentMode
                }
            }
            var data1 = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "QuotNo": $rootScope.claim.intData.Data.IntRefNo,
                    "PaymentMode": $rootScope.claim.paymentMode
                }
            }

            processing();
            ApiServices.intimatepay(data)
                .then(function (response) {
                    console.log(response);
                    if (response.data.Output.status == "True") {
                        var url = $sce.trustAsResourceUrl(response.data.Output.response);
                        var ref = window.open(url, '_blank', 'location=no');
                        ref.addEventListener('loadstart', function (event) {
                            if (event.url.indexOf("/mobile-payment/") > -1) {
                                ref.close();
                                checkPayment(data1);
                            }
                        });
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
                })
                .catch(function (error) {
                    console.log('Error at');
                    processingFinished();
                });
        }

        function checkPayment(data1) {
            processing();
            ApiServices.paymentCheck(data1)
                .then(function (response) {
                    console.log(response);
                    if (response.data && response.data.Output.status == 'True') {
                        $rootScope.claim.policyData = response.data.Output;
                        vm.goTo('claim-policy-generate');
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
                })
                .catch(function (error) {
                    console.log('Error at travel calculate premium');
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


        function goBack() {
            window.history.back();
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();