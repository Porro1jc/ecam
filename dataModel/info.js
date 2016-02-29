/** 
  *
  * DESCRIPTIONS, MAGNITUDES AND UNITS (for inputs, calculated variables and PIs)

	Info is a one level depth object that stores all variable descriptions and units

	Format:
		"code":
		{
			"description" : string,
			"magnitude"	  : string,
			"unit"		  : string,
			"explanation" : string,
		},
*/

var Info = {
	//GENERAL
	"Days":{description:"Assessment period", magnitude:"Time", unit:"days", explanation:"Period of time adopted for the assessment of the data and of the PI", },
	"conv_kwh_co2":{description:"Conversion factor for grid electricity",                                 magnitude:"Conversion", unit:"kgCO2e/kWh", explanation:"Ratio of CO2 emission per energy consumed", },

	//L1 WS
	"ws_serv_pop":{description:"Serviced population",              magnitude:"People",  unit:"People", explanation:"Number of permanent residents within the service area managed by the undertaking which are connected to the water supply system", },
	"ws_resi_pop":{description:"Resident population",              magnitude:"People",  unit:"People", explanation:"Number of permanent residents within the water utility area of service", },
	"ws_run_cost":{description:"Running costs ",                   magnitude:"Currency", unit:"USD", explanation:"Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to water supply within the service area managed by the undertaking during the entire assessment period", },
	"ws_nrg_cost":{description:"Energy costs",                     magnitude:"Currency", unit:"USD", explanation:"Costs from electric energy consumption for the entire water supply utilty, based on the electricity bill during the entire assessment period", },
	"ws_nrg_cons":{description:"Energy consumed from the grid",    magnitude:"Energy",  unit:"kWh", explanation:"Total energy consumed from the grid for the entire water supply utilty, based on the electricity bill during the entire assessment period", },
	"ws_vol_auth":{description:"Volume of authorized consumption", magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of metered and/or non-metered water that during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported", },
	"ws_non_revw":{description:"Percent of Non Revenue Water",     magnitude:"Percent", unit:"%", explanation:"Percentage of the abstracted water Volume that is lost due to leaks or illegal connection to the distribution system , At level 1, enter the percentage as known or estimated by the utility. At level 2, the non revenue water indicator (wS5) will be calculated based on a mass balance", },
	"ws_vol_fuel":{description:"Volume of Fuel consumed",          magnitude:"Volume",  unit:"m3", explanation:"Fuel consumption in water supply, for instance, due to the use of on-site generators or devices that work on fuel", },
	"c_ws_nrg_fuel":{description:"Energ Fuel Cons (engines)",               magnitude:"Energy",  unit:"TJ", explanation:"", },
	"c_ws_co2_engi":{description:"Direct CO2 emitted in driking water stages from on-site engines", magnitude:"Mass",  unit:"kgCO2e", explanation:"", },

	//L2 WSG
	"wsg_nrg_prod":{description:"Energy produced", magnitude:"Energy", unit:"kWh", explanation:"Energy produced", },
	"wsg_nrg_sold":{description:"Energy sold", magnitude:"Energy", unit:"kWh", explanation:"Energy sold", },
	"wsg_heat_nrg":{description:"Heat energy valorized from water", magnitude:"Energy", unit:"kWh", explanation:"Heat energy valorized from water", },

	//L2 WSA
	"wsa_nrg_cons":{description:"Total electric energy consumption",      magnitude:"Energy", unit:"kWh", explanation:"Electric energy consumption including both from the grid and self-produced, for the water abstraction unit, by the undertaking during the entire assessment period", },
	"wsa_vol_conv":{description:"Volume of conveyed water",               magnitude:"Volume", unit:"m3", explanation:"Sum of the volume of water conveyed (gravity or pumped) in the water abstraction unit that are the responsibility of the undertaking, during the assessment period", },
	"wsa_nrg_turb":{description:"Electric energy produced from turbines", magnitude:"Energy", unit:"kWh", explanation:"Sum of energy recovered during the assessment period by all turbines for abstracted water managed by the undertaking", },

	//L3 WSA
		"wsa4" :{description:"Pumping head in each pumping system",                        magnitude:"Head",         unit:"m", explanation:"Head at which the water is pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period", },
		"wsa5" :{description:"Volume pumped in each Pumping System",                       magnitude:"Head",         unit:"m3", explanation:"Volume of water pumped in each water abstraction unit that are the responsibility of the undertaking, during the assessment period", },
		"wsa6" :{description:"Turbine water volume",                                       magnitude:"Volume",       unit:"m3", explanation:"Sum of volume passing through a turbine managed by the undertaking to produce electricity, for each abstraction system unit", },
		"wsa7" :{description:"Turbine head",                                               magnitude:"Head",         unit:"m", explanation:"Head at which the water is falling through turbines in each water abstraction unit that are the responsibility of the undertaking, during the assessment period", },
		"wsa8" :{description:"Water losses",                                               magnitude:"Volume",       unit:"m3", explanation:"Difference between system abstracted volume and the volume entering the water treatment plant and/or entering directly the distribution system", },
		"wsa9" :{description:"Mains lenght",                                               magnitude:"Distance",     unit:"km", explanation:"Total transmission and distribution mains length (there are not service connections at the abstraction and conveyance stage)", },
		"wsa10":{description:"Friction pipe losses",                                       magnitude:"Head",         unit:"m", explanation:"All friction losses (including the local ones in valves and accessories) must be included", },
		c_wsa50:{description:"[Sum](abstracted water volume pumped x pump head in meters)", magnitude:"Volume x Head", unit:"m3 x 100m", explanation:"Sum, for all the pumps of the water abstracted system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100", },

	//L2 WST
	"wst_vol_trea":{description:"Volume of treated water", magnitude:"Volume", unit:"m3", explanation:"Sum of the volume of water treated by WTPs that are the responsibility of the water undertaking, during the assessment period", },
	"wst_nrg_cons":{description:"Total energy consumed",   magnitude:"Energy", unit:"kWh", explanation:"Energy consumed during the assessment period by each urban water treatment plant managed by the undertaking", },

	//L3 WST
		"wst3" :{description:"Treated water quality tests carried out",                   magnitude:"Number",  unit:"number", explanation:"Number of treated water tests carried out during the assessment period", },
		"wst4" :{description:"Compliance of aesthetic tests",                             magnitude:"Number",  unit:"number", explanation:"Number of aesthetic tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation", },
		"wst5" :{description:"Compliance of microbiological tests",                       magnitude:"Number",  unit:"number", explanation:"Number of microbiological tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation", },
		"wst6" :{description:"Compliance of physical-chemical tests",                     magnitude:"Number",  unit:"number", explanation:"Number of physical-chemical tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation", },
		"wst7" :{description:"Compliance of radioactivity tests",                         magnitude:"Number",  unit:"number", explanation:"Number of radioactivity tests of treated water carried out during the assessment period, which comply with the applicable standards or legislation", },
		"wst8" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/S/Filt/Des", magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with Pre-oxidation (Pre-ox) ,Coagulation (C), Filtration (F), Sedimentation (S), Filtration (Filt) and Desinfection (Des)", },	
		"wst9" :{description:"Volume of treated water in WTPs with Pre-ox/C/F/Filt/Des",  magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with Pre-ox/C/F/Filt/Des", },	
		"wst10":{description:"Volume of treated water in WTPs with C/F/S/Filt/Des",       magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with C/F/S/Filt/Des ", },
		"wst11":{description:"Volume of treated water in WTPs with C/F/Filt/Des",         magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with C/F/Filt/Des", },
		"wst12":{description:"Volume of treated water in WTPs with Des",                  magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with Des", },
		"wst13":{description:"Volume of treated water in WTPs with other",                magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of water treated by WTPs with other sequence ", },
		"wst14":{description:"Sludge produced in WTPs",                                   magnitude:"Mass",    unit:"kg", explanation:"Sludge produced during the assessment period by each urban water treatment plant managed by the undertaking", },
		"wst15":{description:"Treatment capacity",                                        magnitude:"Volume",  unit:"m3", explanation:"The treatment capacity of each WTP or on site system facility that are the responsibility of the wastewater undertaking, during the assessment period", },
		"wst16":{description:"Tests complying with discharge consents",                   magnitude:"Number",  unit:"number", explanation:"Number of tests in treated wastewater treatment plants that comply with discharge consents during the assessment period", },
		c_wst50:{description:"Percentage of tests complying with regulations",            magnitude:"Percent", unit:"%", explanation:"" },

	//L2 WSD

	"wsd_nrg_cons" :{description:"Total energy consumed",                                              magnitude:"Energy",     unit:"kWh", explanation:"Electric energy consumption including both from the grid and self-produced, for water distribution during the entire assessment period", },
	"wsd_resi_pop" :{description:"Resident population connected to the drinking water supply systems", magnitude:"Population", unit:"People", explanation:"Resident population connected to each water distribution system managed by the undertaking, at the reference date", },
	"wsd_serv_pop" :{description:"Serviced population in supply systems",                              magnitude:"Population", unit:"People", explanation:"Resident population connected to each water distribution unit managed by the undertaking, at the reference date", },
	"wsd_vol_dist" :{description:"Distribution system input volume",                                   magnitude:"Volume",     unit:"m3", explanation:"The water volume entering the distribution system from the water treatment or directly from abstraction during the assessment period ", },
	"wsd_non_revw" :{description:"Non-revenue water in distribution system",                           magnitude:"Volume",     unit:"m3", explanation:"Difference between the distribution system input volume and the authorized consumption (including exported water) during the assessment period for each water distribution unit", },
	"wsd_auth_con" :{description:"Volume of authorized consumption",                                   magnitude:"Volume",     unit:"m3", explanation:"Sum of the volume of metered and/or non-metered water that, during the assessment period, is taken by registered customers, by the water supplier itself, or by others who are implicitly or explicitly authorised to do so by the water supplier, for residential, commercial, industrial or public purposes. It includes water exported", },

	//L3 WSD
		"wsd2" :{description:"Delivery points with adequate pressure",                                  magnitude:"Number",        unit:"number", explanation:"Number of delivery points that receive and are likely to receive pressure equal to or above the guaranteed or declared target level at the peak demand hour (but not when demand is abnormal).", },
		"wsd3" :{description:"Number of service connections",                                           magnitude:"Number",        unit:"number", explanation:"Total number of service connections, at the reference date", },
		"wsd4" :{description:"Time system is pressurised",                                              magnitude:"Time",          unit:"hour", explanation:"Amount of time of the year the system is pressurised ", },
		"wsd9" :{description:"Volume injected",                                                         magnitude:"Volume",        unit:"m3", explanation:" Volume injected to the water distribution stage, for each water distribution unit", },
		"wsd10":{description:"Minimum pressure to be supplied at the distribution nodes	",              magnitude:"Pressure",      unit:"m", explanation:"According the standards, a minimum pressure must be provided to the consumers (20 - 30 m) , for each water distribution unit", },
		"wsd11":{description:"Highest node elevation",                                                  magnitude:"Distance",      unit:"m asl", explanation:"Is the elevation of the highest node of the network, , for each water distribution unit", },
		"wsd12":{description:"Lowest node elevation of the stage",                                      magnitude:"Distance",      unit:"m asl", explanation:"Is the elevation of the lowest node of the stage, for each water distribution unit", },
		"wsd13":{description:"Average nodes elevation",                                                 magnitude:"Distance",      unit:"m asl", explanation:"The average elevation of the network. If necessary it could be calculated as sum of lowest and the highest node elevation of the network divided by two, for each water distribution unit", },
		"wsd14":{description:"Water table elevation node",                                              magnitude:"Distance",      unit:"m", explanation:"It is the elevation of the water table to calculate the natural energy provided to the system, for each water distribution unit", },
		"wsd15":{description:"Distributed water pumped",                                                magnitude:"Volume",        unit:"m3", explanation:"Volume of water in the drinking water distribution system which requires pumping, for each distribution unit", },
		"wsd16":{description:"Pump head",                                                               magnitude:"Head",          unit:"m", explanation:"", },
		"wsd17":{description:"Energy recovered at water distribution",                                  magnitude:"Energy",        unit:"kWh", explanation:"Total energy recovered during the assessment period by each water distribution unit ", },
		"wsd18":{description:"Mains length",                                                            magnitude:"Distance",      unit:"km", explanation:"Total transmission and distribution mains length (service connections not included), for each water distribution unit at the reference date", },
		"wsd19":{description:"Friction pipe losses",                                                    magnitude:"Head",          unit:"m", explanation:"Friction losses (including the local ones in valves and accessories), for each water distribution unit at the reference date.", },
		c_wsd50:{description:"Natural energy provided (gravity energy from supply to distribution)",    magnitude:"Energy",        unit:"kWh", explanation:"", },
		c_wsd51:{description:"Minimum required energy for the system to operate by users (theoretical)", magnitude:"Energy",        unit:"kWh", explanation:"This energy takes into account the node consumption elevation plus the minimum pressure required by the users", },
		c_wsd52:{description:"Total supplied energy to the network (natural plus shaft), real system",  magnitude:"Energy",        unit:"kWh", explanation:"The energy provided to a system can be natural and shaft (pumping energy). With the provided expression the energy is precisely calculated", },
		c_wsd53:{description:"Topographic energy supplied to the system",                               magnitude:"Energy",        unit:"kWh", explanation:"This is the energy supplied to the system because its irregular topography", },
		c_wsd54:{description:"[Sum](distributed water volume pumped x pump head in meters)",            magnitude:"Volume x head", unit:"m3x100m", explanation:"", },

	//L1 WW
	"ww_nrg_cost" :{description:"Energy costs",                                 magnitude:"Currency",        unit:"USD", explanation:"Costs from electric energy consumption for the entire wastewater utilty, based on the electricity bill during the entire assessment period.", },
	"ww_run_cost" :{description:"Running costs",                                magnitude:"Currency",        unit:"USD", explanation:"Total operations and maintenance net costs and internal manpower net costs (i.e. not including the capitalised cost of self constructed assets) related to wastewater management within the service area managed by the undertaking during the entire assessment period", },
	"ww_nrg_cons" :{description:"Energy consumed from the grid",                magnitude:"Energy",          unit:"kWh", explanation:"Total electric energy consumed from the grid related to wastewater management within the service area managed by the undertaking during the entire assessment period", },
	"ww_vol_coll" :{description:"Volume of collected wastewater",               magnitude:"Volume",          unit:"m3", explanation:"Volume of wastewater discharged from water consumers (households, industries, etc.) to the sewer system during the assessment period and prior to any dilution from growndwater infiltration or surface water inflow, and prior to any overflows to sewage to the natural environment.", },
	"ww_resi_pop" :{description:"Resident population",                          magnitude:"People",          unit:"People", explanation:"Number of permanent residents within the area of service for wastewater services managed by the undertaking (whether they are connected or not) , at the reference date ", },
	"ww_conn_pop" :{description:"Population connected to sewers",               magnitude:"People",          unit:"People", explanation:"Number of permanent residents within the service area managed by the undertaking which are connected to the sewer system , at the reference date ", },
	"ww_serv_pop" :{description:"Serviced population in wastewater system",     magnitude:"People",          unit:"People", explanation:"Number permanent residents within the service area managed by the undertaking which wastewater is collected and treated, at the reference date", },
	"ww_num_trip" :{description:"Number of trips to sludge disposal site",      magnitude:"Number",          unit:"Number", explanation:"Number of truck trips to dispose sludge from the WWTP to the disposal site during the assessment period. Note that round trips to the disposal site shall be counted as 1 trip ", },
	"ww_dist_dis" :{description:"Distance to sludge disposal site",             magnitude:"Distance",        unit:"km", explanation:"Distance between the WWTP and the disposal site. If there are more than one disposal sites, use an average value. Note that the tool calculates the round trip distance as twice the distance to the disposal site.", },
	"ww_n2o_effl" :{description:"Total Nitrogen concentration effluent limit",  magnitude:"Concentration",   unit:"mg/L", explanation:"Regulatory limit for total nitrogen concentration at the effluent of the WWTP ", },
	"ww_vol_fuel" :{description:"Volume of Fuel consumed",                      magnitude:"Volume",          unit:"L", explanation:"Fuel consumption in the wastewater system during the assessment period. Fuel consumption may be due to the use of on-site generators, pumps or engines that work on fuel.", },
	"ww_prot_con" :{description:"Annual per capita protein consumption <select id=ww13options onchange=Global.Waste.ww_prot_con=parseFloat(this.value);init()> <option value=0>--select country--<option value=20.8>Thailand (20.8)<option value=24.5>Peru (24.5)<option value=33.6>Mexico (33.6) </select> ", magnitude:"Annual per capita consumption",   unit:"kg/person/year", explanation:"Protein consumption per capita per year. The default value is provided after selection of country. If you have a specific factor that applies to your region you can provide.", },
	"ww_bod_pday" :{description:"BOD5 per person per day",                      magnitude:"Mass/inhab/time", unit:"g/person/day", explanation:"This represents the average Biochemical oxygen demand (BOD5) that each resident connected to the sewer system eliminates in the wastewater produced every day. The default value is provided after selection of country. This default value shall be adjusted if local studies provide more accurate estimates", },
	"ww_vol_wwtr" :{description:"Treated wastewater volume",                    magnitude:"Volume",          unit:"m3", explanation:"treated wastewater volume (m3) ", },
	"ww_ch4_efac" :{description:"Wastewater CH<sub>4</sub> emission factor <select id=ww_ch4_efac_options onchange=Global.Waste.ww_ch4_efac=parseFloat(this.value);init()> <option value=0.00> Well managed (0.00) <option value=0.06> Minor poorly aerated zones (0.06) <option value=0.12> Some aerated zones (0.12) <option value=0.18> Not well managed (0.18) </select>",    magnitude:"Mass/Mass",       unit:"kgCH<sub>4</sub>/kgBOD", explanation:"Methane emission factor of selected biological wastewater aerobic treatment processes", },

	c_ww_biogas_flar :{description:"Biogas flared",                                magnitude:"Volume",          unit:"Nm3", explanation:"The Biogas flared is calculated based on the amount of biogas produced under good operating conditions of the plant and the anaerobic digestor if biogas is NOT recovered to produce energy", },
	c_ww_nrg_engines :{description:"Energy of fuel consumed for onsite engines",   magnitude:"Energy",          unit:"TJ", explanation:"", },
	c_ww_nrg_tsludge :{description:"Energy of fuel consumed for sludge transport", magnitude:"Energy",          unit:"TJ", explanation:"The fuel consumption is calculated assuming 2 times distance to disposal site (round tryp) time the number of trips times an average diesel consumption of 25 L per 100 km", },

	//L2 WWG
	"wwg_nrg_prod":{description:"Energy produced", magnitude:"Energy", unit:"kWh", explanation:"Energy produced", },
	"wwg_nrg_sold":{description:"Energy sold", magnitude:"Energy", unit:"kWh", explanation:"Energy sold", },
	"wwg_heat_nrg":{description:"Heat energy valorized from wastewater", magnitude:"Energy", unit:"kWh", explanation:"Heat energy valorized from water", },

	//L2 WWC
	"wwc_vol_conv":{description:"Volume of wastewater conveyed to treatment or to an outfall for untreated discharge", magnitude:"Volume", unit:"m3", explanation:"Collected wastewater, corresponding to the volume of domestic, commercial and industrial outputs to the sewer system during the assessment period (pumped or not)", },
	"wwc_nrg_cons":{description:"Total electric energy consumption", magnitude:"Energy", unit:"kWh", explanation:"Energy consumed during the assessment period by each pumping station for conveying wastewater to treatment managed by the undertaking", },
	"c_wwc_dilution":{description:"Volume of dilution from Infiltration and Inflow",  magnitude:"Volume", unit:"m3", explanation:"This volume is calculated based on a mass balance on the BOD load. It considers the volume of collected wastewater prior to dilution, the ratio between the population connected to sewers and the serviced population, and the standard country specific BOD input to sewers in g/ pers/ day. The other side of the mass balance considers the volume of treated wastewater and the BOD load in the treatment plant influent. ", },

		//L3 WWC
		"wwc3" :{description:"Volume pumped",                                    magnitude:"Volume", unit:"m3", explanation:"", },
		"wwc4" :{description:"Pump head",                                        magnitude:"Head",  unit:"m", explanation:"", },
		c_wwc50:{description:"[Sum] (water volume pumped x pump head in meters)", magnitude:"Volume x head", unit:"m3 x 100m", explanation:"Sum, for all the pumps of the wastewater collection system, of the total volume pumped by pump i (m3) times the pump head i (m) / 100 ", },

	//L2 WWT
	"wwt_bod_infl" :{description:"Influent BOD5 load",                                  magnitude:"Mass", unit:"kg", explanation:"BOD5 load entering the WWTP during the assessment period. It can be estimated by multiplying the average BOD concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate", },
	"wwt_biog_pro" :{description:"Biogas produced",                                     magnitude:"Volume", unit:"Nm3", explanation:"Biogas produced during the assessment period by each wastewater treatment plant managed by the undertaking", },
	"wwt_biog_val" :{description:"Biogas valorised",                                    magnitude:"Volume", unit:"Nm3", explanation:"Volume of biogas used to generate electricity or for heating (i.e. the anaerobic digester) at the wastewater treatment plant, over the assessment period", },
	"wwt_tn_influ" :{description:"Effluent TN load",                                    magnitude:"Mass", unit:"kg", explanation:"Total nitrogen load in treated effluent prior to discharge during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.", },
	"wwt_tn_efflu" :{description:"Influent TN load",                                    magnitude:"Mass", unit:"kg", explanation:"Total nitrogen load entering the WWTP during the assessment period. It can be estimated by multiplying the average TN concentration in the influent by the volume entering the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate.", },
	"wwt_vol_trea" :{description:"Volume of treated wastewater",                        magnitude:"Volume",       unit:"m3", explanation:"Volume of treated wastewater by each unit, over the assessment period", },
	"wwt_nrg_cons" :{description:"Total electric energy consumption",                   magnitude:"Energy",       unit:"kWh", explanation:"Total energy consumed during the assessment period by all wastewater treatment plants managed by the undertaking", },
	"wwt_bod_effl" :{description:"Effluent BOD5 load",                                  magnitude:"Mass",         unit:"kg", explanation:"BOD5 load at the effluent of the WWTP during the assessment period. It can be estimated by multiplying the average BOD5 concentration in the effluent by the effluent volume the plant. If this is done daily and summed over the duration of the assessment period the value will be most accurate", },
	"wwt_nrg_biog" :{description:"Electrical energy produced from biogas valorization", magnitude:"Energy",       unit:"kWh", explanation:"Energy produced from biogas valorization during the assessment period by each wastewater treatment plant managed by the undertaking", },
	"wwt_ch4_biog" :{description:"Percentage of methane in biogas",                     magnitude:"Percentage",   unit:"%", explanation:"Percent of the methane content in the produced biogas", },

	c_wwt_biog_fla :{description:"Biogas flared",                                                                   magnitude:"Volume",       unit:"Nm3", explanation:"", },
	c_wwt_n2o_emis :{description:"Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e",  magnitude:"Mass",         unit:"kgCO2e", explanation:"Nitrous oxide (CO2e) emitted in wastewater treatment plants, expressed as CO2e using the conversion factor of 298 kg of CO2 per kg of N2O.", },
	c_wwt_ch4_emis :{description:"CH4 emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent without treatment. Based upon BOD in the WWTP influent multiplied by default emission factor ", },
	c_wwt_nrg_biog :{description:"Total Energy content of biogas valorized in the Co-generator",                    magnitude:"Energy",       unit:"kWh", explanation:"Sum of energy content of biogas used in cogeneration during the assessment period by all wastewater treatment plants managed by the undertaking ", },
	c_wwt_bod_rmvd :{description:"BOD5 mass removed",                                                               magnitude:"Mass",         unit:"kg", explanation:"This is calculated from the difference in BOD mass from the influent with BOD mass from the effluent over the assessment period.", },
	c_wwt_ind_neff :{description:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent",magnitude:"Mass",         unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent", },
	c_wwt_n2o_untr :{description:"N2O emissions from untreated wastewater direct discharge",                        magnitude:"Mass",         unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor ", },
	c_wwt_nrg_fuel :{description:"Energy equivalent of fuel usage in the truck to disposal site",                   magnitude:"Energy",       unit:"TJ", explanation:"Energy equivalent of fuel usage in the truck to disposal site. This assumes a truck fuel consumption of 25 L/100km", },
	c_wwt_ann_ndis :{description:"Total annual amount of nitrogen discharged directly to aquatic environment",      magnitude:"Mass",         unit:"kg", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor ", },
	c_wwt_ch4_emis :{description:"Methane (CO2e) emitted in wastewater treatment plants",                           magnitude:"Mass",         unit:"kgCO2e", explanation:"Methane (CO2e) emitted in wastewater treatment plants ", },

		//L3 WWT
		"wwt15":{description:"Number of water quality tests complying",                                        magnitude:"Number",  unit:"number", explanation:"Number of tests in each wastewater treatment plant that comply with discharge consents during the assessment period", },
		"wwt16":{description:"Number of water quality tests conducted",                                        magnitude:"Number",  unit:"number", explanation:"Number of tests carried out in each treated wastewater treatment plant during the assessment period", },
		"wwt17":{description:"Volume of treated wastewater in WWTPs with trickling filters (TF)",              magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with trickling filters (TF)", },
		"wwt18":{description:"Volume of treated wastewater in WWTPs with activated sludge (AS)",               magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with activated sludge (AS)", },
		"wwt19":{description:"Volume of treated wastewater in WWTPs with AS and Coagulation/Filtration (C/F)", magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with AS and Coagulation/Filtration (C/F) ", },
		"wwt20":{description:"Volume of treated wastewater in WWTPs with AS nitrification and C/F",            magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with AS nitrification and C/F", },
		"wwt21":{description:"Volume of treated wastewater in WWTPs with Laggons",                             magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with Laggons", },
		"wwt22":{description:"Volume of treated wastewater in WWTPs with other",                               magnitude:"Volume",  unit:"m3", explanation:"Sum of the volume of wastewater treated by WWTPs with other type of treatment ", },
		"wwt23":{description:"Sludge produced in WWTPs (total weight)",                                        magnitude:"Mass",    unit:"kg", explanation:"Sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking", },
		"wwt24":{description:"Dry weight in sludge produced",                                                  magnitude:"Fraction", unit:"% w/w", explanation:"Average of dry weight in sludge produced during the assessment period by each wastewater treatment plant managed by the undertaking ", },
		"wwt25":{description:"Treatment capacity",                                                             magnitude:"Volume",  unit:"m3", explanation:"Treatment capacity of each WWTP that are the responsibility of the wastewater undertaking, during the assessment period", },
		c_wwt61:{description:"Percentage of test complying with regulations",                                  magnitude:"Percent", unit:"%", explanation:"", },

	//L2 WWD
	"wwd1":{description:"Volume of treated or untreated discharged wastewater",       magnitude:"Volume", unit:"m3", explanation:"Volume of wastewater discharged by each wastewater treatment plant that are the responsibility of the undertaking, during the assessment period. This includes all the wastewater collected, whether it is conveyed to treatment or discharged untreated", },
	"wwd3":{description:"Electric energy consumed for pumping discharged wastewater", magnitude:"Energy", unit:"kWh", explanation:"Sum of energy consumed (from the grid or self-produced) during the assessment period by all each pumping stations for discharged wastewater managed by the undertaking", },
	"wwd4":{description:"Energy recovered during wastewater discharge",               magnitude:"Energy", unit:"kWh", explanation:"Sum of energy recovered during the assessment period by all turbines for wastewater discharged managed by the undertaking", },
		
		//L3 WWD
		"wwd5" :{description:"Pumped volume",                                    magnitude:"Volume",       unit:"m3", explanation:"", },
		"wwd6" :{description:"Enter head pumped against",                        magnitude:"Head",         unit:"m", explanation:"", },
		"wwd7" :{description:"Enter turbine water volume pumped",                magnitude:"Volume",       unit:"m3", explanation:"", },
		"wwd8" :{description:"Enter turbine head",                               magnitude:"Head",         unit:"m3", explanation:"", },
		c_wwd50:{description:"[Sum] (water volume pumped x pump head in meters)", magnitude:"Volume x head", unit:"m3 x 100m", explanation:"Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100", },
		c_wwd51:{description:"[Sum] (water volume pumped x pump head in meters)", magnitude:"Volume x head", unit:"m3 x 100m", explanation:"Sum, for all the turbines of the wastewater discharged system, of the total volume turbine i (m3) times the turbine head i (m) / 100", },
	
	/**
		+------------------------+
		| PERFORMANCE INDICATORS |
		+------------------------+
	**/

	ws_KPI_nrg_cost     :{description:"Percentage of costs from energy", magnitude:"Percentage", unit:"%",      explanation:"Proportion of the utility energy costs referred to the total running costs related to urban drinking water system", },
	ws_KPI_GHG_elec     :{description:"From electricity",         magnitude:"Mass",       unit:"kgCO2e", explanation:"GHG Emissions from electricity consumption in all stages of urban drinking water system", },
	ws_KPI_GHG_ne       :{description:"From non-electricity",    magnitude:"Mass",       unit:"kgCO2e", explanation:"GHG Emissions other from electricity consumption in all stages of urban drinking water system", },

	ww_KPI_nrg_cost       :{description:"Percentage of costs from energy",                                          magnitude:"Percentage", unit:"%",      explanation:"Proportion of the utility energy costs referred to the total running costs", },
	ww_KPI_GHG_elec       :{description:"From electricity",                                                    magnitude:"Mass",       unit:"kgCO2e", explanation:"", },
	ww_KPI_GHG_ne_ch4_wwt :{description:"From non electricity (CH<sub>4</sub> from WWTP)",            magnitude:"Mass",       unit:"kgCO2e", explanation:"Methane (CO2e) emitted in wastewater treatment plants", },
	ww_KPI_GHG_ne_n2o_tre :{description:"From non electricity (N<sub>2</sub>O treated wastewater)",   magnitude:"Mass",       unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater effluent. Based upon nitrogen in the WWTP effluent multiplied by default emission factor", },
	ww_KPI_GHG_ne_tsludge :{description:"From non electricity (sludge transport)",                    magnitude:"Mass",       unit:"kgCO2e", explanation:"Indirect CO2e emitted from sludge transport off-site. Based upon sum of CO2, CH4 and N2O emission from mobile combustion", },
	ww_KPI_GHG_ne_ch4_unt :{description:"From non electricity (CH<sub>4</sub> untreated wastewater)", magnitude:"Mass",       unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to methane in wastewater effluent without treatment. Based upon BOD in the WWTP influent multiplied by default emission factor", },
	ww_KPI_GHG_ne_n2o_unt :{description:"From non electricity (N<sub>2</sub>O untreated wastewater)", magnitude:"Mass",       unit:"kgCO2e", explanation:"Indirect CO2e emitted in receiving waters due to nitrogen in wastewater discharged without treatment. Based upon nitrogen in the WWTP influent multiplied by default emission factor", },
	ww_KPI_GHG_ne_engines :{description:"From non electricity (from engines on-site)",                magnitude:"Mass",       unit:"kgCO2e", explanation:"Direct CO2e emitted from on-site engines in wastewater stages based upon sum of CO2, CH4 and N2O emission from stationary combustion ", },

	 
	/* +================+ */
	/* | Service levels | */
	/* +================+ */
		ws_SL_qual_com :{description:"Percentage of quality compliance",                    magnitude:"Percent",         unit:"%", explanation:"Percentage of the total number of treated water tests performed that comply with", },
		ws_SL_pres_ade :{description:"Percentage of supply pressure adequacy",              magnitude:"Percent",         unit:"%", explanation:"Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure", },
		ws_SL_cont_sup :{description:"Continuity of supply",                                magnitude:"Percent",         unit:"%", explanation:"Percentage of delivery points (one per service connection) that receive and are likely to receive adequate pressure", },
		ws_SL_serv_pop :{description:"Proportion of resident population receiving service",	magnitude:"Percent",           unit:"%", explanation:"Percentage of the resident population that are connected to the urban drinking water system managed by the undertaking, also referred to as 'serviced population'", },
		ws_SL_non_revw :{description:"Non-revenue water by volume",                         magnitude:"Percent",           unit:"%", explanation:"", },	
		ws_SL_auth_con :{description:"Authorized consumption per pers per day",             magnitude:"Volume/inhab/time", unit:"m3/inhab/day", explanation:"Volume of authorized consumption per serviced person in the service area managed by the undertaking divided by the duration of the assessment period", },
		ww_SL_serv_pop :{description:"Proportion of resident population receiving service", magnitude:"Percent",           unit:"%", explanation:"Percentage of the resident population that are connected to the sewer systems and which wastewater is treated by the undertaking", },
		ww_SL_treat_m3 :{description:"Collected wastewater treated",                        magnitude:"Percent",           unit:"%", explanation:"Percentage of the collected sewage prior to dilution or overflows in the sewer system that are treated in wastewater treatment plants", },
		ww_SL_qual_com :{description:"Percentage of quality compliance",                    magnitude:"Percent",         unit:"%", explanation:"Percentage of water quality tests carried out in wastewater treatment plants that comply with discharge consents", },
		ww_SL_dilution :{description:"Percent dilution in the sewer system",                magnitude:"Percent",         unit:"%", explanation:"Percentage of Infiltration and inflow water entering the sewer system compared to the volume of collected wastewater prior to dilution", },
		ww_SL_vol_pday :{description:"Treated wastewater per pers per day",                 magnitude:"Volume/inhab/time", unit:"m3/inhab/day", explanation:"Volume of treated wastewater per serviced person in the service area managed by the undertaking divided by the duration of the assessment period", },

	//
	wwGHG8:{description:"GHG emissions from fuel engines per serviced population",                                                 magnitude:"Mass/ser.Pop/time", unit:"kgCO2e/inhab/year", explanation:"Direct CO2 emitted in wastewater stages from on-site engines per serviced population in the area that is the responsibility of the water utility", },
	wwGHG10:{description:"GHG emissions from biogas flaring at the WWTP per serviced population",                                   magnitude:"Mass/ser.Pop",      unit:"kgCO2e/inhab", explanation:"GHG emissions from biogas flaring at the wastewater treatment plant per serviced population in the area that is the responsibility of the water utility", },
	wwGHG12:{description:"GHG emissions from the discharge of treated effluent to waterbodies per serviced population",             magnitude:"Mass/ser.Pop",      unit:"kgCO2e/inhab", explanation:"GHG emissions from the discharge of treated effluent to waterbodies per serviced population", },
	wwGHG14:{description:"GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population",         magnitude:"Mass/ser.Pop",      unit:"kgCO2e/inhab", explanation:"GHG emissions from the discharge of untreated wastewater to waterbodies per serviced population", },
	wwGHG16:{description:"GHG emissions from sludge transport per serviced population",                                             magnitude:"Mass/ser.Pop",      unit:"kgCO2e/inhab", explanation:"GHG emissions from sludge transport per serviced population", },

	//ws l2
	wsa_KPI_std_nrg_cons:{description:"Standardised Energy Consumption",                                           magnitude:"Energy", unit:"kWh/m3/100m", explanation:"", },
	wsa_KPI_nrg_recovery:{description:"Energy recovery per conveyed water",                                        magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Unit energy recovered in water conveyance", },
	wsa_KPI_std_nrg_recv:{description:"Standardized energy recovery",                                              magnitude:"Energy/Volume", unit:"kWh/m3/100m", explanation:"Represents an average energy turbine efficiency", },
	wsa_KPI_water_losses:{description:"Water losses per mains length",                                             magnitude:"Volume/", unit:"m3/km/days", explanation:"Total (apparent and real) water losses, expressed in terms of annual volume lost per mains length", },
	wsa_KPI_un_head_loss:{description:"Unit head loss",                                                            magnitude:"Headloss/Distance", unit:"m/km", explanation:"Unit energy friction loss in the conveyance system ", },

	wst_KPI_nrg_per_m3 :{description:"Energy consumption per treated water",                                      magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Unit energy consumption per treated water in water treatment plants", },
	wst_KPI_nrg_percen :{description:"Energy consumption of WTPs per total energy consumption",                   magnitude:"Percent", unit:"%", explanation:"Percentage of energy consumed in water treatment per Total energy consumed from the grid and self produced in the water and wastewater systems", },
	wst_KPI_slu_per_m3 :{description:"Sludge production per treated water",                                       magnitude:"Mass/Volume", unit:"kg/m3", explanation:"Unit sludge production per treated water in water treatment plants", },
	wst_KPI_capac_util :{description:"Capacity utilisation",                                                      magnitude:"Percent", unit:"%", explanation:"Percentage of treatment capacity utilized", },

	tE01 :{description:"WTPs with Pre-ox/C/F/S/Filt/Des",                                           magnitude:"Percent", unit:"%", explanation:"", },
	tE02 :{description:"WTPs with Pre-ox/C/F/Filt/Des",                                             magnitude:"Percent", unit:"%", explanation:"", },
	tE03 :{description:"WTPs with C/F/S/Filt/Des",                                                  magnitude:"Percent", unit:"%", explanation:"", },
	tE04 :{description:"WTPs with C/F/Filt/Des",                                                    magnitude:"Percent", unit:"%", explanation:"", },
	tE05 :{description:"WTPs with Des",                                                             magnitude:"Percent", unit:"%", explanation:"", },
	tE06 :{description:"WTPs with other sequence",                                                  magnitude:"Percent", unit:"%", explanation:"", },

	wsd_KPI_nrg_per_m3:{description:"Energy consumption per authorized consumption",                             magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"the applicable standards or legislation", },
	wsd_KPI_nrg_percen:{description:"Energy consumption of authorized consumption per total energy consumption", magnitude:"Percent", unit:"%", explanation:"Unit energy consumption per authorized consumption in water distribution", },

	dE3:{description:"Standardised Energy Consumption",                                           magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m", explanation:"Relative weight of the energy consumption in authorized consumption with regard to the Total energy consumed from the grid and self produced in the water and wastewater systems", },
	dE4:{description:"Global water distribution energy efficiency",                               magnitude:"Percent", unit:"%", explanation:"Average energy consumption per pumping water per head", },
	dE5:{description:"Percentage of topographic energy",                                          magnitude:"Percent", unit:"%", explanation:"Integrate all system distribution inefficiencies (pumps, friction, leaks and others). Compliments, giving a more complete information dE3 ", },
	dE6:{description:"<span style=color:red>Formula TBD</span> Water losses per mains length",    magnitude:"Volume/Distance/Time", unit:"m3/km/days", explanation:"Percentage of energy provided to the system due to the terrain topography ", },
	dE7:{description:"Unit head loss",                                                            magnitude:"Percent", unit:"m/km", explanation:"Total water losses (apparent and real), expressed in terms of annual volume lost per mains length", },

	// ww l2
	wwc_KPI_nrg_per_m3  :{description:"Energy consumption per conveying wastewater to treatment",                 magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Percentage of hours when the (intermittent supply) system is pressurised", },
	wwc_KPI_nrg_percen  :{description:"Energy consumption of collected wastewater per total energy consumption",  magnitude:"Percent", unit:"%", explanation:"Unit energy consumption per conveyed wastewater to treatment", },
	wwc_KPI_std_nrg_co  :{description:"Standardised Energy Consumption",                                          magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m", explanation:"Percentage of energy consumed in wastewater collection with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems", },

	wwt_KPI_nrg_per_m3:{description:"Energy consumption per treated wastewater",                                magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"", },
	wwt_KPI_nrg_percen:{description:"Energy consumption of WWTPs per total energy consumption",                 magnitude:"Percent",      unit:"%", explanation:"Unit energy consumption per treated wastewater in wastewater treatment plants", },
	wwt_KPI_nrg_per_kg:{description:"Energy consumption per BOD5 mass removed",                                 magnitude:"Energy/Mass",  unit:"kWh/Kg BOD removed", explanation:"Percentage of energy consumed in wastewater treatment with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems", },
	wwt_KPI_nrg_biogas:{description:"Energy production from biogas",                                            magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Unit energy consumption per BOD mass removed in wastewater treatment plants", },
	wwt_KPI_biog_x_bod:{description:"Biogas produced per mass removed",                                         magnitude:"Volume/Mass", unit:"Nm3/kg BOD removed", explanation:"Unit energy production per treated wastewater in wastewater treatment plants", },
	wwt_KPI_nrg_x_biog:{description:"Electrical energy produced per total available energy in biogas",          magnitude:"Percent", unit:"%", explanation:"Unit biogas produced per BOD mass removed in wastewater treatment plants", },
	wwt_KPI_sludg_prod:{description:"Sludge production (total weight)",                                         magnitude:"Mass/Volume", unit:"kg/m3", explanation:"Percentage of the electrical energy produced related to the available energy in biogas", },
	wwt_KPI_dry_sludge:{description:"<span style=color:red>Formula TBD</span> Dry weight in sludge production", magnitude:"Percent", unit:"% DW", explanation:"Unit sludge production per treated wastewater in wastewater treatment plants", },
	wwt_KPI_capac_util:{description:"Capacity utilisation",                                                     magnitude:"Percent", unit:"%", explanation:"Percentage of dry weight of sludge that comes out from the WWTP to disposal", },

	wtE01 :{description:"WTPs with trickling filters (TF)",                                         magnitude:"Percent", unit:"%", explanation:"Percentage of each treatment type, in terms of volume treated, of all WWTPs assessed", },
	wtE02 :{description:"WTPs with activated sludge (AS)",                                          magnitude:"Percent", unit:"%", explanation:"", },
	wtE03 :{description:"WTPs with AS and Coagulation/Filtration (C/F)",                            magnitude:"Percent", unit:"%", explanation:"", },
	wtE04 :{description:"WTPs with AS nitrification and C/F",                                       magnitude:"Percent", unit:"%", explanation:"", },
	wtE05 :{description:"WWTPs with Lagoons",                                                       magnitude:"Percent", unit:"%", explanation:"", },
	wtE06 :{description:"WWTPs with other type of treatment",                                       magnitude:"Percent", unit:"%", explanation:"", },

	wdE1  :{description:"Energy consumption per discharged wastewater",                             magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Percentage of the tests carried out in wastewater treatment plants that comply with discharge consents", },
	wdE2  :{description:"Energy consumption of discharged wastewater per total energy consumption", magnitude:"Percent", unit:"%", explanation:"Unit energy consumption per discharged wastewater in wastewater interception and discharged", },
	wdE3  :{description:"Standardised energy consumption",                                          magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m", explanation:"Percentage of energy consumed in wastewater discharged with regards to the Total energy consumed from the grid and self produced in the water and wastewater systems", },
	wdE4  :{description:"Energy recovery per discharged water",                                     magnitude:"Energy/Volume", unit:"kWh/m3", explanation:"Average energy consumption per pumping discharged wastewater per head", }, 
	wdE5  :{description:"Standardized energy recovery",                                             magnitude:"Energy/Volume/Head", unit:"kWh/m3/100m", explanation:"Unit energy recovered in water discharge", },
}
