app.factory('UserFactory', function($http){

  let getData = function(result){
    return result.data;
  }

  return {
    fetchAllUserAddresses: function(userId){
      return $http.get('/api/users/'+ userId +'/addresses')
      .then(getData);
    },
    fetchAllUserOrders: function(userId){
      return $http.get('api/users/' + userId + '/orders')
      .then(getData);
    }
  }

});
