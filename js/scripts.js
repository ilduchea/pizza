//Buisness Logic
function Order() {
  this.pizza = [];
  this.totalCost;
}

function Pizza() {
  this.size;
  this.crust;
  this.suace;
  this.toppings = [];
  this.cost;
}

var pizzaSize = {
  small: 5,
  medium: 7,
  large: 9,
  xLarge: 11,
}

Pizza.prototype.subtotal = function (size, toppins) {
  var subtotal = size + toppings;
  return subtotal;
};

Order.prototype.orderPrice = function (array) {
  var price = array.reduce((a, b) => a + b, 0);
  return price;
};

//UI Logic
$(function(){



});
