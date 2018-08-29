
angular.module('myApp', ['ngRoute'])

    .service('EmployeesList', function () {
        var EmployeesArr = [
            {
                id: 1,
                FirstName: "Roy",
                LastName: "Barak",
                DisplayName: "Roy B",
                Email: "BarakRoy@gmail.com",
                Phone: "43434334",
                Country: "Israel",
                City: "Netanya",
                Password: 12345,
                isTrader: false,
                TraderLimit: 500,

            },
            {
                id: 2,
                FirstName: "Modi",
                LastName: "Weintroup",
                DisplayName: "Modi W",
                Email: "Modi@gmail.com",
                Phone: "54554333",
                Country: "Israel",
                City: "Netanya",
                Password: 12345,
                isTrader: true,
                TraderLimit: 3300,

            },
            {
                id: 3,
                FirstName: "Yuval",
                LastName: "Bar Yosef",
                DisplayName: "Yuval B",
                Email: "Yuval@gmail.com",
                Phone: "54545454",
                Country: "Israel",
                City: "Netanya",
                Password: 12345,
                isTrader: false,
                TraderLimit: 54400,

            },

        ]

        return EmployeesArr;
    })
    .controller('MainController', function ($scope, EmployeesList) {

        $scope.EmployeesArrClone = angular.copy(EmployeesList);
        $scope.EmployeesArr = EmployeesList;
       

        $scope.searchReultsCount = '';


        $scope.searchEmployees = function () {
            if (!!$scope.searchValue) {
                var searchResults = EmployeesList.filter(function (prmItem) {

                    return prmItem.FirstName.toLowerCase().indexOf($scope.searchValue) > -1;
                });
                $scope.searchReultsCount = searchResults.length;
                $scope.EmployeesArr = searchResults;
            } else {
                $scope.EmployeesArr = EmployeesList;
                $scope.searchReultsCount = 0;
            }

        }
        $scope.searchEmployeesDropDown = function(){
            if (!!$scope.searchEmployeeDropDown) {
                var searchResults = EmployeesList.filter(function (prmItem) {

                    return prmItem.id == $scope.searchEmployeeDropDown ;
                });
                $scope.searchReultsCount = searchResults.length;
                $scope.EmployeesArr = searchResults;
            } else {
                $scope.EmployeesArr =  $scope.EmployeesArrClone;
                $scope.searchReultsCount = 0;
            }
        }

    })

    .controller('DetailsController', function ($scope, $timeout, $routeParams, EmployeesList) {
        $scope.id = $routeParams.id;

        $scope.Password = {};
        $scope.dataSaved = false;
        var currEmployee = EmployeesList.filter(function (prmItem) {
            return prmItem.id == $scope.id;
        });

        $scope.currEmployeeObj = currEmployee[0];
        $scope.showModal = function () {
            $("[modal-id='changePasswordModal']").modal("show");
        }
        $scope.saveEmployeeInfo = function (prmEmployeeObj) {

            var newEmployyData = {
                id: prmEmployeeObj.id,
                FirstName: prmEmployeeObj.FirstName,
                LastName: LastName = prmEmployeeObj.LastName,
                DisplayName: prmEmployeeObj.DisplayName,
                Email: prmEmployeeObj.Email,
                Phone: prmEmployeeObj.Phone,
                Country: prmEmployeeObj.Country,
                City: prmEmployeeObj.City,
                Password: $scope.currEmployeeObj.Password,
                isTrader: prmEmployeeObj.isTrader,
                TraderLimit: prmEmployeeObj.TraderLimit,

            }

            for (var ind01 = 0; ind01 < EmployeesList.length; ind01++) {
                var currEmployee = EmployeesList[ind01];
                if (currEmployee.id == $scope.currEmployeeObj.id) {

                    currEmployee = newEmployyData;
                    $scope.dataSaved = true;

                    $timeout(function () {
                        $scope.dataSaved = false;
                    }, 2000);
                }
            }


        }

        $scope.saveNewPassword = function (prmEmployeeObj) {

            if (!!$scope.Password) {
                $scope.isPasswordChangedSucceess = false;
                $scope.isPasswordChangedError = false;
                var currEmployee = EmployeesList.filter(function (prmItem) {
                    return prmItem.id == prmEmployeeObj.id;
                });
                var oldPassword = currEmployee[0].Password;
                if ($scope.Password.currPassword == oldPassword
                    && !!$scope.Password.newPassword &&
                    ($scope.Password.newPassword == $scope.Password.confirmNewPassword)
                ) {

                    for (var ind01 = 0; ind01 < EmployeesList.length; ind01++) {
                        var currEmployeeItem = EmployeesList[ind01];
                        if (currEmployeeItem.id == prmEmployeeObj.id) {
                            currEmployeeItem.Password = $scope.Password.newPassword;

                            $scope.isPasswordChangedSucceess = true;

                            $timeout(function () {
                                $scope.isPasswordChangedSucceess = false;
                            }, 2000);
                        }


                    }
                } else {
                    $scope.isPasswordChangedError = true;

                    $timeout(function () {
                        $scope.isPasswordChangedError = false;
                    }, 2000);
                }

            }

        }
       
    })

    .config(function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })

            .when('/home', {
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })

            .when('/details/:id/', {
                templateUrl: 'templates/details.html',
                controller: 'DetailsController'
            })

        // .otherwise({
        //     redirectTo: 'templates/home.html'
        // });



    });
