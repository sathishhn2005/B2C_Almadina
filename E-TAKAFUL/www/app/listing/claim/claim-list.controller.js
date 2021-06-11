(function() {
    'use strict';
    angular.module('app.routes').controller('claimListCtrl', claimListCtrl);
    claimListCtrl.$inject = ['$state', '$rootScope', 'ApiServices', '$filter', '$ionicModal', '$scope', '$translate', '$timeout', '$ionicScrollDelegate'];

    function claimListCtrl($state, $rootScope, ApiServices, $filter, $ionicModal, $scope, $translate, $timeout, $ionicScrollDelegate) {
        var vm = angular.extend(this, {
            goTo: goTo,
            viewPolicy: viewPolicy,
            viewStatus: viewStatus,
            renewPolicy: renewPolicy,
            goBack: goBack,
            dateFormat: dateFormat,
            actionDisabled: false,
            claimStatus: [],
            dates: []
            
        });

        function goBack() {
            window.history.back();
        }

            function getClaimStatus(index) {
                var details = {
                    "jsonval":
                    {
                        "UserId": "MobileApp",
                        "ClassCode": $rootScope.claim.List[index]["CLASSCODE"],
                        "ClmNo": $rootScope.claim.List[index]["CLAIMNO"],
                    }
                }

                ApiServices.getClaimStatus(details).then(function(response) {
                    console.log(response.data.Output.Data.ClaimStatus);
                    vm.claimStatus[index] = response.data.Output.Data.ClaimStatus;
                }).catch(function(error) {

                });
            }

        $scope.$on('$ionicView.enter', function(scopes, states){
            init();
        });
        function init() {
            $ionicScrollDelegate.scrollTop();
            if(!$rootScope.claim) {
                $rootScope.claim = {}
                $rootScope.claim.Detail = {}
            }    

            if( window.localStorage.getItem('email') ) {
                $rootScope.claim.Email = window.localStorage.getItem('email');
            }
            if( window.localStorage.getItem('civilid') ) {
                $rootScope.claim.CivilID = parseInt( window.localStorage.getItem('civilid') );
            }
            if( window.localStorage.getItem('mobile') ) {
                $rootScope.claim.MobileNo = parseInt( window.localStorage.getItem('mobile') );
            }
            var details = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "CivilId": $rootScope.claim.CivilID,
                    "MobileNo": $rootScope.claim.MobileNo
                }
            };
            processing();
            $rootScope.claim.List = [];
            ApiServices.getClaimList(details)
            .then(function(response) {
                    console.log(response);
                    
                    if(response.data.Output && response.data.Output.Data){
                        $rootScope.claim.List = response.data.Output.Data.ClaimInfo;
                        for (var i = 0; i < $rootScope.claim.List.length; i++) {
                            vm.dates[i] = {};
                            vm.dates[i]['LOSSDATE'] = vm.dateFormat($rootScope.claim.List[i]['LOSSDATE']);
                            vm.dates[i]['INTIMATIONDATE'] = vm.dateFormat($rootScope.claim.List[i]['INTIMATIONDATE']);
                        }
                    } else {
                        console.log('Something Went Wrong');
                    }
                    processingFinished();
            })
            .catch(function(error) {
                processingFinished();
                console.log('Error at get Claim List');
            });

        }
        function viewPolicy(index) {
            if($scope.selectedClaim == index) {
                $scope.selectedClaim = -1;
                $scope.selectedStatus = -1;
            } else {
                $scope.selectedClaim = -1;
                $scope.selectedStatus = -1;
                getPolicyDetails(index);
                $timeout(function(){
                    $scope.selectedClaim = index;
                }, 250);
            }
        }
        function viewStatus(index) {
            if($scope.selectedStatus == index) {
                $scope.selectedStatus = -1;
                $scope.selectedClaim = -1;
            } else {
                $scope.selectedStatus = -1;
                $scope.selectedClaim = -1;
                getClaimStatus(index);
                $timeout(function(){
                    $scope.selectedStatus = index;
                }, 250);
            }
        }
        function getPolicyDetails(index) {
            var data = {
                "jsonval":
                {
                    "UserId": "MobileApp",
                    "ClassCode": $rootScope.claim.List[index]["CLASSCODE"],
                    "ClmNo": $rootScope.claim.List[index]["CLAIMNO"],
                }
            }
            if($rootScope.claim.Detail && !$rootScope.claim.Detail[index]) {
                processing();
                ApiServices.getClaimInfo(data)
                .then(function(response) {
                        console.log(response);
                        
                        if(response.data.Output.status == "True"){
                            $rootScope.claim.Detail[index] = response.data.Output.Data.ClaimInfo[0];
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
        function renewPolicy(index) {

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
            dateNew.month = monthName.substring(0, 3)
            dateNew.day = day;
            dateNew.year = year;
        
        

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