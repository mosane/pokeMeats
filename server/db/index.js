'use strict';
const db = require('./_db');
module.exports = db;

const User = require('./models/user');
const Products = require('./models/products')
const Orders = require('./models/orders')
const OrderProducts = require('./models/order_products')
const Address = require('./models/address')

User.hasMany(Orders);
Orders.belongsTo(User);
Orders.belongsToMany(Products, {through: OrderProducts});
Products.belongsToMany(Orders, {through: OrderProducts});
Orders.hasMany(OrderProducts);
OrderProducts.belongsTo(Orders);
User.belongsToMany(Address, {as: 'shippingAddresses', through:'shippingAddress'});
User.belongsToMany(Address, {as: 'billingAddresses', through:'billingAddress'});
User.hasMany(Address)