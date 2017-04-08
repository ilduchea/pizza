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
  return subtotal.toFixed(2);
};



Order.prototype.orderPrice = function () {
  var price = 0;
  this.totalCost.forEach(function(item) {
    price += parseFloat(item);
  });
  return price.toFixed(2);
};

// Pizza.prototype.listItems = function (selector) {
//   for (var j = 0; j < this.length - 2; j++) {
//     selector.append(`<li>${this[j]}</li>`);
//   };
// }; not working as expected

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
      newOrder.totalCost.push(pizzaPrice);


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

      // $(`.pizza${classIndex} h3`).last().click(function(){
      //   $(`.pizza${classIndex} ul`).toggleClass("hide");
      // });

      //Needs refactoring. clunky.
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].size}</li>`);
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].crust}</li>`);
      $(`.pizza${classIndex} ul`).append(`<li>${newOrder.pizza[index].sauce}</li>`);
      // newOrder.pizza[index].listItems($(`.pizza${classIndex} ul`)); not working
      newOrder.pizza[index].toppings.forEach(function(item) {
        $(`.pizza${classIndex} ul`).append(`<li>${item}</li>`);
      });
      index++;

      $("#total").show()
      $("#total span").text(newOrder.orderPrice());
    });

  });
});
