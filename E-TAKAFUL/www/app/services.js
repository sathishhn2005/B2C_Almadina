(function() {
    'use strict';
    angular.module('etakaful').factory('commonService', commonService);
    commonService.$inject = ['$http', '$q', '$rootScope', '$translate', '$cordovaInAppBrowser', '$ionicPopup', '$state', '$ionicPopover', '$ionicHistory', '$filter', '$timeout', 'ionicDatePicker'];

    function commonService($http, $q, $rootScope, $translate, $cordovaInAppBrowser, $ionicPopup, $state, $ionicPopover, $ionicHistory, $filter, $timeout, ionicDatePicker) {
        var service = {
            init: init,
            getAge: getAge,
            getCurrentDate: getCurrentDate,
            getPdf: getPdf,
            authenticateUser: authenticateUser,
            showOptions: showOptions,
            goTo: goTo,
            logout: logout,
            goBack: goBack,
            validateEmail: validateEmail,
            validatePhone: validatePhone,
            validateName: validateName,
            dateCount: dateCount,
            changeLanguage: changeLanguage,
            cmpVersions: cmpVersions,
            tooltip: tooltip,
            // setupDatePicker: setupDatePicker,
            callDatePicker: callDatePicker,
            isBeforeToday: isBeforeToday
        };
        
        var optionsPopup;
        var datePicker;

        init();
        function init() {
            console.log('init services');
            $rootScope.forms = {};
            $rootScope.forms.claim = {};
        }


        function isBeforeToday(inpDate) {
            return new Date(inpDate) < new Date();
        }
        // isBeforeToday('2019-10-07T23:59:00');
        // 2019-10-07T23:59:00
        // setupDatePicker();
        // function setupDatePicker() {
        //     datePicker = {
        //         callback: function (val) {  //Mandatory
        //             console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        //         }
        //     };
        // }

        function callDatePicker(name, from, to, complexFormat) {
            console.log(name, from, to);
            //complexFormat - to handle number in object name - in travel save

            var splitName = name.split('.');
            var datePicker = {
                callback: function (val) {  //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    if (splitName.length === 1) {
                        $rootScope[splitName[0]] = new Date(val);
                    } else if (splitName.length === 2) {
                        $rootScope[splitName[0]][splitName[1]] = new Date(val);
                    } else if (splitName.length === 3) {
                        $rootScope[splitName[0]][splitName[1]][splitName[2]] = new Date(val);
                    } else if (splitName.length === 4) {
                      $rootScope[splitName[0]][splitName[1]][splitName[2]][splitName[3]] = new Date(val);
                    } else if (splitName.length === 5) {
                      $rootScope[splitName[0]][splitName[1]][splitName[2]][splitName[3]][splitName[4]] = new Date(val);
                    } else {
                        console.log('something wrong');
                    }
                    return new Date(val);
                    // console.log($rootScope[name], '$rootScope.travelTakaful.DOB', $rootScope.travelTakaful.DOB);
                }
            };
            var selectedDate;
            if (complexFormat) {
                console.log('$rootScope.'+complexFormat);
                selectedDate = eval('$rootScope.' + complexFormat);
            } else {
                selectedDate = eval('$rootScope.' + name);
            }

            if (selectedDate) {
                datePicker.inputDate = selectedDate;
            } else {
                if (to) {
                    datePicker.inputDate = new Date(to);
                } else if(from) {
                    datePicker.inputDate = new Date(from);
                } else {
                    datePicker.inputDate = new Date();
                }
            }
            if(from) {
                datePicker.from = new Date(from);
            }
            if(to) {
                datePicker.to = new Date(to);
            }
            console.log(datePicker);
            ionicDatePicker.openDatePicker(datePicker);
            // console.log(ionicDatePicker.openDatePicker(datePicker))
        }
        function tooltip(string, type) {
            type = (typeof type !== 'undefined') ? type : '';
            var template;
            var title = $translate.instant(string);
            if(type === 'image') {
                title = '';
                template = '<img src="' + string + '"/>';
            }
            var NamePopup = $ionicPopup.show({
              title: title,
              template: template,
              cssClass: 'custom-tooltip',
              buttons: [
                {
                    text: '<b>' + $translate.instant('Okay') + '</b>',
                    type: 'button-positive',
                }
              ]
            });
        }
        function goTo(page) {
            console.log(page);
            if ($rootScope.popover) {
              $rootScope.popover.hide();
            }
            $state.go(page);
        }
        function cmpVersions (a, b) {
            var i, diff;
            var regExStrip0 = /(\.0+)+$/;
            var segmentsA = a.replace(regExStrip0, '').split('.');
            var segmentsB = b.replace(regExStrip0, '').split('.');
            var l = Math.min(segmentsA.length, segmentsB.length);

            for (i = 0; i < l; i++) {
                diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
                if (diff) {
                    return diff;
                }
            }
            return segmentsA.length - segmentsB.length;
        }

        function logout() {
            $rootScope.user = {};
            window.localStorage.removeItem('civilid');
            window.localStorage.removeItem('displayName');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('mobile');
            window.localStorage.removeItem('password');
            
            if ($rootScope.popover) {
              $rootScope.popover.hide();
            }
            
            $ionicHistory.clearCache().then(function () {
                $ionicHistory.clearHistory();
                goTo('login');
                $rootScope.rtl = false;
                $rootScope.languageCode = 'en-US';

                $timeout(function() {
                    $translate.use('en-US');
                }, 100);
            })
            
            
        }
        function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log(re.test(email));
            return re.test(email);
        }
        
        function validatePhone() {
            return true;
        }
        function validateName(name) {
            var re = /^(?:[-A-Z]+\.? )+[-A-Z]+$/i;
            console.log(re.test(name));
            return re.test(name);
        }

        function showOptions() {
            $rootScope.popupClass = true;
            $rootScope.popover.show();
        }

        $rootScope.$on('popover.hidden', function () { 
          $rootScope.popupClass = false;
        });

        $ionicPopover.fromTemplateUrl('app/common/options.html', {
            scope: $rootScope
        }).then(function (popover) {
            $rootScope.popover = popover;
        });

        function authenticateUser(user) {
            if(!user || !user.user_email) {
                $ionicPopup.alert({
                    cssClass: 'session-out',
                    title: $translate.instant("Session Timed Out"),
                    template: $translate.instant("Please login again")
                });
                $ionicHistory.clearCache().then(function () {
                    $ionicHistory.clearHistory();
                    goTo('login');
                });
            } else {
                return true;
            }
        }

        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            today = mm+'/'+dd+'/'+yyyy;
            return today;
        }

        function dateCount(date, days, months, years, formatted) {
            days = (typeof days !== 'undefined') ? days : 0;
            months = (typeof months !== 'undefined') ? months : 0;
            years = (typeof years !== 'undefined') ? years : 0;

            days = parseInt(days);
            months = parseInt(months);
            years = parseInt(years);
            console.log(date, days, months, years, formatted);
            var d = new Date();
            if(date) {
                d = new Date(date);
            } 

            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();

            console.log((year + years), (month + months), (day + days));
            var newDate = new Date((year + years), (month + months), (day + days));
            
            console.log(newDate);

            if(formatted) {
                return $filter('date')(newDate, "yyyy-MM-dd");
            } else {
                return newDate;
            }

            
        }
        function changeLanguage() {
            // console.log('change', $translate.use());
            if($translate.use() == 'ar') {
                $rootScope.rtl = false;
                $rootScope.languageCode = 'en-US';
                $timeout(function() {
                    $translate.use('en-US');
                }, 100);
            } else {
                $rootScope.rtl = true;
                $rootScope.languageCode = 'ar';
                $timeout(function() {
                    $translate.use('ar');
                }, 100);
            }   
        }

        function getPdf(url) {
            if(url) {
                try {
                    var uri = url;
                    cordova.InAppBrowser.open(uri, '_system');
                } catch(e) {
                    window.open(uri, '_blank');
                }
            }

        }
        function goBack() {
            console.log('called back in service');
            $ionicHistory.goBack();
        }

        return service;   
    }
})();