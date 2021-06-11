(function() {
    'use strict';
    angular.module('app.routes').directive('fileread', fileread);
    fileread.$inject = ['ApiServices', '$timeout', 'commonService', '$state', '$ionicScrollDelegate', '$rootScope'];

    function fileread(ApiServices, $timeout, commonService, $state, $ionicScrollDelegate, $rootScope) {
        var search = {
            // restrict: 'E',
            // templateUrl: 'app/common/modal-search.html',
            scope: {
                fileread: "="
            },
            link: linkFunction
            
        };
        function linkFunction(scope, element, attrs) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                if (changeEvent.target.files[0]){
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
                // console.log(changeEvent.target.files[0].name)
            });
        }

        return search;   
    }
})();