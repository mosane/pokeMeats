app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html',
        resolve: {
            theUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            } 
        }
    });

});



