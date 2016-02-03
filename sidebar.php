<!--menu bar at the right of the page-->
<script>
	var Sidebar = 
	{
		toggle:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=="on")
			{
				element.onmouseover=function(){Sidebar.activate()}
				setCookie('sidebar',0)
				element.className="off"
			}
			else
			{
				setCookie('sidebar',1)
				element.className="on"
			}
		},

		activate:function()
		{
			var element=document.querySelector('#sidebar')
			if(element.className=='off')
			{
				element.onmouseover="";
				this.toggle();
			}
		},
	}
</script>

<div id=sidebar class="<?php if($_COOKIE['sidebar']==1){echo "on";}else{echo "off";}?>" 
		ondblclick=Sidebar.toggle() 
		onmouseover=Sidebar.activate()
		>
	<style>
		div#sidebar{
			position:fixed;
			top:0; right:0; bottom:0;
			z-index:999;
			background:#def4ff;
			overflow:hidden;
			padding:0;margin:0;
			box-shadow: 5px 5px 5px 5px #888;
		}
		div#sidebar.off{width:35px;}
		div#sidebar.on{width:320px;}
		div#sidebar.on  div#sidecontent{display:block}
		div#sidebar.off div#sidecontent{display:none}
		div#sidebar.on{ transition:all 0.17s; }
		div#sidebar div{padding:0;margin:0}
		div#sidebar table{margin:0.7em}
		div#sidebar td, div#sidebar th {padding:0.3em}
		#sidebar.off #burger{color:#888}
		#sidebar.on  #burger{color:black}

		/*links*/
		<style> 
			#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none} 
		</style>
	</style>
	<span style=font-size:30px;cursor:pointer id=burger onclick=Sidebar.toggle()>&#9776;</span>
	<div id=sidecontent>
		<table>
			<tr><th colspan=4> <script> document.write(Global.General.Name) </script>
			<tr><td align=center><button>New</button>
			<td align=center><button>Open</button>
			<td align=center><button>Save</button>
			<td align=center><button>Clear</button>
		</table>

		<div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
		<div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

		<table>
			<tr><th>General
			<tr><td><a href=getStarted.php>General info</a>
			<tr><td><a href=configuration.php>Configuration</a>
			<tr><td><a href=selection.php>Advanced questions</a>
			<tr><td><a href=stages.php>Overview</a>
			<tr><th>Level 1
			<tr><td><a style=color:#00adef stage=water    href=edit.php?level=Water>Water supply</a>
			<tr><td><a style=color:#d71d24 stage=waste    href=edit.php?level=Waste>Wastewater</a>
			<tr><th>Level 2
			<tr><td><a style=color:#00adef stage=waterGen href=edit.php?level=Water&sublevel=General>Water energy</a>
			<tr><td><a style=color:#00adef stage=waterAbs href=edit.php?level=Water&sublevel=Abstraction>Water abstraction</a>
			<tr><td><a style=color:#00adef stage=waterTre href=edit.php?level=Water&sublevel=Treatment>Water treatment</a>
			<tr><td><a style=color:#00adef stage=waterDis href=edit.php?level=Water&sublevel=Distribution>Water distribution</a>
			<tr><td><a style=color:#d71d24 stage=wasteGen href=edit.php?level=Waste&sublevel=General>Wastewater energy</a>
			<tr><td><a style=color:#d71d24 stage=wasteCol href=edit.php?level=Waste&sublevel=Collection>Wastewater collection</a>
			<tr><td><a style=color:#d71d24 stage=wasteTre href=edit.php?level=Waste&sublevel=Treatment>Wastewater treatment</a>
			<tr><td><a style=color:#d71d24 stage=wasteDis href=edit.php?level=Waste&sublevel=Discharge>Wastewater discharge</a>
			<tr><th>Summary
			<tr><td><a href=summary.php?type=input>All Inputs</a>
			<tr><td><a href=summary.php?type=output>All Outputs</a>
			<tr><td><a href=graphs.php>Graphs</a>
			<tr><th>Other
			<tr><td><a href=todo.php>To do list</a>
		</table>
	</div>
</div>

<script>
	//go over <a stage=i> to deactivate the ones inactive
	function updateSidebar()
	{
		console.log('hello');
		var collection = document.querySelectorAll("#sidebar a[stage]")
		for(var i=0;i<collection.length;i++)
		{
			var stage = collection[i].getAttribute('stage');
			var isActive = Global.Configuration['Active Stages'][stage];
			if(!isActive)
			{
				collection[i].className="inactive";
			}
			else
			{
				collection[i].className="";
			}
		}
	}
	updateSidebar();
</script>
