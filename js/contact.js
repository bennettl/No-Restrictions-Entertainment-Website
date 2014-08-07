function contact(){
	contactForm();
	signupForm();
	placeHolder();
}

// When #contactForm is submitted when send a post request and #contactNoti is displayed in contact.php
function contactForm(){
	$("#contactForm").live('submit', function(){
		var errorMsg  = "";
		var formInfo  = $(this).serialize() + "&contactForm=true";
		var name      = $("[name='name']").val().replace(/\s/g,"");
		var email     = $("[name='email']").val().replace(/\s/g,"");
		var message   = $("[name='message']").val().replace(/\s/g,"");
		var info      = {"name":name, "email":email, "message":message};
		// If validateFields has a return value, then there is an errorMsg
		if (validateContact(info)){
			errorMsg = validateContact(info);
			$("#contactForm .errorMsg").text(errorMsg).css('color','red').show();
		} else{
			$.post('ajax.contact.php',formInfo);
			$("[name='name']").val('Name').addClass('inactive');
			$("[name='email']").val('Email').addClass('inactive');
			$("[name='message']").val('Message').addClass('inactive');
			$("#contactForm .errorMsg").text("Message Sent!").css('color','white').show();
		} 
		return false;
	});
}

function signupForm(){
// When #signUpForm is submitted, validate the form
	$("#signUpForm").live('submit', function(){
		var errorMsg   = "";
		var firstname  = $("[name='first name']").val();
		var lastname   = $("[name='last name']").val();
		var email      = $("[name='email ']").val();
		var info       = {"firstname":firstname, "lastname":lastname, "email":email, "signUp":"true"};
		// If validateFields has a return value, then there is an errorMsg
		if (validateFields(info)){
			errorMsg = validateFields(info);
			$("#signUpForm .errorMsg").text(errorMsg).css('color','red').show();
		} else{
			// Push information to server
			$.post('ajax.contact.php',info, function(data){
				var success = data.success;
				// If sucessful, empty fields, else notified user of error 
				if (success == "yes"){
					$("#signUpForm .errorMsg").text('Thanks for signing up!').css('color','white').show();
					$("[name='first name']").val('First name').addClass('inactive');
					$("[name='last name']").val('Last name').addClass('inactive');
					$("[name='email ']").val('Email ').addClass('inactive');
				} else{
					errorMsg = data.response;
					$("#signUpForm .errorMsg").text(errorMsg).show();
				}
			},'json');

		}
		return false;
	});

}

// Handles placeholder text
function placeHolder(){
	$(".inputText, textarea").live('focus',function(){
		var $this = $(this);
		var value = $(this).val();
		var name = $(this).attr('name').capitalize();

		// If value is equal to name
	 	if (value == name){ 
			$(this).removeClass('inactive');
	 		$this.val('');
	 	};
	});

	$(".inputText, textarea").live('blur',function(){
		var $this = $(this);
		var value = $(this).val();
		var name = $(this).attr('name').capitalize();
		// If user didnt enter anything on blue
	 	if (value == '') { 
			$(this).addClass('inactive');
	 		$this.val(name);
	 	};
	});
}

// Returns errorMsg if not valid
function validateContact(info){
	errorMsg = '';

	// Max length validation
	if (info['name'].toLowerCase() == 'name'){
		errorMsg = "Please enter a name";
	}
	if (info['email'].toLowerCase() == 'email'){
		errorMsg = "Please enter an email";
	}
	if (info['message'].toLowerCase() == 'message'){
		errorMsg = 'Please enter a message';
	}

	// Regex validation for names
	var reg = /^[a-zA-z]{1,60}$/
	if (reg.test(info['name']) == false){
		errorMsg = "Name must container only letters A-Z.";
	}
	// Regex validation for email
	var reg = /^([A-Za-z0-9_\-\.]){3,}\@([A-Za-z0-9_\-\.]){3,}\.([A-Za-z]{2,4})$/;
	if (reg.test(info['email']) == false){
		errorMsg = "Invalid email address";
	}

	// If there are no error message, return false, else return true
	return (errorMsg == '') ? false : errorMsg;
}
// Returns errorMsg if not valid
function validateFields(info){
	errorMsg = '';

	// Max length validation
	if (info['firstname'].toLowerCase() == 'first name'){
		errorMsg = "Please enter a first name";
	}
	if (info['lastname'].toLowerCase() == 'last name'){
		errorMsg = "Please enter a last name";
	}
	if (info['email'].toLowerCase() == 'email'){
		errorMsg = "Please enter an email";
	}

	// Regex validation for names
	var reg = /^[a-zA-z]{1,60}$/
	if (reg.test(info['firstname']) == false){
		errorMsg = "Invalid first name. Must container only letters A-Z. No spaces";
	}
	if (reg.test(info['lastname']) == false){
		errorMsg = "Invalid last name. Must container only letters A-Z. No spaces.";
	}

	// Regex validation for email
	var reg = /^([A-Za-z0-9_\-\.]){3,}\@([A-Za-z0-9_\-\.]){3,}\.([A-Za-z]{2,4})$/;
	if (reg.test(info['email']) == false){
		errorMsg = "Invalid email address";
	}

	// If there are no error message, return false, else return true
	return (errorMsg == '') ? false : errorMsg;
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

