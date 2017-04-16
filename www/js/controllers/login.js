angular
  .module('quickvan.controllers')
  .controller('LoginController', LoginController);

LoginController.$inject = [
  '$scope',
  '$ionicPopup',
  '$state',
  'UserData'
];

function LoginController(
  $scope,
  $ionicPopup,
  $state,
  UserData
) {
  var clientUser = {
    name: 'Cliente',
    username: 'cliente',
    email: 'cliente@email.com',
    password: '123456'
  };

  var driverUser = {
    name: 'Motorista',
    username: 'motorista',
    email: 'motorista@email.com',
    password: '123456'
  };

  $scope.login = login;

  function login(username, password) {
    if (username === clientUser.email && password === clientUser.password) {
      UserData.set(clientUser);
      $state.go('client.travel');
      return ;
    }

    if (username === driverUser.email && password === driverUser.password) {
      UserData.set(driverUser);
      $state.go('driver.travel');
      return ;
    }

    $ionicPopup.alert({
      title: 'Atenção!',
      template: 'Usuário ou senha inválido.'
    });
  }
}
