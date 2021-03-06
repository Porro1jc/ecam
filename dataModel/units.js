var Units =
{
	/*Modify or add a unit change in Global.Configuration.Units*/
	selectUnit:function(field,newUnit)
	{
		Global.Configuration.Units[field]=newUnit;
		init()
	},

	/* return a multiplier for a field */
	multiplier:function(field)
	{
		//if magnitude is not inside Units, multiplier is 1
		if(Info[field]===undefined){return 1}
		if(Units[Info[field].magnitude]===undefined){return 1}

		//look for current unit: first inside configuration, if not, in Info[field]
		var currentUnit = Global.Configuration.Units[field] || Info[field].unit

		//multiplier is in Units[magnitude][unit]
		return Units[Info[field].magnitude][currentUnit] || 1;
	},

	/** CONVERSION BETWEEN MAGNITUDES */
	"Distance":{
		cm:0.01,
		m:1,
		km:1000,
	},
	"Mass":{ 
		g:0.001,
		kg:1,
	},
	"Time":{ 
		sec:1,
		min:60,
		hour:3600,
	},
	//derived magnitudes from mass,distance and time
	"Volume":{ 
		m3:1,
		L:0.001,
	},
	"Flow":{ 
		"m3/s":1,
		"L/s":0.001,
	},
	"Energy":{
		kWh:1,
		Joule:(1/3600000),
	},
}
