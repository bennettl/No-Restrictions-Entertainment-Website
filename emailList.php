<?php  require_once('common/connect.php'); 
echo '
<html>
<head>'
?>
<style type="text/css">
		#emailTable{
			border-collapse:collapse;
		}
		td, th{
			border: 1px solid black;
			padding: 5px;
		}
</style>
<?php
echo '
</head>
<body>
	<h2> Email List Table </h2>
	<table id="emailTable">
		<tr>
			<th>Email List ID</th>	
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
		</tr>';

	// Display email table
	$select = "SELECT * FROM email";
	$result = mysqli_query($dbc, $select);
	while ($row = mysqli_fetch_assoc($result)){
		echo '
		<tr>
			<td>'.$row['email_id'].'</td>
			<td>'.$row['first_name'].'</td>
			<td>'.$row['last_name'].'</td>
			<td>'.$row['email'].'</td>
		</tr>';

	}

	echo'
		<tr></tr>
	</table>
</body>
</html>';

// Does email exists on db. Returns boolean True means yes, False means no
function emailExist($email){
	global $dbc;
	$select   = "SELECT email FROM email WHERE email = '$email'";
	$result   = mysqli_query($dbc,$select);

	return  (mysqli_num_rows($result) > 0) ? true : false;
}
?>

