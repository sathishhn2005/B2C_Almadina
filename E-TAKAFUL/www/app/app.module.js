angular.module('etakaful', [
    'ionic',
    'ionic-datepicker',
    'ui.select',
    'app.routes',
    'app.config',
    'ngCordova',
    'tmh.dynamicLocale',
    'pascalprecht.translate'
])
.constant('availableLanguages', ['en-US'])
.constant('defaultLanguage', 'en-US')

.value('_', window._)

.run(function ($ionicPlatform, $rootScope, $state, $ionicPopup, tmhDynamicLocale, $translate, $cordovaGlobalization, availableLanguages, defaultLanguage, $locale, commonService) {

    $rootScope.rtl = false;
    $rootScope.language = 'ENG';
    $rootScope.languageCode = 'en-US';

    console.log($state.current);
    $ionicPlatform.registerBackButtonAction(function () {
        return;
        // window.history.back();
        // console.log($state.current.name, 'travel-policy-generate', 'home', 'motor-policy-generate', 'helper-policy-generate');

    }, 100);


    $rootScope.common = commonService;

    /***********Language Localization ***********/
        function setLanguage() {
            if(typeof navigator.globalization !== "undefined") {
                $cordovaGlobalization.getPreferredLanguage().then(function(result) {
                    var language = getSuitableLanguage(result.value);
                    applyLanguage(language);
                    $translate.use(language);

                });
            } else {
                applyLanguage(defaultLanguage);
            }
        }
        function applyLanguage(language) {
            tmhDynamicLocale.set(language.toLowerCase());
        }
        function getSuitableLanguage(language) {
            for(var index = 0; index < availableLanguages.length; index++){
                if(availableLanguages[index].toLowerCase() === language.toLowerCase()){
                    return availableLanguages[index];
                }
            }   
            return defaultLanguage;
        }   

    /***********Language Localization end ***********/

    $ionicPlatform.ready(function() {

        setLanguage();
        
        
        // $translate.use('ar'); //change language default
        // $rootScope.rtl = true;



        // if (window.cordova && window.cordova.plugins.Keyboard) {
            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            // cordova.plugins.Keyboard.disableScroll(true);
            // window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        // }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        
        // commonService.connectivityCheck(); //check internet connectivity
        


    })
})

.config(function( tmhDynamicLocaleProvider, $translateProvider, defaultLanguage){
    tmhDynamicLocaleProvider
     .localeLocationPattern('app/locales/angular-locale_{{locale}}.js');
     $translateProvider.useStaticFilesLoader({
         'prefix': 'app/i18n/',
        //  'prefix': 'http://eservice.almadinatakaful.com/mob_language/',
        'suffix': '.json'
     });
     $translateProvider.preferredLanguage(defaultLanguage);
    //  $translateProvider.useSanitizeValueStrategy('escapeParameters');
})

.config(function($urlRouterProvider, $ionicConfigProvider, $animateProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.transition('none');
    
     if (ionic.Platform.isAndroid()) {
        $animateProvider.classNameFilter('angular-animated');
        $ionicConfigProvider.scrolling.jsScrolling(false);
      }



    $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");

        if(window.localStorage['first'] == 'false') {
            // $state.go('tab.dash');
        } else {
            $state.go("login");
        }
        window.localStorage.setItem('first', 'true');
    });
    // $ionicConfigProvider.backButton.previousTitleText(false);
}).factory('httpRequestInterceptor', function ($rootScope) {
  return {
    request: function (config) {
      config.headers['Accept-Language'] = $rootScope.languageCode;
      return config;
    }
  };
}).config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
