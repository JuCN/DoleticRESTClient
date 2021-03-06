(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DeliveryService', DeliveryService);

    DeliveryService.$inject = ['$http', 'SERVER_CONFIG'];

    function DeliveryService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/delivery';
        var deliveryFactory = {};

        deliveryFactory.getAllDeliveriesByProject = function (id, cache) {
            if (!cache) {
                delete deliveryFactory.currentProjectDeliveries;
            } else if (
                deliveryFactory.currentProjectDeliveries &&
                deliveryFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + 's/project/' + id).success(function (data) {
                deliveryFactory.currentProjectDeliveries = data.deliverys;
                deliveryFactory.currentProjectId = id;
            }).error(function (data) {
                console.log(data);
            });
        };

        deliveryFactory.getAllDeliveriesByUser = function (id) {
            return $http.get(server + urlBase + 's/user/' + id);
        };

        // POST
        deliveryFactory.postDelivery = function (delivery) {
            return $http.post(server + urlBase, delivery).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        deliveryFactory.putDelivery = function (delivery) {
            return $http.post(server + urlBase + "/" + delivery.id, delivery).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        deliveryFactory.deliverDelivery = function (delivery) {
            return $http.post(server + urlBase + "/" + delivery.id + "/deliver", delivery).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        deliveryFactory.payDelivery = function (delivery) {
            return $http.post(server + urlBase + "/" + delivery.id + "/pay", delivery).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        deliveryFactory.undeliverDelivery = function (delivery) {
            return $http.post(server + urlBase + "/" + delivery.id + "/undeliver", {}).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        deliveryFactory.unpayDelivery = function (delivery) {
            return $http.post(server + urlBase + "/" + delivery.id + "/unpay", {}).success(function (data) {
                deliveryFactory.currentProjectDeliveries = angular.equals(deliveryFactory.currentProjectDeliveries, []) ?
                    {} : deliveryFactory.currentProjectDeliveries;
                deliveryFactory.currentProjectDeliveries[data.delivery.id] = data.delivery;
                deliveryFactory.currentProjectDeliveries[data.delivery.id].task = deliveryFactory.currentProjectDeliveries[data.delivery.id].task.name;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        deliveryFactory.deleteDelivery = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete deliveryFactory.currentProjectDeliveries[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return deliveryFactory;
    }

})();