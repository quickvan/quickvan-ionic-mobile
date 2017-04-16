angular
  .module('quickvan.services')
  .factory('$map', MapService);

MapService.$inject = [];

function MapService() {
  return {
    center: {
      latitude: 0,
      longitude: 0,
    },
    zoom: 12
  };
}
