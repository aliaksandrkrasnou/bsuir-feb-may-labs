<?php
	header('Content-Type: text/html; charset=utf-8');
 
	$db_host = 'localhost';
	$db_username = 'mysql';
	$db_password = 'mysql';
	$db_name = 'itrem';
	$db_charset = 'utf8';
 
	$is_connected = @mysql_connect($db_host, $db_username, $db_password);
	$is_db_selected = $is_connected ? @mysql_select_db($db_name) : FALSE; 
 
	$errors = array();
 
	if (!$is_connected) $errors[] = 'Не могу соединиться с базой данных';
	if (!$is_db_selected) $errors[] = 'Не могу найти базу данных';
 
	if (!empty($_POST['f_submit']) AND $is_connected AND $is_db_selected)
	{
		if (empty($_POST['f_text']) OR !trim($_POST['f_text']))
		{
			$errors[] = 'Не введен текст сообщения!';		
		}
		else
		{
			if (mb_strlen(trim($_POST['f_text']), 'utf-8')>255)
			{
				$errors[] = 'Текст сообщения не может превышать 255 символов!';
			}
			else
			{
				$sql = 'INSERT INTO `messages` SET
							`message`="'.mysql_real_escape_string(trim($_POST['f_text'])).'",
							`date`=NOW()
				';
 
				$result = mysql_query($sql) 
					  or die('Query error: <code>'.$sql.'</code>');
 
				Header('Location:?');
			}
		}
	}
?>
<html>
<head>
  <style type="text/css">
	body {font-size:11px; font-family:Arial;}
	.errors {color:red;}
	div.message {padding-bottom:5px; margin-bottom:5px; border-bottom:1px dotted silver;}
	div.message .date {color:blue;}
	div.message .text {color:green;}
  </style>
</head>
<body>
	<form action="?" method="post">
		Текст сообщения <input type="text" name="f_text" value="" />
		<input type="submit" name="f_submit" value="Отправить"/>
	</form>
<?php	
 
	if (!empty($errors))
	{
		echo '<hr /><ul class="errors">';
		foreach ($errors as $err)
		{
			echo '<li>'.htmlspecialchars($err).'</li>';
		}
		echo '</ul>';
	}
 
	if ($is_connected AND $is_db_selected)
	{
 
		$sql = 'SELECT * FROM `messages` ORDER BY `id` DESC';
		$result = mysql_query($sql) 
				  or die('Query error: <code>'.$sql.'</code>');
		if ( is_resource($result) ) 
		{
			echo '<hr />';
			while ( $row = mysql_fetch_assoc($result) )
			{
			?>
				<div class="message">
					<span class="date"><?=date('d.m.Y',strtotime($row['date']))?></span> -
					<span class="text"><?=htmlspecialchars($row['message'])?></span>
				</div>
 
			<?php
			}
		}
	}
 
?>
</body>
</html>