<?php
	$console = $_GET['console'];
	if($console == null)
	{
		echo "<h2>Console: null!</h2>";
	}else{
		echo "<h2>Console:</h2>";
		echo "<br>";
		echo "".$console;
	}
?>