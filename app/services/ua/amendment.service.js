(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AmendmentService', AmendmentService);

    AmendmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function AmendmentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/amendment';
        var amendmentFactory = {};

        amendmentFactory.getAllAmendmentsByProject = function (id, cache) {
            if (!cache) {
                delete amendmentFactory.currentProjectAmendments;
            } else if (
                amendmentFactory.currentProjectAmendments &&
                amendmentFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/project/" + id).success(function (data) {
                amendmentFactory.currentProjectAmendments = data.amendments;
                amendmentFactory.currentProjectId = id;
            }).error(function (error) {
                console.log(error);
            });
        };

        // POST
        amendmentFactory.postAmendment = function (amendment) {
            return $http.post(server + urlBase, amendment).success(function (data) {
                amendmentFactory.currentProjectAmendments = angular.equals(amendmentFactory.currentProjectAmendments, []) ?
                    {} : amendmentFactory.currentProjectAmendments;
                amendmentFactory.currentProjectAmendments[data.amendment.id] = data.amendment;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        amendmentFactory.putAmendment = function (amendment) {
            console.log(amendment);
            return $http.post(server + urlBase + "/" + amendment.id, amendment).success(function (data) {
                amendmentFactory.currentProjectAmendments = angular.equals(amendmentFactory.currentProjectAmendments, []) ?
                    {} : amendmentFactory.currentProjectAmendments;
                amendmentFactory.currentProjectAmendments[data.amendment.id] = data.amendment;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        amendmentFactory.deleteAmendment = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete amendmentFactory.currentProjectAmendments[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return amendmentFactory;
    }

})();