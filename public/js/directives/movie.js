angular.module('movies', ['ui.bootstrap'])
  .directive('movie', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/movie.html',
      controllerAs: 'movie',
      controller: ['$scope', '$uibModal', function($scope, $uibModal) {
        $scope.currentYear = new Date().getFullYear();
        if (window.localStorage.getItem('movies') !== null) {
          $scope.movies = JSON.parse(window.localStorage.getItem('movies'));
        } else {

          $scope.movies = [{
            title: "Deadpool",
            year: 2016,
            genres: ["Action", "Adventure", "Comedy"],
            rating: 8.3,
            actors: ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"]
          }, {
            title: "Deadpool 2",
            year: 2015,
            genres: ["Action", "Adventure", "Comedy"],
            rating: 2.3,
            actors: ["Ryan Reynolds", "Jack Daniels", "T.J. Miller"]
          },
          {
            title: "Deadpool 3",
            year: 2014,
            genres: ["Thriller", "Adventure", "Romance"],
            rating: 2.3,
            actors: ["Ryan Reynolds", "Jack Daniels", "T.J. Miller"]
          }
        ];
        }
        for (var i = 0; i < $scope.movies.length; i++) {
          $scope.movies[i].visible = true;
        }
        $scope.$watch(function(newValue) {
          window.localStorage.setItem("movies", JSON.stringify($scope.movies));
        });
        $scope.$watch('search', function(newValue) {
          if (newValue == "" || newValue === undefined) {
            for (var i = 0; i < $scope.movies.length; i++) {
              $scope.movies[i].visible = true;
            }
          } else {
            for (var i = 0; i < $scope.movies.length; i++) {
              var item = $scope.movies[i];
              var search = newValue.toLowerCase();
              if (item.title.toLowerCase().indexOf(search) >= 0 || item.year.toString().indexOf(search) >= 0 || item.actors.join(',').toLowerCase().indexOf(search) >= 0 || item.genres.join(',').toLowerCase().indexOf(search) >= 0 || item.rating.toString().indexOf(search) >= 0) {
                $scope.movies[i].visible = true;

              } else {
                $scope.movies[i].visible = false;
              }
            }

          }

        });
        $scope.editmovie = function(item) {
          var nonbound = {
            title: item.movie.title,
            year: item.movie.year,
            rating: item.movie.rating,
            actors: item.movie.actors.join(','),
            genres: item.movie.genres.join(','),
            $index: item.$index
          }
          $scope.openmodal(nonbound);
        }
        $scope.destroymovie = function(item) {
          console.log(item);
          var areYouSure = confirm("Are you sure you want to delete this movie?");
          if (areYouSure === true) {
            $scope.movies.splice(item.$index, 1);
          }
        };
        $scope.openmodal = function(isNew) {
          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: '/templates/moviemodal.html',
            controller: ['$scope', function($scope) {
              window.modalscope = $scope;

              if (isNew === true) {
                $scope.replace = false;
                $scope.newmovie = {
                  title: "",
                  year: new Date().getFullYear(),
                  genres: "",
                  rating: 0,
                  actors: ""
                };

              } else {
                $scope.replace = true;
                $scope.newmovie = isNew;
              }
              $scope.validator = function(){
                return ($scope.newmovie.title.length > 0)?true:false;
              };
              $scope.ok = function() {
                if($scope.validator()){
                console.log("OKAY");
                modalInstance.close({
                  msg: "OK",
                  movie: $scope.newmovie
                });
              } else {
                alert("Please provide a title.");
              }
              };
              $scope.cancel = function() {
                modalInstance.close("CANCEL");
              }
            }]
          });
          modalInstance.result.then(function(res) {
            if (res.msg === "OK") {
              console.log(res.movie);
              if (typeof res.movie.$index === "number") {
                console.log("EXISTING MOVIE")
                var movie = $scope.movies[res.movie.$index];
                movie.title = res.movie.title;
                movie.year = res.movie.year;
                movie.rating = res.movie.rating;
                movie.actors = res.movie.actors.split(',');
                movie.genres = res.movie.genres.split(',');
              } else {
                res.movie.actors = res.movie.actors.split(',');
                res.movie.genres = res.movie.genres.split(',');
                $scope.movies.push(res.movie);
              }
            }
          });

        };
        $scope.addmovie = function(item) {
          $scope.openmodal(true);

        };
        window.master = $scope;
      }],
      compile: function(tElem, tAttrs) {
        //compile before rendering the goodies
        return {
          pre: function(scope, elem, attrs, ctrl) {

          },
          post: function(scope, elem, attrs, ctrl) {
            //generally attach your stuff here
          }
        };
      }
    };
  });
