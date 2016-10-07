var ionicSelect = angular.module('ionicSelect',[]);

ionicSelect.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            ngModel: '=?',
            ngValue: '=?',
           
        },
         require: '?ngModel',
         transclude : false,
         replace: false,
        template:
                    '<div class="selectContainer">'
                        +'<label class="item item-input item-stacked-label">' 
                            +'<span class="input-label">{{label}}</span>'
                            +'<div class="item item-input-inset">'
                                +'<label class="item-input-wrapper">'
                                    +'<i class="icon ion-ios7-search placeholder-icon"></i>'
                                    +'<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
                                +'</label>'
                                +'<button class="button button-small button-clear" ng-click="open()">'
                                    +'<i class="icon ion-chevron-down"></i>'
                                +'</button>'
                            +'</div>' 
                        +'</label>'
                        +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        +'<ion-scroll>'
                            +'<ul class="list">'
        +'<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'                    
                            +'</ul>'
        +'</ion-scroll>'
                        +'</div>'    
                    +'</div>'
             ,
        link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item);
                scope.showHide = false;
            };
            
            element.bind('click',function(){
                element.find('input').focus();
            });
            
            scope.open = function(){
                
                  scope.ngModel = "";  
                return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
           element.find('input').val(newValue[scope.labelField]);
               
            });
        },
    };
});



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var count = 0 ;
var arr;
var rate = [];
var rating;
var id = 0;
var status = 1 ; 

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionicSelect', 'ionic-ratings'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.navBar.alignTitle("center"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  $stateProvider
  .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html"
       }
      }
    })
    .state('tabs.instructordetails', {
      url: "/instructordetails",
      views: {
        'home-tab': {
          templateUrl: "templates/instructordetails.html"
        }
      }
    })
    .state('tabs.mainmenu', {
      url: "/mainmenu",
      views: {
        'home-tab': {
          templateUrl: "templates/mainmenu.html"
        }
      }
    })
    .state('tabs.InvoicesMain', {
      url: "/InvoicesMain",
      views: {
        'home-tab': {
          templateUrl: "templates/InvoicesMain.html"
        }
      }
    })
    .state('tabs.instructorFeedback', {
      url: "/instructorFeedback",
      views: {
        'home-tab': {
          templateUrl: "templates/instructorFeedback.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.invoicemenu', {
      url: "/invoicemenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/InvoicesMain.html"
        }
      }
    })
    .state('tabs.producemenu', {
      url: "/producemenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/ProduceMain.html"
        }
      }
    })
    .state('tabs.clientmenu', {
      url: "/clientmenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/ClientsMain.html"
        }
      }
    })
    .state('tabs.submit', {
      url: "/clientmenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/submit.html"
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/home');
     $urlRouterProvider.otherwise("/tab/home");

})

