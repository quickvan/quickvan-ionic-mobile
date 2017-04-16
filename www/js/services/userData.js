angular
  .module('quickvan.services')
  .factory('UserData', UserDataService);

UserDataService.$inject = ['$localStorage'];

function UserDataService($localStorage) {
  var key = 'user';
  return {
    set: function (value) {
      return $localStorage.setObject(key, value);
    },
    get: function () {
      return $localStorage.getObject(key);
    }
  }
}
