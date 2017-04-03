(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UserService', userService);

    userService.$inject = ['store', 'SERVER_CONFIG', '$http'];

    function userService(store, SERVER_CONFIG, $http) {
        var userFactory = {};

        var server = SERVER_CONFIG.url;
        var urlBase = "/api/kernel/user";
        var currentUser = null;

        userFactory.setCurrentUser = function (user) {
            currentUser = user;
            store.set('user', user);
            return currentUser;
        };

        userFactory.updatePassword = function (pass) {
            return $http.post(server + urlBase + "/current/password", pass).success()
                .error(function (error) {
                    console.log(error);
                });
        };

        userFactory.updateProfile = function (profile){
            return $http.post(server + urlBase + "/current", profile).success(function (data) {
                userFactory.currentUser = data.user;
            }).error(function (error) {
                console.log(error);
            });
        };


        userFactory.getCurrentUser = function () {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        };

        userFactory.getServerCurrentUser = function (s) {
            return $http.get(server + urlBase + "/current");
        };

        userFactory.getAllUsers = function (cache) {
            if (!cache) {
                delete userFactory.users;
            } else if (userFactory.users) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                userFactory.users = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getAllCurrentUsers = function (cache) {
            if (!cache) {
                delete userFactory.currentUsers;
            } else if (userFactory.currentUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/current').success(function (data) {
                userFactory.currentUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getAllOldUsers = function (cache) {
            if (!cache) {
                delete userFactory.oldUsers;
            } else if (userFactory.oldUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/old').success(function (data) {
                userFactory.oldUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getAllDisabledUsers = function (cache) {
            if (!cache) {
                delete userFactory.disabledUsers;
            } else if (userFactory.disabledUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/disabled').success(function (data) {
                userFactory.disabledUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getUserByUsername = function(user){
            return $http.get(server + urlBase + "/" + user);
        };

        userFactory.getUserByMail = function(mail){
            return $http.get(server + urlBase + "/" + mail);
        };

        userFactory.getUserById = function (id) {
            return $http.get(server + urlBase + "/" + id);
        };

        // POST
        userFactory.postUser = function (user) {
            return $http.post(server + urlBase, user).success(function (data) {
                var list = 'currentUsers';
                if(data.user.mainPosition.old) {
                    list = 'oldUsers';
                }
                userFactory[list] = angular.equals(userFactory[list], []) ?
                    {} : userFactory[list];
                userFactory[list][data.user.id] = data.user;
            }).error(function (data) {
                console.log(data);
            });
        };

        // PUT
        userFactory.disableCurrentUser = function(user) {
            return $http.post(server + urlBase + "/" + user.id + "/disable").success(function(data) {
                if (userFactory.disabledUsers) {
                    userFactory.disabledUsers = angular.equals(userFactory.disabledUsers, []) ?
                        {} : userFactory.disabledUsers;
                    userFactory.disabledUsers[data.user.id] = data.user;
                }
                if (userFactory.currentUsers) {
                    delete userFactory.currentUsers[data.user.id];
                }
                if (userFactory.selectedUser && userFactory.selectedUser.id == data.user.id) {
                    userFactory.selectedUser = data.user;
                }
            }).error(function(data) {
                console.log(data);
            });
        };

        userFactory.disableOldUser = function(user) {
            return $http.post(server + urlBase + "/" + user.id + "/disable").success(function(data) {
                if (userFactory.disabledUsers) {
                    userFactory.disabledUsers = angular.equals(userFactory.disabledUsers, []) ?
                        {} : userFactory.disabledUsers;
                    userFactory.disabledUsers[data.user.id] = data.user;
                }
                if (userFactory.oldUsers) {
                    delete userFactory.oldUsers[data.user.id];
                }
                if (userFactory.selectedUser && userFactory.selectedUser.id == data.user.id) {
                    userFactory.selectedUser = data.user;
                }
            }).error(function(data) {
                console.log(data);
            });
        };

        userFactory.enableUser = function(user) {
            var list = 'currentUsers';
            if(user.mainPosition.old) {
                list = 'oldUsers';
            }
            return $http.post(server + urlBase + "/" + user.id + "/enable").success(function(data) {
                if (userFactory[list]) {
                    userFactory[list] = angular.equals(userFactory[list], []) ?
                        {} : userFactory[list];
                    userFactory[list][data.user.id] = data.user;
                }
                if (userFactory.disabledUsers) {
                    delete userFactory.disabledUsers[data.user.id];
                }
                if (userFactory.selectedUser && userFactory.selectedUser.id == data.user.id) {
                    userFactory.selectedUser = data.user;
                }
            }).error(function(data) {
                console.log(data);
            });
        };

        return userFactory;
    }

})();