(function() {
  app.controller('MainCtrl', MainCtrl);
  
  MainCtrl.$inject = ['$scope', 'ApiService'];
  // mainCtrl.$injector('$scope');
  function MainCtrl ($scope, ApiService) {
    var vm = this;
    vm.selectedBank = null;
    vm.selectedCity = null;
    vm.oldSelectedBank = null;
    vm.branches = [];
    vm.isFetchingBranches = false;

    // initialize controller
    var init = function () {
      var promise = ApiService.getBanks();
      promise.then(function(response) {
        vm.banks = response.data;
      })
    }

    // fetch cities based on bank
    vm.getCities = function (item) {
      // We dont want to make api call if user has selected same bank again as we already have cities of that bank
      if(item != vm.oldSelectedBank) {
        vm.selectedCity = null;
        var params = {bank_id: vm.selectedBank.id};
        var promise = ApiService.getCities(params);
        promise.then(function (response) {
          vm.cities = response.data;
        });
        vm.oldSelectedBank = item;
      }
    }

    // fetch branches based on city and bank 
    vm.selectCity = function (item) {
      vm.branches = [];
      vm.isFetchingBranches = true;
      var params = {bank_id: vm.selectedBank.id, city: item};
      var promise = ApiService.getBranches(params);
      promise.then(function (response) {
        vm.branches = response.data;
        vm.isFetchingBranches = false;
      })
    }

    init();
  }


})()