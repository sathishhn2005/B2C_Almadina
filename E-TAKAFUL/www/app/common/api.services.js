(function() {
    'use strict';
    angular.module('etakaful').factory('ApiServices', ApiServices);
    ApiServices.$inject = ['$http', '$q', '$rootScope', 'EnvironmentConfig','$filter'];

    function ApiServices($http, $q, $rootScope, EnvironmentConfig, $filter) {

        var service = {
            serviceCheck : serviceCheck,
            getByURL : getByURL,
            deferCall: deferCall,
            registerUser: registerUser,
            loginUser: loginUser,
            getTravelDetails: getTravelDetails,
            saveTravelDetails: saveTravelDetails,
            getHelperDetails: getHelperDetails,
            saveHelperDetails: saveHelperDetails,
            generatePolicy: generatePolicy,
            getMotorDetails: getMotorDetails,
            getMotorFields: getMotorFields,
            saveMotorDetails: saveMotorDetails,
            payment: payment,
            paymentCheck: paymentCheck,
            mulkiyaMail: mulkiyaMail,
            getPolicyList: getPolicyList,
            getPolicyInfo: getPolicyInfo,
            getClaimList: getClaimList,
            getClaimInfo: getClaimInfo,
            getClaimIntimation: getClaimIntimation,
            getRenewalInfo: getRenewalInfo,
            renew: renew ,
            changeName: changeName,
            changeMobile: changeMobile,
            changeEmail: changeEmail,
            forgotPassword: forgotPassword,
            getBrochures: getBrochures,
            getClaimStatus: getClaimStatus,
            getLicenseInfo: getLicenseInfo,
            getVehicleInfo: getVehicleInfo,
            getDriversList: getDriversList,
            getLisenceVehicleInfo: getLisenceVehicleInfo,
            intimatepay: intimatepay
        };

        var defer = {
            getByURLDefer: $q.defer(),
            serviceCheckDefer: $q.defer(),
            registerUserDefer: $q.defer(),
            loginUserDefer: $q.defer(),
            getTravelDetailsDefer: $q.defer(),
            saveTravelDetailsDefer: $q.defer(),
            getHelperDetailsDefer: $q.defer(),
            saveHelperDetailsDefer: $q.defer(),
            generatePolicyDefer: $q.defer(),
            getMotorDetailsDefer: $q.defer(),
            getMotorFieldsDefer: $q.defer(),
            saveMotorDetailsDefer: $q.defer(),
            paymentDefer: $q.defer(),
            paymentCheckDefer: $q.defer(),
            mulkiyaMailDefer: $q.defer(),
            getPolicyListDefer: $q.defer(),
            getPolicyInfoDefer: $q.defer(),
            getClaimListDefer: $q.defer(),
            getClaimInfoDefer: $q.defer(),
            getClaimIntimationDefer: $q.defer(),
            getRenewalInfoDefer: $q.defer(),
            renewDefer: $q.defer(),
            changeNameDefer: $q.defer(),
            changeMobileDefer: $q.defer(),
            changeEmailDefer: $q.defer(),
            forgotPasswordDefer: $q.defer(),
            getBrochuresDefer: $q.defer(),
            getClaimStatusDefer: $q.defer(),
            getLicenseInfoDefer: $q.defer(),
            getVehicleInfoDefer: $q.defer(),
            getDriversListDefer: $q.defer(),
            intimatepayDefer: $q.defer(),
            getLisenceVehicleInfoDefer: $q.defer(),
        }

        function getLisenceVehicleInfo(details) {
            console.log(details);
            defer.getLisenceVehicleInfoDefer.resolve();
            defer.getLisenceVehicleInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getLisenceVehicleInfo/',
                timeout: defer.getLisenceVehicleInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function (response) {
                console.log(response);
                return response;
            }).catch(function (error) {
                console.log(error);
                return error;
            });
        }

        function intimatepay(details) {
            console.log(details);
            defer.intimatepayDefer.resolve();
            defer.intimatepayDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/intimatepay/',
                timeout: defer.intimatepayDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function (response) {
                console.log(response);
                return response;
            }).catch(function (error) {
                console.log(error);
                return error;
            });
        }

        function getDriversList(details) {
            defer.getDriversListDefer.resolve();
            defer.getDriversListDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getdriverslist/',
                timeout: defer.getDriversListDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
        }

        function getVehicleInfo(details) {
            defer.getVehicleInfoDefer.resolve();
            defer.getVehicleInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getvehicleinfo/',
                timeout: defer.getVehicleInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
        }
        function getLicenseInfo(details) {
            defer.getLicenseInfoDefer.resolve();
            defer.getLicenseInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getlicenseinfo/',
                timeout: defer.getLicenseInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
        }


        function getClaimStatus(details) {
            defer.getClaimStatusDefer.resolve();
            defer.getClaimStatusDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'policy/getclaimstatus/',
              timeout: defer.getClaimStatusDefer.promise,
              headers: {
                'Content-Type': "application/json"
              },
              data: details
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }
        
        function getBrochures() {
            defer.getBrochuresDefer.resolve();
            defer.getBrochuresDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'policy/getbrochure/',
              timeout: defer.getBrochuresDefer.promise,
              headers: {
                'Content-Type': "application/json"
              }
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }
        function changeName(details) {
            console.log(details);
            defer.changeNameDefer.resolve();
            defer.changeNameDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'user/changename/',
              timeout: defer.changeNameDefer.promise,
              headers: {
                'Content-Type': "application/json"
              },
              data: details
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }
        function changeMobile(details) {
            console.log(details);
            defer.changeMobileDefer.resolve();
            defer.changeMobileDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'user/changemobile/',
              timeout: defer.changeMobileDefer.promise,
              headers: {
                'Content-Type': "application/json"
              },
              data: details
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }
        function changeEmail(details) {
            console.log(details);
            defer.changeEmailDefer.resolve();
            defer.changeEmailDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'user/changeemail/',
              timeout: defer.changeEmailDefer.promise,
              headers: {
                'Content-Type': "application/json"
              },
              data: details
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }
        function forgotPassword(details) {
            console.log(details);
            defer.forgotPasswordDefer.resolve();
            defer.forgotPasswordDefer = $q.defer();

            return $http({
              method: "POST",
              url: EnvironmentConfig.base_url + 'user/forgotpassword/',
              timeout: defer.forgotPasswordDefer.promise,
              headers: {
                'Content-Type': "application/json"
              },
              data: details
            }).then(function (response) {
              console.log(response);
              return response;
            }).catch(function (error) {
              console.log(error);
              return error;
            });
        }

        function getClaimIntimation(details) {
            console.log(details);
            defer.getClaimIntimationDefer.resolve();
            defer.getClaimIntimationDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getclaimintimation/',
                timeout: defer.getClaimIntimationDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getClaimInfo(details) {
            console.log(details);
            defer.getClaimInfoDefer.resolve();
            defer.getClaimInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getclaiminfo/',
                timeout: defer.getClaimInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function renew(details) {
            console.log(details);
            defer.renewDefer.resolve();
            defer.renewDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/policyrenewal/',
                timeout: defer.renewDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getRenewalInfo(details) {
            console.log(details);
            defer.getRenewalInfoDefer.resolve();
            defer.getRenewalInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getrenewalinfo/',
                timeout: defer.getRenewalInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getPolicyList(details) {
            console.log(details);
            defer.getPolicyListDefer.resolve();
            defer.getPolicyListDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getpolicylist/',
                timeout: defer.getPolicyListDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getPolicyInfo(details) {
            console.log(details);
            defer.getPolicyInfoDefer.resolve();
            defer.getPolicyInfoDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getpolicyinfo/',
                timeout: defer.getPolicyInfoDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getClaimList(details) {
            console.log(details);
            defer.getClaimListDefer.resolve();
            defer.getClaimListDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getclaimlist/',
                timeout: defer.getClaimListDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function mulkiyaMail(details) {
            console.log(details);
            defer.mulkiyaMailDefer.resolve();
            defer.mulkiyaMailDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/mulkiyamail/',
                timeout: defer.mulkiyaMailDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }
        function payment(details) {
            console.log(details);
            defer.saveTravelDetailsDefer.resolve();
            defer.saveTravelDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/payment/',
                timeout: defer.saveTravelDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }
        function paymentCheck(details) {
            console.log(details);
            defer.saveTravelDetailsDefer.resolve();
            defer.saveTravelDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getpolicystatus/',
                timeout: defer.saveTravelDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });    
        }
        
        function serviceCheck() {
            defer.serviceCheckDefer.resolve();
            defer.serviceCheckDefer = $q.defer();

            return $http({
                method: "GET",
                url: EnvironmentConfig.base_url + 'service',
                timeout: defer.serviceCheckDefer.promise
            }).then(function(response) {
                // console.log(response);
                return response;
            });
        }
        function registerUser( user_name, user_password, civilid, user_email, user_mobile ) {
            defer.registerUserDefer.resolve();
            defer.registerUserDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'user/register/',
                timeout: defer.registerUserDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "user_email":user_email,
                        "user_password":user_password,
                        "user_name":user_name,
                        "user_mobile": user_mobile,
                        "civilid":civilid
                    }
                }
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }
        function loginUser( username, password, civilid ) {
            defer.loginUserDefer.resolve();
            defer.loginUserDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'user/login/',
                timeout: defer.loginUserDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    "jsonval":{
                        "UserId": "MobileApp",
                        "username":username,
                        "password":password,
                        "civilId":civilid
                    }
                }
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });
        }

        function getTravelDetails(details) {
            console.log(details);
            defer.getTravelDetailsDefer.resolve();
            defer.getTravelDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/travel',
                timeout: defer.getTravelDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }

        function saveTravelDetails(details) {
            console.log(details);
            defer.saveTravelDetailsDefer.resolve();
            defer.saveTravelDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/savetravel/',
                timeout: defer.saveTravelDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }

        function getHelperDetails(details) {
            console.log(details);
            defer.getHelperDetailsDefer.resolve();
            defer.getHelperDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/housemaid/',
                timeout: defer.getHelperDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }
        function saveHelperDetails(details) {
            console.log(details);
            defer.saveHelperDetailsDefer.resolve();
            defer.saveHelperDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/savehousemaid/',
                timeout: defer.saveHelperDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }



        function getByURL(url) {
            
            defer.getByURLDefer.resolve();
            defer.getByURLDefer = $q.defer();

            return $http({
                method: "GET",
                url: url,
                timeout: defer.getByURLDefer.promise
            }).then(function(response) {
                // console.log(response);
                return response;
            });   
        }

        function generatePolicy(details) {
            defer.generatePolicyDefer.resolve();
            defer.generatePolicyDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/generatepolicy/',
                timeout: defer.generatePolicyDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }

        function deferCall(api) {
            console.log(defer[api]);
            // console.log(api, defer[api], defer[api].resolve())
            defer[api].resolve();
        }

        function getMotorDetails(details) {
            console.log(details);
            defer.getMotorDetailsDefer.resolve();
            defer.getMotorDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getmotorpremium',
                timeout: defer.getMotorDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }
        function getMotorFields() {
            defer.getMotorFieldsDefer.resolve();
            defer.getMotorFieldsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getmotorinput/',
                timeout: defer.getMotorFieldsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }
        function saveMotorDetails(details) {
            console.log(details);
            defer.saveMotorDetailsDefer.resolve();
            defer.saveMotorDetailsDefer = $q.defer();

            return $http({
                method: "POST",
                url: EnvironmentConfig.base_url + 'policy/getmotorquotation/',
                timeout: defer.saveMotorDetailsDefer.promise,
                headers: {
                    'Content-Type': "application/json"
                },
                data: details
            }).then(function(response) {
                console.log(response);
                return response;
            }).catch(function(error) {
                console.log(error);
                return error;
            });   
        }


        $rootScope.today = $filter('date')(new Date(), "yyyy-MM-dd");
        $rootScope.ngtoday = new Date();
        $rootScope.nationality = {
            "1" : "Afghan",
            "2" : "Albanian",
            "3" : "Algerian",
            "4" : "Andorran",
            "5" : "Angolan",
            "6" : "Argentinian",
            "7" : "Armenian",
            "8" : "Australian",
            "9" : "Austrian",
            "10" : "Azerbaijani",
            "11" : "Bahamian",
            "12" : "Bahraini",
            "13" : "Bangladeshi",
            "14" : "Barbadian",
            "15" : "Belorussian or Byelorussian",
            "16" : "Belgian",
            "17" : "Belizian",
            "18" : "Beninese",
            "19" : "Bhutanese",
            "20" : "Bolivian",
            "21" : "Bosnian",
            "22" : "Botswanan",
            "23" : "Brazilian",
            "24" : "British",
            "25" : "Bruneian",
            "26" : "Bulgarian",
            "27" : "Burkinese",
            "28" : "Burmese",
            "29" : "Burundian",
            "30" : "Cambodian",
            "31" : "Cameroonian",
            "32" : "Canadian",
            "33" : "Cape Verdean",
            "34" : "Chadian",
            "35" : "Chilean",
            "36" : "Chinese",
            "37" : "Colombian",
            "38" : "Congolese",
            "39" : "Costa Rican",
            "40" : "Croat or Croatian",
            "41" : "Cuban",
            "42" : "Cypriot",
            "43" : "Czech",
            "44" : "Danish",
            "45" : "Djiboutian",
            "46" : "Dominician",
            "47" : "Dominican",
            "48" : "Ecuadorean",
            "49" : "Egyptian",
            "50" : "Salvadorean",
            "51" : "English",
            "52" : "Eritrean",
            "53" : "Estonian",
            "54" : "Ethiopian",
            "55" : "Fijian",
            "56" : "Finnish",
            "57" : "French",
            "58" : "Gabonese",
            "59" : "Gambian",
            "60" : "Georgian",
            "61" : "German",
            "62" : "Ghanian",
            "63" : "Greek",
            "64" : "Grenadian",
            "65" : "Guatemalan",
            "66" : "Guinean",
            "67" : "Guyanese",
            "68" : "Haitian",
            "69" : "Dutch",
            "70" : "Hungarian",
            "71" : "Icelandic",
            "72" : "Indian",
            "73" : "Indonesian",
            "74" : "Iranian",
            "75" : "Iraqi",
            "76" : "Irish",
            "77" : "Israeli",
            "78" : "Italian",
            "79" : "Jamican",
            "80" : "Japanese",
            "81" : "Jordanian",
            "82" : "Kazakh",
            "83" : "Kenyan",
            "84" : "Kuwaiti",
            "85" : "Laotian",
            "86" : "Latvian",
            "87" : "Lebanese",
            "88" : "Liberian",
            "89" : "Libyan",
            "90" : "Lithuanian",
            "91" : "Macedonian",
            "92" : "Malagasay or Madagascan",
            "93" : "Malawian",
            "94" : "Malaysian",
            "95" : "Maldivian",
            "96" : "Malian",
            "97" : "Maltese",
            "98" : "Mauritanian",
            "99" : "Mauritian",
            "100" : "Mexican",
            "101" : "Moldovan",
            "102" : "Monegasque or Monacan",
            "103" : "Mongolian",
            "104" : "Montenegrin",
            "105" : "Moroccan",
            "106" : "Mozambican",
            "107" : "Namibian",
            "108" : "Nepalese",
            "109" : "Dutch",
            "110" : "Nicaraguan",
            "111" : "Nigerien",
            "112" : "Nigerian",
            "113" : "North Korean",
            "114" : "Norwegian",
            "115" : "Omani",
            "116" : "Pakistani",
            "117" : "Panamanian",
            "118" : "Papua New Guinean or Guinean",
            "119" : "Paraguayan",
            "120" : "Peruvian",
            "121" : "Philippine",
            "122" : "Polish",
            "123" : "Portugese",
            "124" : "Qatari",
            "125" : "Romanian",
            "126" : "Russian",
            "127" : "Rwandan",
            "128" : "Saudi Arabian or Saudi",
            "129" : "Scottish",
            "130" : "Senegalese",
            "131" : "Serb or Serbian",
            "132" : "Seychellois",
            "133" : "Sierra Leonian",
            "134" : "Singaporean",
            "135" : "Slovene or Slovenian",
            "136" : "Somali",
            "137" : "South African",
            "138" : "South Korean",
            "139" : "Spanish",
            "140" : "Sri Lankan",
            "141" : "Sudanese",
            "142" : "Surinamese",
            "143" : "Swazi",
            "144" : "Swedish",
            "145" : "Swiss",
            "146" : "Syrian",
            "147" : "Taiwanese",
            "148" : "Tajik or Tadjik",
            "149" : "Tanzanian",
            "150" : "Thai",
            "151" : "Togolese",
            "152" : "Trinidadian and Tobagan",
            "153" : "Tunisian",
            "154" : "Turkish",
            "155" : "Turkmen or Turkoman",
            "156" : "Tuvaluan",
            "157" : "Ugandan",
            "158" : "Ukrainian",
            "159" : "British",
            "160" : "Uruguayan",
            "161" : "Uzbek",
            "162" : "Vatican",
            "163" : "Venezuelan",
            "164" : "Vietnamese",
            "165" : "Welsh",
            "166" : "Western Samoan",
            "167" : "Yemeni",
            "168" : "Yogoslav",
            "169" : "Zairean",
            "170" : "Zambian",
            "171" : "Zimbabwean",
            "172" : "American",
            "178" : "New Zealand"
        }
        return service;
    }
})();