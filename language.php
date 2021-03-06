<!--menu inside navbar.php-->

<style>
	/**container element*/
	#lang{
		position:absolute;
		right:2%;
		top:20px;
		cursor:pointer;
		z-index:99;
	}

	/**select element*/
	#lang #select{
		visibility:hidden;
		position:absolute;
		border:1px solid #ccc;
		right:0;
		top:100%;
		width:200px;
		background:#eeece4;
		transition:all 0.4s;
		box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 5px 10px 15px 5px rgba(0,0,0,.1);
	}

	/**show select element*/
	#lang:hover #select {
		visibility:visible;
	}

	/**languages*/
	#lang #select div[lang] {
		color:black;
		display:block;
		padding:0.5em;
	}

	/**languages mouse over*/
	#lang #select div[lang]:hover {
		background:orange;
	}
</style>

<!--container for language options-->
<div id=lang>
	<!--current language-->
	<?php
		//$lang is a global variable defined in languages/write.php
		echo "<img id=currentLang src='img/flags/$lang.png'";
	?>

	<!--all languages-->
	<div id=select> 
		<!--english-->
		<div lang=en>
			<img src="img/flags/en.png">
			en
		</div>

		<!--spanish-->
		<div lang=es>
			<img src="img/flags/es.png">
			es
		</div>
	</div> 
</div>

<script>
	//Add an onclick listener to each language
	(function()
	{
		var langs = document.querySelectorAll('#lang #select div[lang]');

		for(var i=0; i<langs.length; i++)
		{
			var lang=langs[i].getAttribute('lang');
			langs[i].setAttribute('onclick',"Language.set('"+lang+"')")
		}

	})();

	var Language = {}; //namespace

	Language.set = function(lang)
	{
		console.log(lang);
		setCookie('lang',lang);
		window.location.reload();
	}
</script>
