(function() {
    'use strict';
    angular.module('app.routes').controller('policyListCtrl', policyListCtrl);
    policyListCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout', '$ionicScrollDelegate'];

    function policyListCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout, $ionicScrollDelegate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            viewPolicy: viewPolicy,
            renewPolicy: renewPolicy,
            goBack: goBack,
            dateFormat: dateFormat,
            intimateClaim: intimateClaim,
            actionDisabled: false,
            dates: []
        });

        function goBack() {
            window.history.back();
        }


        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });

        // var details = {
        //     "jsonval":
        //     {
        //         "UserId":"Bala",
        //         "CivilId":"12694342",
        //         "MobileNo":"96530010"
        //     }
        // };


        function init() {
            $ionicScrollDelegate.scrollTop();

            if(!$rootScope.policy) {
                $rootScope.policy = {}
                $rootScope.policy.Detail = {}
            }    

            if( window.localStorage.getItem('email') ) {
                $rootScope.policy.Email = window.localStorage.getItem('email');
            }
            if( window.localStorage.getItem('civilid') ) {
                $rootScope.policy.CivilID = parseInt( window.localStorage.getItem('civilid') );
            }
            if( window.localStorage.getItem('mobile') ) {
                $rootScope.policy.MobileNo = parseInt( window.localStorage.getItem('mobile') );
            }
            var details = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "CivilId": $rootScope.policy.CivilID,
                    "MobileNo": $rootScope.policy.MobileNo
                }
            };
            processing();
            $rootScope.policy.List = [];
            ApiServices.getPolicyList(details)
            .then(function(response) {
                    console.log(response);
                    
                    if (response.data && response.data.Output && response.data.Output.Data) {
                        $rootScope.policy.List = response.data.Output.Data['Policy Details'];
                        for (var i = 0; i < $rootScope.policy.List.length; i++) {
                            vm.dates[i] = {};
                            vm.dates[i]['start_date'] = vm.dateFormat($rootScope.policy.List[i]['POLICYSTARTDATE']);
                            vm.dates[i]['end_date'] = vm.dateFormat($rootScope.policy.List[i]['POLICYENDDATE']);
                        }
                    } else {
                        console.log('Something Went Wrong');
                    }
                    processingFinished();
            })
            .catch(function(error) {
                processingFinished();
                console.log('Error at helper calculate premium');
            });

        }
        function viewPolicy(index) {

            if($scope.selectedPolicy == index) {
                $scope.selectedPolicy = -1;
            } else {
                $scope.selectedPolicy = -1;
                getPolicyDetails(index);
                $timeout(function(){
                    $scope.selectedPolicy = index;
                }, 250);
            }
        }
        function getPolicyDetails(index) {
            var data = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "ClassCode":  $rootScope.policy.List[index]["CLASSCODE"],
                    "PolNo": $rootScope.policy.List[index]["POLICYNO"]
                }
            }
            if($rootScope.policy.Detail && !$rootScope.policy.Detail[index]) {
                processing();
                ApiServices.getPolicyInfo(data)
                .then(function(response) {
                        console.log(response);
                        
                        if(response.data.Output.status == "True"){
                            $rootScope.policy.Detail[index] = response.data.Output.Data.PolicyInfo[0];
                        } else {
                            console.log('Something Went Wrong');
                        }
                        processingFinished();
                })
                .catch(function(error) {
                    console.log('Error at helper calculate premium');
                    processingFinished();
                });
            }
        }
        function intimateClaim(index) {
            $rootScope.claim = {}
            $rootScope.claim.ClassCode = $rootScope.policy.List[index]['CLASSCODE'];
            $rootScope.claim.PolNo = $rootScope.policy.List[index]['POLICYNO'];

            $state.go('claim');
        }
        function renewPolicy(index) {
            // motor-summary
            $rootScope.renew = {}
            $rootScope.renew.ClassCode = $rootScope.policy.List[index]['CLASSCODE'];
            $rootScope.renew.PolNo = $rootScope.policy.List[index]['POLICYNO'];

            $state.go('renew');
        }
        function dateFormat(date) {
            date = date.substring(0, 10);
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            
            var locale = "en-us";
            var monthName = d.toLocaleString(locale, {
              month: "long"
            });
            var dateNew = {};
            dateNew.month = monthName.substring(0, 3);
            dateNew.day = day;
            dateNew.year = year;
        
        
            // console.log(dateNew);

            return dateNew;


        }
        function goTo(state) {
            $state.go(state);
        }
        function processing() {
            vm.preloader = true;
            vm.actionDisabled = true;
        }
        function processingFinished() {
            vm.preloader = false;
            vm.actionDisabled = false;
        }
    }
})();