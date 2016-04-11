angular.module('bookshelf')
.directive('body', function(){
  return {
    restrict: 'E',
    replace: false,
    controller: ['$scope','$http',function($scope,$http){
      $http.get('/books').then(function(response){
        $scope.books = response.data;
      });
      window.bodyScope = $scope;
    }],
    compile: function(tElem, tAttrs){
      //compile before rendering the goodies
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope, elem, attrs, ctrl){
          //generally attach your stuff here
        }
      };
    }
  };
});