.service('apiService', function() {
  var apiService = this;

  apiService.instructorsObject = {};

  apiService.questionsObject = {};


  apiService.getInstructorInfo = function(){
     return apiService.instructorsObject;
  }

  apiService.setInstructorInfo = function(value){
    apiService.instructorsObject = {};

    apiService.instructorsObject = value;
  }

  apiService.getQuestionsInfo = function(){
     return apiService.questionsObject;
  }

  apiService.setQuestionsInfo = function(value){
    apiService.questionsObject = {};

    apiService.questionsObject = value;
  }
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})



  .controller('qaCtrl', function($scope, $http,$state, apiService,  $ionicPopup, $timeout, $ionicLoading) {


    $scope.questionIndex=0;
    $scope.questionList = apiService.getQuestionsInfo();

    $scope.instructor = apiService.getInstructorInfo();

    console.log($scope.questionList);
    console.log($scope.questionList[$scope.questionIndex].question);


    var resultArr = [];

    //Getting the current Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = mm+'/'+dd+'/'+yyyy;

    for(var x = 0; x< $scope.questionList.length; x++){
      var obj = {
        "question_id" : $scope.questionList[x].question_id,
        "question" : $scope.questionList[x].question,
        "rating" : 0,
        "student_reg_no" : $scope.instructor.instructor_id,
        "date" : today,
        "week" : 1
      };

      resultArr.push(obj);
    }

    console.log(resultArr);


      $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor:  'rgb(200, 100, 100)',    //Optional
        rating:  0, //Optional
        minRating:0,    //Optional
        readOnly: true, //Optional
        callback: function(rating, index) {    //Mandatory
          $scope.ratingsCallback(rating, index);
        }
      };

      $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);


        resultArr[index].rating = rating;


        // if($scope.questionIndex!=(resultArr.length-1)){
        //   $scope.questionIndex= $scope.questionIndex+1;
        // }else{
        //   alert("Submit");
        // }
        
      };

      $scope.submitFunc = function(){
          var flag = false;

          console.log(resultArr);

         

          for(var x = 0; x< resultArr.length; x++){
            if(resultArr[x].rating==0){
               flag = true;
               var alertPopup = $ionicPopup.alert({
                 title: 'Error!',
                 template: 'Select a rating for all!'
               });

               alertPopup.then(function(res) {
                 console.log('Done');
               });

              break;
            }
          }

          if (!flag) {

            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });

            //Submitting Feedback Response
            var request = {
               method: 'POST',
               contentType:'application/json',

               url: 'https://script.google.com/macros/s/AKfycbxNrcIqOuP-7fLMELx2Gw50A65g10KtbNTQSPNdPE12JdUrsCE/exec',
               headers: {'Content-Type': undefined},
               data: resultArr
              };

            $http(request).then(function(response) {
              console.log(response);
              // alert("There are " + response.data + " Questions");
              $ionicLoading.hide();

              var alertPopup = $ionicPopup.alert({
                 title: 'Success!',
                 template: 'Evaluation has been submitted!'
               });

               alertPopup.then(function(res) {
                  $state.go('tabs.mainmenu');
               });

              //alert(response.data[1].date);
            }, function(error) {
              alert("error");
            });
          }

      }

 
})

.controller('MainMenuCtrl', function($scope, $cordovaBarcodeScanner, $http, $state, $ionicLoading, apiService) {

       $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

      // verifyQRCode(2);
$scope.ins = function() {
         
   if (arr && status == 2){
    
      $state.go('tabs.submit');


    }  else{
  $state.go('tabs.instructorFeedback');


    } 

  };
            $http.get("https://script.google.com/macros/s/AKfycbzcBMfKT-35WS9Goth30wdgnRaSaldyEGQSjehOtK1xNaPLtQo/exec", {})
    .success(function (response) {
                if (response.hasError) {
                  console.log("Error")
                } else {
                  apiService.setQuestionsInfo(response.data);
                   $ionicLoading.hide();
                  console.log("Success1")
                  console.log(response.data)
                 arr = response.data;
               status = 0 ;
               console.log(status);
              
                }

            })
    .error(function (response) {
              console.log("Response error")
              console.log(response)
               
            });
                   
  
  

  
   

})

.controller('InstructorDetailsController', function($scope, $cordovaBarcodeScanner, $http, $state, $ionicLoading, apiService) {

    $scope.APIresponse = apiService.getInstructorInfo();
    console.log($scope.APIresponse);


})

.controller('instructorSelectCtrl', function($scope, $http,$state, $cordovaBarcodeScanner, $ionicLoading, apiService, $ionicPopup) {



$scope.show = false;


    loadInstructors();


 $scope.test = function(modVal){
          console.log(modVal);
        }

 function loadInstructors(){

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get("https://script.google.com/macros/s/AKfycbyHTiEoJVonZf9OByPWe1WdOKGqXYs6jRjqxvAMTZtJtdUyy7E/exec")
    .then(function(response) {
        $ionicLoading.hide();

        
        var data  = response.data.data;
        $scope.instructordata = data;

        var ids = [];

        for (var i = 0; i < data.length; i++) {
          ids.push(data[i].instructor_id);
        }
        console.log(ids);

        console.log($scope.instructordata);

         $scope.goToMainMenu = function(modVal){
          console.log(modVal.instructor_id);
          if(ids.indexOf(modVal.instructor_id) != -1){
            apiService.setInstructorInfo(modVal);

            // $scope.instructor = "";
                        $scope.instructor = undefined;

            console.log(modVal);
            $state.go("tabs.mainmenu");
          }else{
              var alertPopup = $ionicPopup.alert({
                 title: 'Error!',
                 template: 'Invalid Name!'
               });

               alertPopup.then(function(res) {
                  // $state.go('tabs.mainmenu');
               });
          }

          


          
        }
    });
  }

  
 

});