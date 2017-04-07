//Buisness Logic
function Order() {
  this.pizza = [];
  this.totalCost;
}

function Pizza(size, crust, sauce, toppings) {
  this.size = size;
  this.crust = crust;
  this.suace = sauce;
  this.toppings = toppings;
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
  this.cost = subtotal;
  return subtotal;
};

Order.prototype.orderPrice = function (array) {
  var price = array.reduce((a, b) => a + b, 0);
  this.totalCost = price;
  return price;
};

var getToppins = function (input) {
  var toppings = []
  $.each(input, function(){
      toppings.push($(this).val());
  });
  return toppings;
};

//UI Logic
$(function(){
  $("#create-pizza").click(function(){
    var newOrder = new Order();

    $(".order").show();
    $("#create-pizza").hide();

    $("#add-pizza").click(function() {
      var newSize = $("select[name=size] option:selected").val();
      var newCrust = $("select[name=crust] option:selected").val();
      var newSauce = $("select[name=sauce] option:selected").val();
      var newTopping = $("input[name=toppings]:checked");
      var newToppings = getToppins(newTopping);
      var newPizza = new Pizza(newSize, newCrust, newSauce, newToppings);

      console.log(newOrder);
      console.log(newPizza);
    });

  });
});
