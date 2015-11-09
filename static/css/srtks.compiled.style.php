<?php
	require "./lessc.inc.php";
	$less = new lessc;
	echo $less->compileFile("./srtks.less");
?>