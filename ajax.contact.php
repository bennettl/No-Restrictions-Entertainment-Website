<?php
require_once('common/connect.php');
$to = "info@norestrictionsent.com";
 // $to = "bennettl908@yahoo.com";
global $dbc, $errorMsg;

// if contact isset, then we send email
if (isset($_POST['contactForm'])){
	$subject    = "Contact";
	$fullName	= htmlentities($_POST['name']);
	$msg	 	= $fullName. " says \n\n".trim($_POST['message']);
	$header     = "From:".$fullName."<".htmlentities(trim($_POST['email'])).">";
	mail($to,$subject,$msg,$header);
}
;

// When signUp isset, create a new user and sign him up
if (isset($_POST['signUp'])){
	$first_name = $_POST['firstname'];
	$last_name  = $_POST['lastname'];
	$email      = $_POST['email'];
	$args 		= array('firstname' => $first_name, 'lastname' => $last_name, 'email' => $email);

	// If there are no errors, then insert info, else send error mesage
	if (valid($args)){
		//Insert user info into db 
		$insert = "INSERT INTO email (first_name, last_name, email) VALUES ('$first_name', '$last_name', '$email')";
		mysqli_query($dbc,$insert) or die ("Cant insert");	
		//sendEmail($args); // Send activation email
		$data['success']  = "yes";
	} else{
		$data['success']  = "no";
		$data['response'] = $errorMsg; 
	} 
	echo json_encode($data);
}

function valid($args){
	global $errorMsg;
	// Name validation
	$pattern   = "/[A-Za-z]+$/";
	if (!preg_match($pattern,$args['firstname'])){
		$errorMsg = "Invalid first name";
		return false;
	}
	if (!preg_match($pattern,$args['lastname'])){
		$errorMsg = "Invalid last name";
		return false;
	}
	// Email validation
	$emailPattern = "/^([A-Za-z0-9_\-\.]){3,}\@([A-Za-z0-9_\-\.]){3,}\.([A-Za-z]{2,4})$/";
	if (!preg_match($emailPattern,$args['email'])){
		$errorMsg = "Invalid email address";
		return false;
	}

	// Make sure email does not extist
	if (emailExist($args['email'])){
		$errorMsg = 'Email already exits in database';
		return false;
	}

	return true;
}

// Does email exists on db. Returns boolean True means yes, False means no
function emailExist($email){
	global $dbc;
	$select   = "SELECT email FROM email WHERE email = '$email'";
	$result   = mysqli_query($dbc,$select);
	return  (mysqli_num_rows($result) > 0) ? true : false;
}

// This function sends the activiation email
function sendEmail($args){
	$to      = $args['email'];
	$subject = "Newsletter Subscription";
	$msg     = "Dear ".$args['firstname'].", \n\n Thank you for signup up with No Restrctions Entertainment newsletter!.\n\nFrom\nThe NRE Team";
	$header  = "From:info@norestrictionsent.com";
	mail($to,$subject,$msg,$header);
		
}
?>