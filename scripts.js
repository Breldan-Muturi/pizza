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
function validation(id) {
	var valid = true;
	var quantity = $("#product-quantity-" + id).val();
	if (quantity == "" || quantity == 0) {
		valid = false;
	}
	return valid;
}

function increment_quantity(id) {
	var inputQuantityElement = $("#" + id);
	var newQuantity = parseInt($(inputQuantityElement).val()) + 1;
	$(inputQuantityElement).val(newQuantity);
}

function decrement_quantity(id) {
	var inputQuantityElement = $("#" + id);
	if ($(inputQuantityElement).val() > 1) {
		var newQuantity = parseInt($(inputQuantityElement).val()) - 1;
		$(inputQuantityElement).val(newQuantity);
	}
}