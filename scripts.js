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
function validation(id) {
	var valid = true;
	var quantity = $("#product-quantity-" + id).val();
	if (quantity == "" || quantity == 0) {
		valid = false;
	}
	return valid;
}

function checkOutShowBox() {
	$("#paynow-container").slideToggle();
}

function paynowValidation() {
	var valid = true;
	var customer_name = $("#customer_name").val();
	var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	$("#customer_name").css("border", "#2ecc71 1px solid");
	$("#error").html("").hide();
	if (customer_name == "" || customer_name.trim() == "") {
		$(".error").html(" required.").css({
			"color" : "#d96557",
			"margin" : "5px"
		}).show();
		$("#customer_name").css("border", "#d96557 1px solid");
		valid = false;
	}
	if (customer_name != "" && customer_name.trim() != ""
			&& !emailRegex.test(customer_name)) {
		$("#customer_name").css("border", "#d96557 1px solid");
		$("#error").html("Invalid email address.").css({
			"color" : "#d96557",
			"margin" : "5px"
		}).show();
		valid = false;
	}
	return valid;
}

function checkOut(cartCount) {
	if (cartCount > 1) {
		var valid = paynowValidation();
		if (valid == true) {
			var customerEmail = $("#customer_name").val();
			$("#paynow-btn").hide();
			$("#paynow-loader").show();
			$.ajax({
				url : "?checkout=check&mail=" + customerEmail,
				type : "GET",
				dataType : "html", // expect html to be returned
				success : function(response) {
					window.location.replace("?checkout=check-success");
					$("#paynow-btn").show();
					$("#paynow-loader").hide();
				},
				error : function(response) {
					window.location.replace("?checkout=check-error");
					console.log("#paynow-btn");
				}
			});
		}
	}
}

function deleteBySingleProduct(cartCount, index, id) {
	if (cartCount >= 1) {
		$.ajax({
			url : "?checkout=delete-single&index=" + index,
			success : function(response) {
				$("#tick-icon-" + id).hide();
				$("#add-to-button-" + id).show();
				$(".checkout-title-row").html(response);
			}
		});
	}
}

function addToCart(id) {
	var valid = validation(id);
	if (valid == true) {
		$("#add-to-cart-button-" + id).hide();
		$("#adding_load_" + id).removeClass("loader-hide");
		var product_id = $('#product-id-' + id).val();
		var quantity = $('#product-quantity-' + id).val();
		var product_title = $('#title-' + id).val();
		var product_price = $('#price-' + id).val();

		var query = "product_id=" + product_id + "&product_title="
				+ product_title + "&product_quantity=" + quantity
				+ "&product_price=" + product_price;
		if ($('#img-url-' + id).length > 0) {
			query += "&image_url=" + $('#img-url-' + id).val();
		}
		$.ajax({
			type : 'POST',
			data : query,
			url : "hera/ajax-end-point/add-to-cart-endpoint.php?cart=add",
			success : function(response) {
				$("#adding_load_" + id).addClass("loader-hide");
				$("#added_btn_" + id).removeClass("loader-hide");
				var productResp = $.parseJSON(response);
				$('#cart_counts').html(productResp[0]['count']);
				$('.display-message-foundation').remove();
				$('.display-success').remove();
				if (!document.getElementById('#gotocart_btn')) {
					$("#gotocart_btn").remove();
					$('#layout-sec').append(productResp[0]['goCart']);
					$("#gotocart_btn").delay(2000).fadeOut("slow");
				}
			}
		});
	}
}

function buyNow(id) {
	var valid = validation(id);
	if (valid == true) {
		var product_id = $('#product-id-' + id).val();
		var quantity = $('#product-quantity-' + id).val();
		var product_title = $('#title-' + id).val();
		var product_price = $('#price-' + id).val();
		var imageurl = $('#img-url-' + id).val();
		var redirectUrl = $('#redirect-url-' + id).val();
		var query = "product_id=" + product_id + "&product_title="
				+ product_title + "&product_quantity=" + quantity
				+ "&product_price=" + product_price;
		if ($('#img-url-' + id).length > 0) {
			query += "&image_url=" + $('#img-url-' + id).val();
		}
		$.ajax({
			type : 'POST',
			data : query,
			url : "hera/ajax-end-point/buynow-endpoint.php?cart=add",
			success : function(response) {
				$('#cart_counts').html(response);
				window.location.replace(redirectUrl);

			}
		});
	}
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

function updateQuantity() {
	var valid = true;
	var regex = /\./;

	$('.quantity-input').each(
			function() {
				if (!$.isNumeric($(this).val()) || $(this).val() == ""
						|| $(this).val() == 0 || regex.test($(this).val())
						|| $(this).val() < $(this).data("min")) {
					$($(this)).css("border", "1px solid #f59494");

					valid = false;
				}
			});

	if (valid == true) {
		var data = $('#frm-cart').serialize();
		$.ajax({
			type : 'POST',
			data : data,
			url : "index.php?cart=update",
			success : function(response) {
				$(".checkout-title-row").html(response);
			}
		});
	}
}

function hideCart() {
	$("#cartHide").slideToggle();
}