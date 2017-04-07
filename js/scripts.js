//Buisness Logic
function Order() {
  this.pizza = [];
  this.totalCost = [];
}

function Pizza(size, crust, sauce, toppings) {
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.toppings = toppings;
  this.cost;
}

var pizzaSize = {
  small: 5,
  medium: 7,
  large: 9,
  xLarge: 11,
}

Pizza.prototype.subtotal = function () {
  var userSize = this.size.toLowerCase();
  var size = parseInt(pizzaSize[userSize]);
  var toppings = parseFloat((this.toppings.length - 2) * 0.5);
  var subtotal = size + toppings;
  this.cost = subtotal;
  newOrder.totalCost.push(subtotal);
  return subtotal;
};

Order.prototype.orderPrice = function (array) {
  var price = array.reduce((a, b) => a + b, 0);
  this.totalCost = price;
  return price;
};

// Pizza.prototype.listItems = function (selector) {
//   for (var j = 0; j < this.length; j++) {
//     selector.append(`<li>${this[j]}</li>`);
//   };
// };

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
    var index = 0;

    $(".order").show();
    $("#create-pizza").hide();

    $("#add-pizza").click(function() {
      var newSize = $("select[name=size] option:selected").val();
      var newCrust = $("select[name=crust] option:selected").val();
      var newSauce = $("select[name=sauce] option:selected").val();
      var newTopping = $("input[name=toppings]:checked");
      var newToppings = getToppins(newTopping);
      var newPizza = new Pizza(newSize, newCrust, newSauce, newToppings);
      var classIndex = index + 1;

      newOrder.pizza.push(newPizza);
      var pizzaPrice = newOrder.pizza[index].subtotal();


      $(".pizzas").append(`<div class="pizza${classIndex}">` +
                            `<div class="row">` +
                              `<div class="col-sm-4">` +
                                `<h3>pizza${classIndex}</h3>` +
                                `<ul></ul>` +
                              `</div>` +
                              `<div class="col-sm-4">` +
                                `<h3 class="price">$${pizzaPrice}</h3>` +
                              `</div>` +
                            `</div>` +
                          `</div>`
      );

      //Needs refactoring. clunky.
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].size}</li>`);
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].crust}</li>`);
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].sauce}</li>`);
      newOrder.pizza[index].toppings.forEach(function(item) {
        $(`.pizza${classIndex} ul`).append(`<li>${item}</li>`);
      });


      index++;
    });

  });
});
