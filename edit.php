<?php
	/* edit.php this page lets the user modify inputs and see automatically the outputs */

	if(!isset($_GET['level'])){die("ERROR: stage not specified");}

	/**
	  * Process input:
	  *  - $level: 	   mandatory {"Water","Waste","UWS"}
	  *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	  */

	$level=$_GET['level'];
	$sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;

	//if someone tries to go "General" (i.e. from variable.php?id=Days)
	if($level=="General") { header("Location: getStarted.php"); }
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body{background:#F5ECCE}
		td.input input {text-align:right;margin:0;padding:0;width:95%;height:100%}
		td.input {width:80px;text-align:right;color:#666;cursor:cell;line-height:1em}
		tr:not([hl=yes]) td.input {background-color:#eee;}

		table#inputs tr:hover  {background:#ccc;}

		table#outputs tr:hover {background:#ccc;}
		table#outputs th:not(.tableHeader) {background:#c9ab98}
		table#outputs th:nth-child(n+2) {text-align:right}
		table#outputs td:nth-child(n+2) {text-align:right}

		table#nrgOutputs th:not(.tableHeader) {background:#c9ab98}
		table#nrgOutputs th:nth-child(2) {text-align:right}
		table#nrgOutputs td:nth-child(2) {text-align:right}

		table#otherOutputs th:not(.tableHeader) {background:#c9ab98}
		table#otherOutputs th:nth-child(2) {text-align:right}
		table#otherOutputs td:nth-child(2) {text-align:right}
		<?php
			if($level=="Waste")
			{?>
				table#inputs th:not(.tableHeader) {background:#d71d24}
				#inputs a,#inputs a:visited{color:#d71d24}
				#outputs a,#outputs a:visited{color:#d71d24}
				#otherOutputs a,#otherOutputs a:visited{color:#d71d24}
				#nrgOutputs a,#nrgOutputs a:visited{color:#d71d24}
			<?php }
		?>
		th.tableHeader
		{
			background:white;
			color:#666;
			font-size:15px;
			padding:0.7em 0 0.2em 0;
			font-weight:normal;
			border:none;
			text-align:left;
		}
	</style>

	<script>
		/** 
		  * Note: Try to follow JSdoc structure (http://usejsdoc.org/about-getting-started.html) 
		  *
		  */

		<?php
			//establish the stage we are going to be focused
			if($sublevel)
			{
				echo "
					var CurrentLevel = Global['$level']['$sublevel'];
					var substages = Substages['$level']['$sublevel'];";
			}
			else
			{
				echo "var CurrentLevel = Global['$level'];";
			}
		?>

		//remove a variable from the data structure which is no longer inside
		function removeGhost(field)
		{
			CurrentLevel[field]=undefined;
			init();
		}

		/** 
		 * Transform a <td> cell to a <input> to make modifications in the Global object
		 * @param {element} element - the <td> cell
		 */
		function transformField(element)
		{
			element.style.padding=0
			element.removeAttribute('onclick')
			var field=element.parentNode.getAttribute('field')
			element.innerHTML=""
			var input=document.createElement('input')
			input.id=field
			input.classList.add('input')
			input.autocomplete='off'
			input.onblur=function(){updateField(field,input.value)}
			input.onkeypress=function(event)
			{ 
				if(event.which==13)input.onblur() //somehow creates an error but does not affect to anything
			}
			//value converted
			var multiplier = Units.multiplier(field);
			var currentValue = CurrentLevel[field]/multiplier;
			input.value=currentValue
			input.onkeydown=function(event)
			{
				switch(event.which)
				{
					case 38: input.value++;break;
					case 40: input.value--;break;
					case 9: //TAB
						setTimeout(function()
						{
							var el=document.querySelector('#inputs tr[field='+field+']').nextSibling.childNodes[1];
							if(el)
								el.onclick();
						},100);
						break;
				}
			}
			element.appendChild(input)
			input.select()
		}

		/** Redisplay table id=inputs */
		function updateInputs()
		{
			var t=document.getElementById('inputs')
			while(t.rows.length>2){t.deleteRow(-1)}
			for(var field in CurrentLevel)
			{
				/*first check if function*/
				if(typeof(CurrentLevel[field])!="number")
				{
					/*then, check if is calculated variable "c_xxxxxx" */
					if(field.search(/^c_/)==-1) continue;
				}

				//equation not clear, tbd in v2
				if(field=="c_ww_in_dilution")continue;

				/*check if field is level3 specific*/if(Level3.isInList(field)) continue;

				//bool for if current field is a calculated variable (CV)
				var isCV = field.search(/^c_/)!=-1;

				/*new row*/var newRow=t.insertRow(-1);

				/*background*/if(isCV){newRow.classList.add('isCV');}

				/*hlInputs for formula and show formula, only if CV*/
				if(isCV)
				{
					var formula = CurrentLevel[field].toString();
					var prettyFormula = Formulas.prettify(formula);
					newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');
					newRow.setAttribute('title',prettyFormula);
				}
				else{
					newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+field+'",CurrentLevel,1)');
					newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+field+'",CurrentLevel,0)');
				}
				
				/*new ro attribute field=field>*/
				newRow.setAttribute('field',field);

				/*disable row according to questions*/
				if(Questions.isHidden(field))
				{
					disableRow(newRow);
				}

				/*description*/ 
				var newCell=newRow.insertCell(-1);

				newCell.setAttribute('title', translate(field+"_expla"));
				newCell.style.cursor='help';

				newCell.innerHTML=(function()
				{
					//implementing translation:
					var description = translate(field+"_descr");
					var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				//editable cell if not CV
				var newCell=newRow.insertCell(-1);
				if(!isCV)
				{
					if(typeof(substages)=="object" && substages.length > 1)
					{
						//this means you are in level 2 and you should NOT be able to modify inputs here
						newCell.style.cursor='help';
						newCell.title="<?php write('#variable_go_to_substages')?>";
					}
					else
					{
						newCell.className="input";
						newCell.title="<?php write('#edit_click_to_modify')?>";
						newCell.setAttribute('onclick','transformField(this)');
					}
				}
				else //add an annotation 
				{
					newCell.title=Formulas.prettify(CurrentLevel[field].toString());
				}

				/*value*/
				newCell.innerHTML=(function()
				{
					var value = isCV ? CurrentLevel[field]() : CurrentLevel[field];
					value/=Units.multiplier(field);
					value=format(value);
					return value
				})();

				//check if this cv has estimated data
				var ed=DQ.hasEstimatedData(field) ? " <span title='<?php write('#variable_this_equation_contains_estimated_data')?>' class=estimated>&#9888;</span>" : "";
				newCell.innerHTML+=ed;

				//unit
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(!Info[field])
						return "<span style=color:#ccc>no unit</span>";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}

					if(isCV) 
					{
						return Info[field].unit;
					}
					else
					{
						var str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
						if(Units[Info[field].magnitude]===undefined)
						{
							return Info[field].unit
						}
						var currentUnit = Global.Configuration.Units[field] || Info[field].unit
						for(var unit in Units[Info[field].magnitude])
						{
							if(unit==currentUnit)
								str+="<option selected>"+unit+"</option>";
							else
								str+="<option>"+unit+"</option>";
						}
						str+="</select>"
						return str
					}
				})();
				//data quality
				newRow.insertCell(-1).innerHTML=(function()
				{
					if(isCV) { return "Calculated" }
					else
					{
						var select=document.createElement('select');
						select.setAttribute('onchange','DQ.update("'+field+'",this.value)');
						['Actual','Estimated'].forEach(function(opt)
						{
							var option=document.createElement('option');
							select.appendChild(option);
							option.value=opt;
							option.innerHTML=translate(opt);
							if(Global.Configuration.DataQuality[field]==opt)
							{
								option.setAttribute('selected',true);
							}
						});
						return select.outerHTML;
					}
				})();
			}

			//here check if table is empty (==t.rows.length is 2)
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#ccc>No inputs</span>";

			//bottom line decoration with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',4)
			newTh.style.borderBottom='none';
			newRow.appendChild(newTh);
		}

		/** Redisplay table id=outputs */
		function updateOutputs()
		{
			var t=document.getElementById('outputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue;
				if(field.search(/^c_/)>=0)continue;
				if(field.search("_KPI_GHG")==-1)continue;

				//hidden ones
				if(field=="ww_KPI_GHG_ne")    continue;
				if(field=="ww_KPI_GHG_ne_unt")continue;
				if(field=="ww_KPI_GHG_ne_tre")continue;

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}
				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				//disable row if specified by questions
				if(Questions.isHidden(field)) disableRow(newRow);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the ABSOLUTE value, not normalized
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description and code*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());
				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var code = "<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*value per things*/
				newCell=newRow.insertCell(-1)
					//the first cell will be the value divided by Years
				newCell.setAttribute('title',"("+prettyFormula+")/Years");
				newCell.innerHTML=(function()
				{
					return format(value/Global.General.Years());
				})();

				/*Normalization*/
				(function()
				{
					var level    = '<?php echo $level?>';
					var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';
					//value per resident population
					//value per serviced population
					//value per water volume
					['reside','servic','volume'].forEach(function(category)
					{
						var newCell=newRow.insertCell(-1);

						//determine the field to be highlighted
						var hlfield = (sublevel=='false' || category=='reside' || category=='servic') ? Normalization[level][category] : Normalization[level][sublevel][category];
						newCell.setAttribute('onmouseover',"Formulas.hlField('"+hlfield+"',1)")
						newCell.setAttribute('onmouseout',"Formulas.hlField('"+hlfield+"',0)")

						//the formula shoud change adding "/hlfield"
						newCell.title="("+newCell.parentNode.title+")/"+hlfield;

						newCell.innerHTML=(function()
						{
							//special cases: corinne request
							if(category!='reside' && field.search('_unt')>=0) 
							{
								newCell.title="NA";
								return "<span style=color:#ccc>NA</span>";
							}
							if(field=="ww_KPI_GHG")
							{
								//we have to subtract the untreated from the total
								var minus_untreated = Global.Waste.ww_KPI_GHG() - Global.Waste.ww_KPI_GHG_ne_ch4_unt() - Global.Waste. ww_KPI_GHG_ne_n2o_unt();
								newCell.title="custom formula";

								if(category=='servic')
								{
									return format(minus_untreated/Global.General.Years()/Global.Waste.ww_serv_pop);
								}
								if(category=="volume")
								{
									return format(minus_untreated/Global.Waste.ww_vol_wwtr);
								}
							}

							var norm=Normalization.normalize(category,field,level,sublevel);

							//the fields per inhab and per serv.pop are also per year
							if(category=="reside" || category=="servic")
							{
								norm/=Global.General.Years();
								newCell.title+="/Years"
							}
							return format(norm);
						})();
					});

					//if wastewater, also normalize for bod 
					if(level=="Waste")
					{
						newCell=newRow.insertCell(-1);
						newCell.setAttribute('onmouseover',"Formulas.hlField('c_ww_bod_rmvd',1)")
						newCell.setAttribute('onmouseout', "Formulas.hlField('c_ww_bod_rmvd',0)")
						newCell.title=newCell.parentNode.title+"/c_ww_bod_rmvd";
						newCell.innerHTML=(function()
						{
							//special case corinne request
							if(field.search('_unt')>=0) return "<span style=color:#ccc>NA</span>";
							if(field=="ww_KPI_GHG")
							{
								newCell.title="custom formula";
								//we have to subtract the untreated from the total
								var minus_untreated = Global.Waste.ww_KPI_GHG() - Global.Waste.ww_KPI_GHG_ne_ch4_unt() - Global.Waste. ww_KPI_GHG_ne_n2o_unt();
								minus_untreated/=Global.Waste.c_ww_bod_rmvd();
								return format(minus_untreated);
							}
							var value = CurrentLevel[field]()/Units.multiplier(field);
							value/=Global.Waste.c_ww_bod_rmvd();
							return format(value);
						})();
					}
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999>There are no GHG formulas in this level</span>";

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',7)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		function updateNrgOutputs()
		{
			var t=document.getElementById('nrgOutputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue;
				if(field.search(/^c_/)!=-1)continue;
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')<0)continue;

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) disableRow(newRow);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the value
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*circle indicator 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.innerHTML=(function()
				{
					var hasIndicator=RefValues.hasOwnProperty(field);
					if(hasIndicator)
					{
						var indicator=RefValues[field](value);
						newCell.title=indicator;
						var color;
						switch(indicator)
						{
							case "Good":           color="#af0";break;
							case "Acceptable":     color="orange";break;
							case "Unsatisfactory": color="red";break;
							case "Out of range":   color="brown";break;
							default:               color="#ccc";break;
						}
						return "<span style='font-size:20px;color:"+color+"'>&#128308;</span>";
					}
					else{
						newCell.title='<?php write('#edit_no_indicator_associated')?>';
						return "<span style=color:#ccc>NA</span>";
					}
				})();
				*/

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999>There are no formulas in this level</span>";

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		function updateOtherOutputs()
		{
			var t=document.getElementById('otherOutputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function"){continue;}
				if(field.search(/^c_/)!=-1){continue;}
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')>-1)continue;

				/*these equations are still not clear (tbd in v2)*/
				if(field=="ww_SL_dilution")continue; 
				if(field=="ww_SL_dil_emis")continue; 
				/**/

				/*check if field is level3 specific*/
				if(Level3.isInList(field)){continue;}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field)) disableRow(newRow);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute now the value for creating the indicator
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.style.cursor='help';
				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{

					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated title='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";

					// level 2 warnings
					var l2w = Level2Warnings.isIn(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";

					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
				t.insertRow(-1).insertCell(-1).innerHTML="<span style=color:#999><?php write('#edit_no_formulas')?></span>";

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		/**
		 * Update a field from the Global object
		 * @param {string} field - The field of the CurrentLevel object
		 */
		function updateField(field,newValue)
		{
			newValue=parseFloat(newValue)
			if(isNaN(newValue))newValue=0
			CurrentLevel[field]=newValue*Units.multiplier(field)
			init()
		}

		//depending on stage, draw different charts
		function drawCharts()
		{
			<?php
				if($sublevel || $level=="Energy")
				{
					//old L2
					echo "Graphs.graph5(false,'graph');";
				}
				else
				{
					//old L1
					echo "Graphs.graph4(false,'graph');";
				}
			?>
		}

		function updateFuelSelection()
		{
			var rows = document.querySelectorAll('#fuelSelection tr[question]')
			for(var i=0;i<rows.length;i++)
			{
				var row = rows[i];
				if(row==null)continue;
				var question = row.getAttribute('question');

				//empty the row
				while(row.cells.length>1){row.deleteCell(-1);}

				//create new select menu
				var select = document.createElement('select');
				row.insertCell(-1).appendChild(select);
				select.setAttribute('onchange',"Global.Configuration.Selected.FuelType['"+question+"']=this.value;init()");

				//disable the row if question is NO
				if(Global.Configuration["Yes/No"][question]==0)
				{
					select.disabled=true;
					select.parentNode.parentNode.title="<?php write('#inactive')?>";
					select.parentNode.parentNode.className="inactive"
				}
				else
					select.parentNode.parentNode.className=""

				//go over fuel types
				for(var fuel in Tables['Fuel types'])
				{
					var option = document.createElement('option');
					option.innerHTML=fuel;
					if(fuel==Global.Configuration.Selected.FuelType[question])
					{
						option.setAttribute('selected','true')
					}
					select.appendChild(option)
				}
			}
		}

		/** Update all */
		function init()
		{
			updateQuestionsTable()
			updateInputs()
			updateOutputs()
			updateNrgOutputs()
			updateOtherOutputs()
			Exceptions.apply()
			updateFuelSelection()
			try{drawCharts()}
			catch(e){console.log(e)}
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear diagram--><?php include'linear.php'?>
<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Water":case "Waste":  
			$titleLevel=$lang_json["#$level"];break;

		case "Energy": $titleLevel="Energy summary";break;
		default:	   $titleLevel=$level;break;
	}
	if($sublevel)
	{
		switch($sublevel)
		{
			default:	   $titleSublevel=$lang_json["#$sublevel"];break;
		}
	}
	/*separator*/ $sep="<span style=color:black>&rsaquo;</span>";
	$title=$sublevel ? "<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$titleSublevel</span>" : "<span style=color:black>$titleLevel</span>";
?>
<style> h1 {text-align:left;padding-left:17em;line-height:2.1em;border-bottom:1px solid #ccc;background:white} </style>

<h1><a href=stages.php><?php write('#edit_input_data')?></a> <?php echo "$sep $title"?>
	<!--go to level 3 button-->
	<?php
		if($sublevel)
		{
			$color = ($level=="Waste")?"lightcoral":"lightblue";
			echo "
				<span class=inline style='float:right;margin-right:10em'>
					<button 
						style='height:auto;font-size:12px;border-radius:0.3em;border:1px solid #aaa'
						onclick=window.location='level3.php?level=$level&sublevel=$sublevel'>
							<img src=img/substage.png style='width:30px;margin-right:1em;vertical-align:middle'>
							".$lang_json['#substages']."	
					</button> 
					<span style=font-size:12px;color:#666>
						&rarr; ";
			write('#edit_divided_in');
			echo" <script>document.write(Substages['$level']['$sublevel'].length)</script> ";
			write('#substage');
			echo "/s </span> </span>";
		}
	?>
</h1>

<!--container-->
<div id=main style=text-align:left>

	<!--questions-->
	<div class=card>
		<?php cardMenu($lang_json['#questions']." (<a href=questions.php>info</a>)")?> 
		<table style=margin:1em id=questions class=inline></table>
		<script>
			function updateQuestionsTable()
			{
				var t = document.querySelector('#questions');
				while(t.rows.length>0)t.deleteRow(-1);

				var questions = Questions.getQuestions(CurrentLevel);

				if(questions.length==0)
				{
					t.parentNode.style.display="none"
					t.insertRow(-1).insertCell(-1).innerHTML="<i>N/A</i>"
				}

				for(var q in questions)
				{
					var question = questions[q];
					var currentAnswer = Global.Configuration["Yes/No"][question];
					var checked = currentAnswer ? "checked":"";

					//reset values that are inputs
					if(!currentAnswer)
						for(var i in Questions[question])
						{
							var code=Questions[question][i];
							if(typeof(CurrentLevel[code])=="number") CurrentLevel[code]=0;
						}

					var newRow = t.insertRow(-1);
					newRow.title=question
					newRow.insertCell(-1).innerHTML=translate(question)+"?";
					newRow.insertCell(-1).innerHTML=(function()
					{
						var ret="<label>"+
								"<?php write('#no')?> "+
								"<input name='"+question+"' type=radio value=0 onclick=setQuestion('"+question+"',0) checked></label> "+
								"<label><?php write('#yes')?> "+
								"<input name='"+question+"' type=radio value=1 onclick=setQuestion('"+question+"',1) "+checked+"></label> ";
						return ret;
					})();
				}
			}

			function setQuestion(question,newValue)
			{
				if(newValue)
					Global.Configuration['Yes/No'][question]=1;
				else
					if(confirm("Inputs that depend on this question will be set to 0."))
						Global.Configuration['Yes/No'][question]=0;
				init()
			}
		</script>
		<?php 
			//fuel options for water and wastewater only
			if($sublevel==false && $level!="Energy")
			{
				?>
				 <table id=fuelSelection class=inline>
					<tr><td colspan=2><?php write('#configuration_fuel_options')?> (<a href=fuelInfo.php>info</a>)</legend>
					<style>
						#fuelSelection {margin:1em;}
						#fuelSelection tr.inactive {background:#f6f6f6;color:#aaa}
					</style>
					<?php
						if($level=="Water")
						{ 
							?>
							<tr question=engines_in_water><td><?php write('#configuration_engines')?>
							<?php 
						}
						else //means if level=="Waste"
						{
							?>
							<tr question=engines_in_waste>     <td><?php write('#configuration_engines')?>
							<tr question=truck_transport_waste><td><?php write('#configuration_vehicles')?>
							<?php 
						}
					?>
				</table>
				<?php
			}
		?>
	</div>

	<!--i/o-->
	<div class=card>
		<div class=menu onclick=this.parentNode.classList.toggle('folded')>
			<button></button>
			Inputs &amp; Outputs &mdash;
				<!--assessment info TO BE INCLUDED in edit.php-->
				<span style="text-align:left;font-size:11px">
					<a href=variable.php?id=Days><?php write('#assessment_period')?></a>: 
						<script>document.write(format(Global.General.Days()))</script> <?php write('#days')?>
					&mdash;
					<a href=variable.php?id=conv_kwh_co2 title="Conversion factor for grid electricity"><?php write('#conversion_factor')?></a>: 
						<script>
							(function(){
								var c = Global.General.conv_kwh_co2;
								var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' title='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+" &#9888;</span>" : format(c); 
								document.write(str)
							})();
						</script> kg<sub>CO<sub>2</sub></sub>/kWh
				</span>
			</span>
		</div>
		<!--Inputs-->
		<div class=inline 
			 style="width:45%;margin-left:2em;
				<?php if($level=="Energy")echo "display:none"?>">
			<table id=inputs style="width:100%;margin-bottom:1em">
				<tr><th colspan=5 class=tableHeader>INPUTS
				<tr>
					<th><?php write('#edit_description')?>
					<th><?php write('#edit_current_value')?>
					<th><?php write('#edit_unit')?>
					<th><?php write('#edit_data_quality')?>
			</table>
		</div>
		<!--Outputs-->
		<div class=inline 
			 style="width:50%;margin-left:1em;">

			<!--GHG-->
			<table id=outputs style="width:100%;background:#f6f6f6;margin-bottom:1em;
					<?php if($sublevel || $level=="Energy") echo "display:none;"; ?>
				">
				<tr><th colspan=7 class=tableHeader>OUTPUTS — <?php write('#edit_ghg_emissions')?>

				<tr>
					<th style=width:10%><?php write('#edit_origin')?>
					<th style=width:17%>Kg<sub>CO<sub>2</sub></sub>
					<th style=width:17%><?php write('#edit_value_per_year')?><br>kg<sub>CO<sub>2</sub></sub>/<?php write('#year')?>
					<th style=width:17%><?php write('#edit_per_inhab')?><br>kg<sub>CO<sub>2</sub></sub>/<?php write('#year')?>/inhab
					<th style=width:17%><?php write('#edit_per_serv_pop')?><br>kg<sub>CO<sub>2</sub></sub>/<?php write('#year')?>/serv.pop
					<th style=width:17%><?php write('#edit_per_water_volume')?><br>kg<sub>CO<sub>2</sub></sub>/m<sup>3</sup>
					<?php
						if($level=="Waste" && !$sublevel)
						{	
							?>
							<th style=width:17%><?php write('#edit_per_bod_removed')?><br>kg<sub>CO<sub>2</sub></sub>/kg BOD
							<?php 
						}
					?>
			</table>

			<!--energy performance-->
			<table id=nrgOutputs style="width:100%;background:#f6f6f6;">
				<tr><th colspan=4 class=tableHeader>OUTPUTS — <?php write('#energy_performance')?>
				<tr>
					<!--
					<th title=Performance style=cursor:help><?php write('#edit_benchmark')?>
					-->
					<th><?php write('#edit_description')?>
					<th><?php write('#edit_current_value')?>
					<th><?php write('#edit_unit')?>
			</table>

			<!--other-->
			<table id=otherOutputs style="width:100%;background:#f6f6f6;margin-top:1em;margin-bottom:1em">
				<tr><th colspan=4 class=tableHeader>OUTPUTS — <?php write('#edit_service_level_indicators') ?>
				<tr>
					<th><?php write('#edit_description')?>
					<th><?php write('#edit_current_value')?>
					<th><?php write('#edit_unit')?>
			</table>
		</div>
	</div>

	<!--GRAPHS-->
	<div class=card><?php cardMenu($lang_json['#graphs']) ?>
		<div id=graph><?php write('#loading')?></div>
		<script>
			google.charts.load('current',{'packages':['corechart']});
			google.charts.setOnLoadCallback(drawCharts);
		</script>
		<style>
			#graph div.options{padding:1em}
			#graph button {margin:0.5em}
			#graph {text-align:center}
			#graph * {margin:auto}
		</style>
	</div>

</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
