(function() {
    'use strict';

    angular
        .module('app.routes', [
            'ionic'
        ])
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/home/home.html',
                    controller: 'homeCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('menu', {
                    url: '/menu',
                    templateUrl: 'app/menu/menu.html',
                    controller: 'menuCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('products', {
                    url: '/products',
                    templateUrl: 'app/products/products.html',
                    controller: 'productsCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: 'app/register/register.html',
                    controller: 'registerCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'loginCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('guest', {
                    url: '/guest',
                    templateUrl: 'app/guest/guest.html',
                    controller: 'guestCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-intro', {
                    url: '/travel-intro',
                    templateUrl: 'app/travel-takaful/travel-intro/travel-intro.html',
                    controller: 'travelIntroCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-calculate', {
                    url: '/travel-calculate',
                    templateUrl: 'app/travel-takaful/travel-calculate/travel-calculate.html',
                    controller: 'travelCalculateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-summary', {
                    url: '/travel-summary',
                    templateUrl: 'app/travel-takaful/travel-summary/travel-summary.html',
                    controller: 'travelSummaryCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-save', {
                    url: '/travel-save',
                    templateUrl: 'app/travel-takaful/travel-save/travel-save.html',
                    controller: 'travelSaveCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-save-response', {
                    url: '/travel-save-response',
                    templateUrl: 'app/travel-takaful/travel-save-response/travel-save-response.html',
                    controller: 'travelSaveResponseCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('travel-policy-generate', {
                    url: '/travel-policy-generate',
                    templateUrl: 'app/travel-takaful/travel-policy-generate/travel-policy-generate.html',
                    controller: 'travelPolicyGenerateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-intro', {
                    url: '/helper-intro',
                    templateUrl: 'app/helper-takaful/helper-intro/helper-intro.html',
                    controller: 'helperIntroCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-calculate', {
                    url: '/helper-calculate',
                    templateUrl: 'app/helper-takaful/helper-calculate/helper-calculate.html',
                    controller: 'helperCalculateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-sponsor', {
                    url: '/helper-sponsor',
                    templateUrl: 'app/helper-takaful/helper-sponsor/helper-sponsor.html',
                    controller: 'helperSponsorCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-declaration', {
                    url: '/helper-declaration',
                    templateUrl: 'app/helper-takaful/helper-declaration/helper-declaration.html',
                    controller: 'helperDeclarationCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-summary', {
                    url: '/helper-summary',
                    templateUrl: 'app/helper-takaful/helper-summary/helper-summary.html',
                    controller: 'helperSummaryCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('helper-policy-generate', {
                    url: '/helper-policy-generate',
                    templateUrl: 'app/helper-takaful/helper-policy-generate/helper-policy-generate.html',
                    controller: 'helperPolicyGenerateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-intro', {
                    url: '/motor-intro',
                    templateUrl: 'app/motor-takaful/motor-intro/motor-intro.html',
                    controller: 'motorIntroCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-calculate', {
                    url: '/motor-calculate',
                    templateUrl: 'app/motor-takaful/motor-calculate/motor-calculate.html',
                    controller: 'motorCalculateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-summary', {
                    url: '/motor-summary',
                    templateUrl: 'app/motor-takaful/motor-summary/motor-summary.html',
                    controller: 'motorSummaryCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-save', {
                    url: '/motor-save',
                    templateUrl: 'app/motor-takaful/motor-save/motor-save.html',
                    controller: 'motorSaveCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-save-response', {
                    url: '/motor-save-response',
                    templateUrl: 'app/motor-takaful/motor-save-response/motor-save-response.html',
                    controller: 'motorSaveResponseCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-policy-generate', {
                    url: '/motor-policy-generate',
                    templateUrl: 'app/motor-takaful/motor-policy-generate/motor-policy-generate.html',
                    controller: 'motorPolicyGenerateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('motor-documents', {
                    url: '/motor-documents',
                    templateUrl: 'app/motor-takaful/motor-documents/motor-documents.html',
                    controller: 'motorDocumentsCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('policy-list', {
                    url: '/policy-list',
                    templateUrl: 'app/listing/policy/policy-list.html',
                    controller: 'policyListCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('policy', {
                    url: '/policy/:policyNo',
                    templateUrl: 'app/listing/policy/policy.html',
                    controller: 'policyCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('claim-list', {
                    url: '/claim-list',
                    templateUrl: 'app/listing/claim/claim-list.html',
                    controller: 'claimListCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('claim', {
                    url: '/claim',
                    templateUrl: 'app/listing/claim/claim.html',
                    controller: 'claimCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('claim-documents', {
                    url: '/claim-documents',
                    templateUrl: 'app/listing/claim/claim-documents.html',
                    controller: 'claimDocumentsCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('renew', {
                    url: '/renew',
                    templateUrl: 'app/listing/renew/renew.html',
                    controller: 'renewCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('renew-policy-generate', {
                    url: '/renew-policy-generate',
                    templateUrl: 'app/listing/renew/renew-policy-generate.html',
                    controller: 'renewPolicyGenerateCtrl as vm'
                });
        }).config(function($stateProvider) {
            $stateProvider
                .state('claim-intimate-response', {
                    url: '/claim-intimate-response',
                    templateUrl: 'app/listing/claim/claim-intimate-response.html',
                    controller: 'claimIntimateResponseCtrl as vm'
                });
        }).config(function ($stateProvider) {
            $stateProvider
            .state('profile', {
              url: '/profile',
              templateUrl: 'app/profile/profile.html',
              controller: 'profileCtrl as vm'
            });
        }).config(function ($stateProvider) {
            $stateProvider
            .state('contact', {
              url: '/contact',
              templateUrl: 'app/contact/contact.html',
              controller: 'contactCtrl as vm'
            });
        }).config(function ($stateProvider) {
          $stateProvider
            .state('takaful-guide', {
              url: '/takaful-guide',
              templateUrl: 'app/takaful-guide/takaful-guide.html',
              controller: 'takafulGuideCtrl as vm'
            });
        }).config(function ($stateProvider) {
          $stateProvider
            .state('claim-intimation', {
              url: '/claim-intimation',
              templateUrl: 'app/listing/claim/claim-intimation.html',
              controller: 'claimIntimationCtrl as vm'
            });
        }).config(function ($stateProvider) {
          $stateProvider
            .state('motor-claims', {
              url: '/motor-claims',
              templateUrl: 'app/listing/claim/motor-claims/motor-claims.html',
              controller: 'motorClaimsCtrl as vm'
            });
        }).config(function ($stateProvider) {
            $stateProvider
                .state('claim-policy-generate', {
                    url: '/claim-policy-generate',
                    templateUrl: 'app/listing/claim/claim-policy-generate.html',
                    controller: 'claimPolicyGenerateCtrl as vm'
                });
        });
})();
