// store app/angular module inside variable and inject ngRoute to use partials
var app = angular.module('app', ['ngRoute']);

// define routes with config method
app.config(function ($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: 'partials/customize_users.html'
        })
        .when('/list', {
            templateUrl: 'partials/user_list.html'
        })
        .otherwise({
            redirectTo: '/users'
        });
})

app.factory('userFactory', [function () {
    var factory = {};

    // default list of users
    var users = [
        {first_name: 'Yukihiro', last_name: 'Matsumoto', language: 'Ruby'},
        {first_name: 'Ryan', last_name: 'Dahl', language: 'Javascript'},
        {first_name: 'Brendan', last_name: 'Eich', language: 'Javascript'}
    ];

    // pass user data into controller
    factory.index = function (callback) {
        callback(users);
    }

    // method to create user into controller
    factory.create = function (user) {
        users.push(user);
    }

    // method to delete user into controller
    factory.delete = function ($index) {
        users.splice($index, 1);
    }

    return factory;
}])

// inject userFactory into customize users controller
app.controller('Customize_Users_Controller', ['$scope', 'userFactory', function ($scope, userFactory) {
    function setUsers(data) {
        $scope.users = data;
        $scope.newUser = {};
    }

    $scope.users = [];

    // controller calls index method from factory and passes users data
    userFactory.index(setUsers);

    // passes new user info into factory
    $scope.create = function () {
        userFactory.create($scope.newUser);
        $scope.newUser = {}; // resets form
    }

    // delete user from the factory
    $scope.delete = function ($index) {
        userFactory.delete($index);
    }
}])

// inject userFactory into list controller
app.controller('User_List_Controller', ['$scope', 'userFactory', function ($scope, userFactory) {
    function setUsers(data) {
        $scope.users = data;
    }

    $scope.users = [];

    // controller calls index method from factory and passes users data
    userFactory.index(setUsers);
}])

