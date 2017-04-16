angular
  .module('quickvan.controllers')
  .controller('ClientTravelController', ClientTravelController);

ClientTravelController.$inject = [
  '$scope',
  '$state',
  '$ionicLoading',
  '$ionicActionSheet'
];

function ClientTravelController(
  $scope,
  $state,
  $ionicLoading,
  $ionicActionSheet
) {
  $scope.travels = [];

  $ionicLoading.show({
    template: 'Loading...'
  });

  setTimeout(function () {
    $ionicLoading.hide();
  }, 1000);

  $scope.doRefresh = doRefresh;
  $scope.openTravelDetail = openTravelDetail;

  function doRefresh() {
    setTimeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  }

  function openTravelDetail() {
    $state.go('client.view-travel');
  }
}
