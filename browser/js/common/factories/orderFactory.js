app.factory('orderFactory', function ($http, AuthService, $q) {

  function getData (res) {
    return res.data;
  };

  function appendDetails(orderProduct){
    return $http.get('/api/products/' + orderProduct.productId)
    .then(getData)
    .then(function(product){
      orderProduct.name = product.name;
      orderProduct.description = product.description;
      orderProduct.photo = product.photo;
      orderProduct.id = product.id;
      return orderProduct;
    })
  }

  function getOrderProductsFromCache () {
    let orderProducts = localStorage.getItem("pokeMeatProducts")
    orderProducts = JSON.parse(orderProducts)
    if(!orderProducts) orderProducts = [];
    else orderProducts = Array.prototype.slice.apply(orderProducts)
    return orderProducts;
  }

  function setOrderProductsToCache (orderProducts) {
    orderProducts = JSON.stringify(orderProducts);
    localStorage.setItem('pokeMeatProducts', orderProducts);
  }

  return {
    updateQuantity: function (orderId, product, quantity) {
      return $http.put('/api/orders/'+ orderId, {
        product:product,
        quantity:quantity
      })
      .then(getData)
    },
    getAllOrderProducts: function (orderId) {
      return $http.get('/api/orders/' + orderId)
      .then(getData)
      .then(order => {
        return order.order_products})
      .then(function(orderProducts){
        return Promise.all(orderProducts.map(appendDetails))
      })
    },
    deleteOrderProduct: function (orderId, product) {
      if(!AuthService.isAuthenticated()) {
        let orderProducts = getOrderProductsFromCache();
        let index = -1;
        orderProducts.forEach(function (e, idx) {
          if(e.id === product.id){
            index = idx;
          }
        });
        let destroyedProduct = orderProducts.splice(index, 1);
        setOrderProductsToCache(orderProducts);
        return $q.when(destroyedProduct)
      }

      return $http.delete('/api/orders/'+ orderId + '/product/' + product.id)
      .then(getData)
    },
    addNewOrderProduct: function (orderId, product, quantity = 1) {
      if(!AuthService.isAuthenticated()) {
        
        let orderProducts = getOrderProductsFromCache()
        product['unit_price'] = product.price;
        console.log(product.unit_price)
        product['quantity'] = quantity;
        orderProducts.push(product);
        setOrderProductsToCache(orderProducts)        
        return $q.when(orderProducts)
      }
      
      return $http.post('/api/orders/'+orderId, {
        product:product,
        quantity:quantity
      })
    }
  }

})
