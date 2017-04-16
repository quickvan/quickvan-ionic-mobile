angular
  .module('quickvan.controllers')
  .controller('ClientViewTravelController', ClientViewTravelController)
  .controller('ControllerViewTravelControlDescentralize', ControllerViewTravelControlDescentralize)
  .controller('ControllerViewTravelControlReload', ControllerViewTravelControlReload);

ClientViewTravelController.$inject = [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  '$ionicPopup',
  '$pusher',
  '$window',
  '$map',
  'uiGmapGoogleMapApi',
  'UserData'
];

function ClientViewTravelController(
  $scope,
  $stateParams,
  $ionicLoading,
  $ionicPopup,
  $pusher,
  $window,
  $map,
  uiGmapGoogleMapApi,
  UserData
) {
  var iconUrl = 'http://maps.google.com/mapfiles/kml/pal2';

  $scope.travel = {};
  $scope.map = $map;
  $scope.markers = [];

  $ionicLoading.show({
    template: 'Carregando...'
  });

  uiGmapGoogleMapApi.then(function () {
    $ionicLoading.hide();
  }, function () {
    $ionicLoading.hide();
  });

  setTimeout(function () {
    initMarkers({
      client: {
        zipcode: '12704000',
        city: 'Cruzeiro',
        state: 'SP',
        address: 'Rua Walter Pires Lemos'
      },
      hash: 'hash'
    });
  }, 1000);

  function initMarkers(travel) {
    var client = travel.client,
      address = client.zipcode + ', '
        + client.address + ', '
        + client.city + ' - '
        + client.state;

    createMarkerClient(address);
    watchPositionDriver(travel.hash);
  }

  function createMarkerClient(address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: address
    }, function (res, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = res[0].geometry.location.lat(),
          long = res[0].geometry.location.lng();

        $scope.markers.push({
          id: 'client',
          coords: {
            latitude: lat,
            longitude: long
          },
          options: {
            title: 'Localidade do motorista',
            icon: iconUrl + '/icon2.png'
          }
        });
      } else {
        $ionicPopup.alert({
          title: 'Atenção!',
          template: 'Não foi possível indentificar sua localidade :('
        });
      }
    });
  }

  function watchPositionDriver(channel) {
    var lat = -22.7331817,
        long = -45.1250391;

    if ($scope.markers.length == 1 || $scope.markers.length == 0) {
      $scope.markers.push({
        id: 'driver',
        coords: {
          latitude: lat,
          longitude: long
        },
        options: {
          title: 'Driver',
          icon: iconUrl + '/icon47.png'
        }
      });
      return;
    }

    for (var key in $scope.markers) {
      if ($scope.markers[key].id == 'driver') {
        $scope.markers[key].coords = {
          latitude: lat,
          longitude: long
        };
      }
    }

    /*
    var pusher = $pusher($window.client),
      channel = pusher.subscribe(channel);

    channel.bind('subscribe-hash', function (res) {
      var lat = res.geo.lat,
        long = res.geo.long;

      if ($scope.markers.length == 1 || $scope.markers.length == 0) {
        $scope.markers.push({
          id: 'driver',
          coords: {
            latitude: lat,
            longitude: long
          },
          options: {
            title: 'Driver',
            icon: iconUrl + '/icon47.png'
          }
        });
        return;
      }

      for (var key in $scope.markers) {
        if ($scope.markers[key].id == 'driver') {
          $scope.markers[key].coords = {
            latitude: lat,
            longitude: long
          };
        }
      }
    });
    */
  }

  function createBounds() {
    var bounds = new google.maps.LatLngBounds(),
      latlng;

    angular.forEach($scope.markers, function (value) {
      latlng = new google.maps.LatLng(Number(value.coords.latitude), Number(value.coords.longitude));
      bounds.extend(latlng);
      $scope.map.bounds = {
        northeast: {
          latitude: bounds.getNorthEast().lat(),
          longitude: bounds.getNorthEast().lng()
        },
        southwest: {
          latitude: bounds.getSouthWest().lat(),
          longitude: bounds.getSouthWest().lng()
        }
      };
    });
  }

  $scope.$watch('markers.length', function (value) {
    if (value == 2) {
      createBounds();
    }
  });

  setTimeout(function () {
    $('.button-fit').click();
  }, 1000);
}

ControllerViewTravelControlDescentralize.$inject = ['$scope', '$map'];

function ControllerViewTravelControlDescentralize($scope, $map) {
  $scope.map = $map,
  $scope.fit = function () {
    $scope.map.fit = !$scope.map.fit;
  };
}

ControllerViewTravelControlReload.$inject = ['$scope', '$window', '$timeout'];

function ControllerViewTravelControlReload($scope, $window, $timeout) {
  $scope.reload = function () {
    $timeout(function () {
      $window.location.reload(true);
    }, 100);
  };
}
