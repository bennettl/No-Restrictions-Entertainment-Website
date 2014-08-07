<?php
// Database information
define('DB_HOST' ,'nreDatabase.db.8378336.hostedresource.com');
define('DB_USER' ,'nreDatabase');
define('DB_PASS' ,'Nre2@7896321');
define('DB_NAME' ,'nreDatabase');

global $dbc;

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME) or die ("Can't connect to database ");
?>