(function() {
    'use strict';
    angular.module('app.routes').controller('renewCtrl', renewCtrl);
    renewCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout', '$sce'];

    function renewCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout, $sce) {
        var vm = angular.extend(this, {
            goTo: goTo,    
            ifArray: ifArray,
            goBack: goBack,
            makePayment: makePayment
        });

        function goBack() {
            window.history.back();
        }

        function ifArray(item) {
            return Array.isArray(item);
        }

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        $scope.$on('$ionicView.leave', function(scopes, states){
            leave();
        });
        function leave() {
            $rootScope.renew = {};
        }
        // var details = {
        //                 "jsonval":
        //                 {
        //                     "UserId":"Bala",
        //                     "ClassCode":"25",
        //                     "PolNo":"P/004/01/17/2501/00200"
        //                 }
        //             };

        var details = {
            "jsonval":
            {
                "UserId": "MobileApp",
                "ClassCode": $rootScope.renew.ClassCode,
                "PolNo": $rootScope.renew.PolNo
            }
        };



        function init() {
            if(!$rootScope.renew) {
                $rootScope.renew = {}
            }
            processing();
            ApiServices.getRenewalInfo(details)
            .then(function(response) {
                    console.log(response);
                    //response.data.Output
                    if(response.data.Output.status == "True"){
                        $rootScope.renew.Data = response.data.Output;
                    } else {
                        vm.formError = response.data.Output.message;
                    }
                    processingFinished();
            })
            .catch(function(error) {
                processingFinished();
                console.log('Error at helper calculate premium');
            });

        }

        function makePayment(){
            if (!$rootScope.renew.paymentMode) {
              vm.formError = $translate.instant("Select Payment Mode");
              return;
            }
            vm.formError = '';
            // if($rootScope.motorTakaful.declaration1 && $rootScope.motorTakaful.declaration2) {
            // var data = {
            //     "jsonval":
            //     {
            //         "UserId":"Bala",
            //         "ClassCode":"25",
            //         "PolNo":"P/004/01/17/2501/00951",
            //         "CivilId":"1234"
            //     }
            // }
            var data = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "ClassCode": $rootScope.renew.ClassCode,
                    "PolNo": $rootScope.renew.PolNo,
                    "CivilId": $rootScope.policy.CivilID,
                    "PaymentMode": $rootScope.renew.paymentMode
                }
            }
            var data1 = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "QuotNo": $rootScope.renew.PolNo,
                    "PaymentMode": $rootScope.renew.paymentMode,
                    "CivilId": $rootScope.policy.CivilID,
                }                
            }
            
            
            processing();
            ApiServices.renew(data)
            .then(function(response) {
                console.log(response);
                if(response.data.Output.status == "True") {
                    var url = $sce.trustAsResourceUrl(response.data.Output.response);
                    var ref = window.open(url, '_blank','location=no');
                     ref.addEventListener('loadstart', function(event) {
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
            .catch(function(error) {
                console.log('Error at helper calculate premium');
                processingFinished();
            });
                
            // } else {
            //     vm.formError = response.data.Output.message;
            // }
        }

        function checkPayment(data) {
            processing();
            ApiServices.paymentCheck(data)
            .then(function(response) {
                console.log(response);
                if(response.data && response.data.Output.status == 'True'){
                    $rootScope.renew.policyData = response.data.Output;
                    vm.goTo('renew-policy-generate');
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
        function processing() {
            vm.formError = '';
            vm.preloader = true;
            vm.actionDisabled = true;
        }
        function processingFinished() {
            vm.preloader = false;
            vm.actionDisabled = false;
        }
        function goTo(state) {
            $state.go(state);
        }
    }
})();