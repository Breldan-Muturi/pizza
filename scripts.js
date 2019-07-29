filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


//Add active class to the current button(highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var totalOrderPrice=[];
function Placeorder(size, crust, topping){
	this.size=size;
	this.crust=crust;
	this.topping=topping;
	this.price=0;
}

var pizzaSize=["Regular","Medium","Large"];
var pizzaCrust = ["crispy","stuffed","gluten-free"];
var toppings=["cheese","pepperoni","pineapple","onion"];

Placeorder.prototype.costOfPizza=function(){
	if (this.size === pizzaSize[0]){
		this.price += 1000;
	} else if(this.size===pizzaSize[1]){
		this.price+= 1500;
	} else if (this.size===pizzaSize[2]){
		this.price+= 2000;
	}
	if (this.crust === pizzaCrust[0]){
		this.price += 0;
	} else if(this.crust===pizzaCrust[1]){
		this.price+= 0;
	} else if (this.crust===pizzaCrust[2]){
		this.price+= 0;
	}
	if (this.topping === toppings[0]){
		this.price += 150;
	} else if(this.topping===toppings[1]){
		this.price+= 100;
	} else if (this.topping===toppings[2]){
		this.price+= 100;
	}
	return this.price;
}
Placeorder.prototype.totalCost = function() {
 
	var shoppingCartTotal = 0;
	
	for (var order = 0; order < totalOrderPrice.length; order++) {
	
	  shoppingCartTotal += totalOrderPrice[order];
	}
	return shoppingCartTotal;
  }
  $(document).ready(function() {
	$(".submit").click(function() {
	  $(".contacts").toggle(2000);
	  
	});
	$(".additional-info").hide();
   
	
  
	$("form#customized-pizza").submit(function(event) {
	  event.preventDefault();
	  var customSize = $("select#size option:selected").val();
	  var customcrust = $("select#crust option:selected").val();
	  var customtopping = $("select#topping option:selected").val();
	  var newPizzaOrder = new Placeorder(customSize , customcrust , customtopping);
	  
	  // var totalOrderPrice = customSize + customcrust + customtopping;
  
	  newPizzaOrder.costOfPizza();
  
	  totalOrderPrice.push(newPizzaOrder.price);
  
  
  
	  $("#pizza-size").show();
	  $("#pizza-crust").show();
	  $("#pizza-topping").show();
	  $("#pizza-size").append("\t" + "\t" + customSize);
	  $("#pizza-crust").append("\t" + "\t" + customcrust);
	  $("#pizza-topping").append("\t" + "\t" + customtopping);
	  $("#final-cost").text("\t" + "\t" + newPizzaOrder.totalCost());
	  
	  var newRow = '<tr><th scope="row">' + newPizza.orderNo + '</th><td id="size">' + $("#pizza-size").text() + " - " + customSize + '</td><td id="crust">' + $("#pizza-crust").text() + " - " + customcrust + '</td><td id="topping">' + $("#pizza-topping").text() + " - " + customtopping + '</td><td id="final-cost">' + $("#final-cost").text()+" - "+ newPizzaOrder.totalCost() + '</td></tr>'
  
		$("#pizza").append(newRow);
	});
	$("#checkout-btn").click(function(event) {
	  event.preventDefault();
	  // location.reload(); 
	  $(".additional-info").show();
	  $(".additional-info h3 span").html(newPizzaOrder.totalCost());
	  
	});
	$("#reload").click(function(){
	  location.reload();
	});
  
	
  });