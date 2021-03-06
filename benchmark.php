<!doctype html><html><head>
	<?php include'imports.php'?>

	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

	<style>
		body {background:#bdbdbd}
		h1{background:white}
		div.bm {
			border:1px solid #ccc;
			margin:10px;
			padding:5px;
		}
		div.card {margin:20px}
		pre.prettyprint {border:none;margin:5px;padding:5px}
	</style>

	<script>
		var Bm = {};

		Bm.getCodes = function(prefix)
		{
			var codes = new Array();
			for(var f in RefValues)
				if(f.search("^"+prefix)>-1) 
					codes.push(f);
			return codes
		}

		function printDiv(prefix)
		{
			var stage;
			switch(prefix)
			{
				case "wsa": stage="Water Abstraction";break;
				case "wst": stage="Water Treatment";break;
				case "wsd": stage="Water Distribution";break;
				case "wwc": stage="Wastewater Collection";break;
				case "wwt": stage="Wastewater Treatment";break;
				case "wwd": stage="Wastewater Discharge";break;
				case "wsg": stage="Water";break;
				case "wwg": stage="Wastewater";break;
			}

			document.write("<div class='card '>"+
				"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
				stage+"</span></div>"+
				"");

			var codes = Bm.getCodes(prefix);
			codes.forEach(function(code)
			{
				document.write("<div class='card folded'>"+
					"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
						translate(code+"_descr")+
						" (<a href='variable.php?id="+code+"'>"+code+"</a>) "+
					"</span></div>"+
					"<pre class='prettyprint'>"+
					RefValues[code].toString()+
					"</pre>"+
				"</div>")
			});
			if(codes.length==0){document.write('empty')}
			document.write("</div>")
		}

		function printLevel(prefixArray,name)
		{
			document.write("<div class='card '>"+
				"<div class=menu onclick=this.parentNode.classList.toggle('folded')><button></button> "+
				name+"</span></div>");

			prefixArray.forEach(function(prefix){printDiv(prefix)});
			document.write("</div>")
		}

		function printAll()
		{
			printLevel(['wsa','wst','wsd'],"Water");
			printLevel(['wwc','wwt','wwd'],"Wastewater");
			printLevel(['wsg','wwg'],"Energy");
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Variables Benchmarked</h1>

<!--main-->
<div id=main style="text-align:left">

	<div style="margin-top:1em;text-align:center">
	<button onclick=unfoldAll()>Unfold all</button>
	<button onclick=foldAll()>Fold all</button>
	</div>

	<script>
		function unfoldAll()
		{
			var elements = document.querySelectorAll('div.card.folded');
			for(var i=0;i<elements.length;i++)
				elements[i].classList.remove('folded');
		}
		function foldAll()
		{
			var elements = document.querySelectorAll('div.card');
			for(var i=0;i<elements.length;i++)
				elements[i].classList.add('folded');
		}
	</script>
	<script>printAll()</script>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
