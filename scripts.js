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
function openCheckOut() {
  document.getElementById("checkout").style.display = "block";
}

function closeCheckOut() {
  document.getElementById("checkout").style.display = "none";
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
	var inputQuantity = $("#" + id);
	var newQuantity = parseInt($(inputQuantity).val()) + 1;
	$(inputQuantity).val(newQuantity);
}

function decrement_quantity(id) {
	var inputQuantity = $("#" + id);
	if ($(inputQuantity).val() > 0) {
		var newQuantity = parseInt($(inputQuantity).val()) - 1;
		$(inputQuantity).val(newQuantity);
	}
}
function addCartPizza(){
	document.getElementById("summary").innerHTML = "BBQ CHICKEN-1000";	
}
function confirmationPopUp(){
	alert("Thank you Trevor for choosing Turi's Pizza. Your pizza will be at your door in 1 hour.")
}