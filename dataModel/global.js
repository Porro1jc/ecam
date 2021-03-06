/** Main data structure */
var Global = {
	General:{
		"Name":                    "Unnamed system",
		"Location":                "Canada, Europe, Russia, Oceania",
		"Assessment Period Start": "2017-01-01",
		"Assessment Period End":   "2018-01-01",
		"Comments":                "",
		"Currency":                "USD",
		"conv_kwh_co2":            0,  /** conversion factor for grid electricity () */
		Days:function()
		{
			var startDate = new Date(Global.General["Assessment Period Start"]);
			var finalDate = new Date(Global.General["Assessment Period End"]);
			return (finalDate-startDate)/1000/60/60/24;
		},
		Years:function()
		{
			return this.Days()/365;
		},
		TotalGHG:function()
		{
			return Global.Water.ws_KPI_GHG()+Global.Waste.ww_KPI_GHG();
		},
	},

	/** Level 1 - Water Supply*/
	Water:{
		"ws_resi_pop"   :0,
		"ws_serv_pop"   :0,
		"ws_vol_auth"   :0,
		"ws_nrg_cons"   :0,
		"ws_nrg_cost"   :0,
		"ws_run_cost"   :0,
		"ws_vol_fuel"   :0,
		"ws_non_revw"   :0,
		ws_KPI_GHG_elec: function(){return this.ws_nrg_cons*Global.General.conv_kwh_co2},
		ws_KPI_GHG_ne  : function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.engines_in_water]; return this.ws_vol_fuel*fuel.FD*fuel.NCV/1000*(fuel.EFCO2+Cts.ct_n2o_eq.value*fuel.EFN2O.engines+Cts.ct_ch4_eq.value*fuel.EFCH4.engines) } ,
		ws_KPI_GHG     : function(){return this.ws_KPI_GHG_elec()+this.ws_KPI_GHG_ne()},

		ws_SL_serv_pop : function(){return 100*Global.Water.ws_serv_pop/Global.Water.ws_resi_pop},
		ws_SL_nrg_cost : function(){return 100*this.ws_nrg_cost/this.ws_run_cost},
		ws_SL_auth_con : function(){return 1000*this.ws_vol_auth/this.ws_serv_pop/Global.General.Days()},
		ws_SL_non_revw : function(){if(this.Abstraction.wsa_vol_conv==0) return this.ws_non_revw; else return Math.max(0,100*(this.Abstraction.wsa_vol_conv-this.ws_vol_auth)/this.Abstraction.wsa_vol_conv)},
		ws_SL_nrw_emis : function(){return this.ws_KPI_GHG()*this.ws_SL_non_revw()/100},
		ws_SL_auc_emis : function(){return this.ws_KPI_GHG()-this.ws_SL_nrw_emis()},

		"Abstraction":{
			"wsa_nrg_cons":0,
			"wsa_vol_conv":0,
			"wsa_nrg_turb":0,
			wsa_KPI_nrg_per_m3:function(){return this.wsa_nrg_cons/this.wsa_vol_conv},
			wsa_KPI_nrg_recovery : function(){return this.wsa_nrg_turb/this.wsa_vol_conv},
			wsa_KPI_std_nrg_cons:function(){return (this.wsa_nrg_cons+this.wsa_nrg_turb)/this.c_wsa_vol_head()},
			wsa_KPI_std_nrg_recv:function(){return this.wsa_nrg_turb/this.c_wsa_trb_head()},
			ws_SL_serv_pop:function(){return Global.Water.ws_SL_serv_pop()},
			ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
			ws_SL_non_revw:function(){return Global.Water.ws_SL_non_revw()},
			/*<Level3>*/
			"wsa_vol_pump":0,
			"wsa_pmp_head":0,
			"wsa_vol_turb":0,
			"wsa_trb_head":0,
			"wsa_wat_loss":0,
			"wsa_main_len":0,
			"wsa_fri_loss":0,
			c_wsa_vol_head:function(){return this.wsa_vol_pump*this.wsa_pmp_head/100},
			c_wsa_trb_head:function(){return this.wsa_vol_turb*this.wsa_trb_head/100},
			wsa_KPI_water_losses:function(){return 1000*this.wsa_wat_loss/this.wsa_main_len},
			wsa_KPI_un_head_loss:function(){return 1000*this.wsa_fri_loss/this.wsa_main_len},
			/*</Level3>*/
		},

		"Treatment":{
			"wst_nrg_cons":0,
			"wst_vol_trea":0,
			wst_KPI_nrg_per_m3 : function(){return this.wst_nrg_cons/this.wst_vol_trea},
			wst_KPI_slu_per_m3 : function(){return this.wst_mass_slu/this.wst_vol_trea},
			wst_KPI_capac_util : function(){return 100*this.wst_vol_trea/this.wst_trea_cap},
			ws_SL_serv_pop:function(){return Global.Water.ws_SL_serv_pop()},
			ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
			/*<Level3>*/
			"wst_tst_carr":0,
			"wst_tst_disc":0,
			"wst_tst_aest":0,
			"wst_tst_micr":0,
			"wst_tst_phch":0,
			"wst_tst_radi":0,
			"wst_mass_slu":0,
			"wst_trea_cap":0, 
			"wst_t_PCFSFD":0,
			"wst_t_PCF_FD":0,
			"wst_t__CFSFD":0,
			"wst_t__CF_FD":0,
			"wst_t______D":0,
			"wst_t__other":0,
			wst_KPI_t_PCFSFD:function(){return this.wst_t_PCFSFD/this.wst_vol_trea},
			wst_KPI_t_PCF_FD:function(){return this.wst_t_PCF_FD/this.wst_vol_trea},
			wst_KPI_t__CFSFD:function(){return this.wst_t__CFSFD/this.wst_vol_trea},
			wst_KPI_t__CF_FD:function(){return this.wst_t__CF_FD/this.wst_vol_trea},
			wst_KPI_t______D:function(){return this.wst_t______D/this.wst_vol_trea},
			wst_KPI_t__other:function(){return this.wst_t__other/this.wst_vol_trea},
			wst_SL_qual_com :function(){return 100*(this.wst_tst_aest+this.wst_tst_micr+this.wst_tst_phch+this.wst_tst_radi)/this.wst_tst_carr},
			/*</Level3>*/
		},

		"Distribution":{
			"wsd_nrg_cons":0,
			"wsd_vol_dist":0,
			"wsd_auth_con":0,
			wsd_KPI_nrg_per_m3:function(){return this.wsd_nrg_cons/this.wsd_auth_con},
			wsd_KPI_std_nrg_cons:function(){return (this.wsd_nrg_cons+this.wsd_nrg_recv)/this.c_wsd_vol_head()},
			ws_SL_serv_pop:function(){return Global.Water.ws_SL_serv_pop()},
			ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
			ws_SL_non_revw:function(){return Global.Water.ws_SL_non_revw()},
			/*<Level3>*/
			"wsd_deli_pts":0,
			"wsd_ser_cons":0,
			"wsd_time_pre":0,
			"wsd_min_pres":0,
			"wsd_hi_no_el":0,
			"wsd_lo_no_el":0,
			"wsd_av_no_el":0,
			"wsd_wt_el_no":0,
			"wsd_vol_pump":0,
			"wsd_pmp_head":0,
			"wsd_nrg_recv":0,
			"wsd_main_len":0,
			"wsd_fri_loss":0,
			c_wsd_nrg_natu:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_wt_el_no-this.wsd_lo_no_el)/3600000},
			c_wsd_nrg_mini:function(){return Cts.ct_gravit.value*this.wsd_auth_con*(this.wsd_min_pres+this.wsd_av_no_el-this.wsd_lo_no_el)/3600000},
			c_wsd_nrg_supp:function(){return this.wsd_nrg_cons+this.c_wsd_nrg_natu()},
			c_wsd_nrg_topo:function(){return Cts.ct_gravit.value*this.wsd_vol_dist*(this.wsd_hi_no_el-this.wsd_av_no_el)/3600000},
			c_wsd_vol_head:function(){return this.wsd_vol_pump*this.wsd_pmp_head/100},
			wsd_KPI_nrg_efficien:function(){return 100*this.c_wsd_nrg_mini()/(this.c_wsd_nrg_supp()-this.wsd_nrg_recv)},
			wsd_KPI_nrg_topgraph:function(){return 100*this.c_wsd_nrg_topo()/(this.c_wsd_nrg_supp()-this.wsd_nrg_recv)},
			wsd_KPI_water_losses:function(){
				if(Global.Water.Abstraction.wsa_vol_conv!=0)
					return 1000*(Global.Water.Abstraction.wsa_vol_conv-Global.Water.ws_vol_auth)/(this.wsd_main_len)
				else
					return 0;
			},
			wsd_KPI_un_head_loss:function(){return 1000*this.wsd_fri_loss/this.wsd_main_len},
			wsd_SL_pres_ade:function(){return 100*this.wsd_deli_pts/this.wsd_ser_cons},
			wsd_SL_cont_sup:function(){return 100*this.wsd_time_pre/24},
			/*</Level3*/
		}
	},

	/** Level 1 - Wastewater*/
	Waste:{
		"ww_resi_pop" :0,
		"ww_conn_pop" :0,
		"ww_serv_pop" :0,
		"ww_vol_coll" :0,
		"ww_vol_wwtr" :0,
		"ww_nrg_cons" :0,
		"ww_nrg_cost" :0,
		"ww_run_cost" :0,
		"ww_bod_infl" :0,
		"ww_bod_effl" :0,
		"ww_bod_slud" :0,
		"ww_num_trip" :0,
		"ww_dist_dis" :0,
		"ww_n2o_effl" :0,
		"ww_vol_fuel" :0,
		"ww_prot_con" :25,
		"ww_bod_pday" :40,
		"ww_ch4_efac" :0.06,
		"ww_biog_pro":0,
		"ww_biog_val":0,
		c_ww_bod_rmvd:function(){return this.ww_bod_infl-this.ww_bod_effl},

		//we consider that 100% of biogas is valorized if the user did not enter ww_biog_pro
		c_ww_biogas_flar:function()
		{
			if(Global.Configuration["Yes/No"]["producing_biogas"])
			{
				if(this.ww_biog_pro==0)
				{
					if(Global.Configuration["Yes/No"]["valorizing_biogas"])
						return 0;
					else
						return this.ww_serv_pop * this.ww_bod_pday * Cts.ct_bod_kg.value * Cts.ct_biog_g.value/1000 * Global.General.Days();
				}
				else
					return this.ww_biog_pro - this.ww_biog_val;
			}
			else
				return 0;
		},

		c_ww_nrg_engines     : function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.engines_in_waste]; return this.ww_vol_fuel*fuel.FD*fuel.NCV/1000; },
		c_ww_nrg_tsludge     : function(){return this.ww_num_trip*2*this.ww_dist_dis*0.25*0.84*43/1000000/1000},
		c_ww_in_dilution     : function(){if(this.ww_vol_wwtr==0) return 0; else return this.ww_vol_wwtr-this.ww_vol_coll*this.ww_serv_pop/this.ww_conn_pop},
		ww_KPI_GHG_elec	     : function(){return this.ww_nrg_cons*Global.General.conv_kwh_co2},
		ww_KPI_GHG_ne_engines: function(){var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.engines_in_waste]; return this.c_ww_nrg_engines()*(fuel.EFCO2+Cts.ct_ch4_eq.value*fuel.EFCH4.engines+Cts.ct_n2o_eq.value*fuel.EFN2O.engines) }, //old c_ww57
		ww_KPI_GHG_ne_tsludge: function(){
			var fuel=Tables['Fuel types'][Global.Configuration.Selected.FuelType.truck_transport_waste];
			return this.c_ww_nrg_tsludge()*(fuel.EFCO2+Cts.ct_ch4_eq.value*fuel.EFCH4.vehicles+Cts.ct_n2o_eq.value*fuel.EFN2O.vehicles)
		},
		ww_KPI_GHG_ne_ch4_wwt: function(){return ((this.ww_bod_infl-this.ww_bod_slud-this.ww_bod_effl)*this.ww_ch4_efac+Cts.ct_ch4_lo.value/100*this.c_ww_biogas_flar()*Cts.ct_ch4_bi.value/100*Cts.ct_ch4_m3.value)*Cts.ct_ch4_eq.value}, //old c_ww55
		ww_KPI_GHG_ne_n2o_tre: function(){return Cts.ct_n2o_eq.value*this.ww_n2o_effl*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value}, //old c_ww53
		ww_KPI_GHG_ne_ch4_unt: function(){return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_bod_pday/1000*Global.General.Days()*Cts.ct_ch4_ef.value*Cts.ct_ch4_eq.value},                   //old c_ww52
		ww_KPI_GHG_ne_n2o_unt: function(){
			return (this.ww_conn_pop-this.ww_serv_pop)*this.ww_prot_con*Global.General.Years()*Cts.ct_fra_np.value*Cts.ct_fac_nc.value*Cts.ct_fac_ic.value*Cts.ct_ef_eff.value*Cts.ct_n2o_co.value*Cts.ct_n2o_eq.value
			}, //old c_ww51

		ww_KPI_GHG_ne_unt:     function(){return this.ww_KPI_GHG_ne_ch4_unt()+this.ww_KPI_GHG_ne_n2o_unt()},
		ww_KPI_GHG_ne_tre:     function(){return this.ww_KPI_GHG_ne_ch4_wwt()+this.ww_KPI_GHG_ne_n2o_tre()},
		ww_KPI_GHG_ne:         function(){return this.ww_KPI_GHG_ne_ch4_wwt()+this.ww_KPI_GHG_ne_n2o_tre()+this.ww_KPI_GHG_ne_tsludge()+this.ww_KPI_GHG_ne_ch4_unt()+this.ww_KPI_GHG_ne_n2o_unt()+this.ww_KPI_GHG_ne_engines()}, 

		ww_KPI_GHG:            function(){return this.ww_KPI_GHG_elec()+this.ww_KPI_GHG_ne()},
		ww_SL_nrg_cost:        function(){return 100*this.ww_nrg_cost/this.ww_run_cost},
		ww_SL_serv_pop:        function(){return 100*Global.Waste.ww_serv_pop/Global.Waste.ww_resi_pop},
		ww_SL_vol_pday:        function(){return 1000*this.ww_vol_wwtr/this.ww_serv_pop/Global.General.Days()},
		ww_SL_treat_m3:        function(){return 100*this.ww_serv_pop/this.ww_conn_pop},
		ww_SL_dilution:        function(){return 100*this.c_ww_in_dilution()/this.ww_vol_coll},
		ww_SL_dil_emis:			   function(){ 
			return -1 //not implemented
		},

		"Collection":{
			"wwc_nrg_cons":0,
			"wwc_vol_conv":0,
			wwc_KPI_nrg_per_m3 : function(){return this.wwc_nrg_cons/this.wwc_vol_conv},
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			ww_SL_treat_m3: function(){return Global.Waste.ww_SL_treat_m3()},
			ww_SL_dilution: function(){return Global.Waste.ww_SL_dilution()},
			/*<Level3>*/
			"wwc_vol_pump":0,
			"wwc_pmp_head":0,
			c_wwc_vol_head    : function(){return this.wwc_vol_pump*this.wwc_pmp_head/100},
			wwc_KPI_std_nrg_cons: function(){return this.wwc_nrg_cons/this.c_wwc_vol_head()},
			/*</Level3>*/
		},

		"Treatment":{
			"wwt_nrg_cons"     :0,
			"wwt_vol_trea"     :0,
			"wwt_bod_infl"     :0,
			"wwt_bod_effl"     :0,
			"wwt_nrg_biog"     :0,
			"wwt_ch4_biog"     :0,
			"wwt_biog_pro"     :0,
			"wwt_biog_val"     :0,
			"c_wwt_nrg_biog"   :function(){return this.wwt_biog_val*this.wwt_ch4_biog/100*10},
			"c_wwt_bod_rmvd"   :function(){return this.wwt_bod_infl-this.wwt_bod_effl},
			wwt_KPI_nrg_per_m3 :function(){return this.wwt_nrg_cons/this.wwt_vol_trea},
			wwt_KPI_nrg_per_kg :function(){return this.wwt_nrg_cons/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_biogas :function(){return this.wwt_nrg_biog/this.wwt_vol_trea},
			wwt_KPI_biog_x_bod :function(){return this.wwt_biog_pro/this.c_wwt_bod_rmvd()},
			wwt_KPI_nrg_x_biog :function(){return 100*this.wwt_nrg_biog/this.c_wwt_nrg_biog()},
			wwt_KPI_sludg_prod :function(){return this.wwt_mass_slu/this.wwt_vol_trea},
			wwt_KPI_dry_sludge :function(){return 100*this.wwt_dryw_slu/this.wwt_mass_slu},
			wwt_KPI_capac_util :function(){return 100*this.wwt_vol_trea/this.wwt_trea_cap},
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			ww_SL_vol_pday: function(){return Global.Waste.ww_SL_vol_pday()},
			ww_SL_dilution: function(){return Global.Waste.ww_SL_dilution()},
			/*<Level3>*/
				"wwt_tst_cmpl":0,
				"wwt_tst_cond":0,
				"wwt_t_T_____":0,
				"wwt_t__A____":0,
				"wwt_t__A_CF_":0,
				"wwt_t__ANCF_":0,
				"wwt_t______L":0,
				"wwt_t__other":0,
				"wwt_mass_slu":0,
				"wwt_dryw_slu":0,
				"wwt_trea_cap":0,
				wwt_KPI_t_T_____:function(){return 100*this.wwt_t_T_____/this.wwt_vol_trea},
				wwt_KPI_t__A____:function(){return 100*this.wwt_t__A____/this.wwt_vol_trea},
				wwt_KPI_t__A_CF_:function(){return 100*this.wwt_t__A_CF_/this.wwt_vol_trea},
				wwt_KPI_t__ANCF_:function(){return 100*this.wwt_t__ANCF_/this.wwt_vol_trea},
				wwt_KPI_t______L:function(){return 100*this.wwt_t______L/this.wwt_vol_trea},
				wwt_KPI_t__other:function(){return 100*this.wwt_t__other/this.wwt_vol_trea},
				wwt_SL_qual_com: function(){return 100*this.wwt_tst_cmpl/this.wwt_tst_cond},
			/*</Level3>*/
		},

		"Discharge":{
			"wwd_nrg_cons":0,
			"wwd_vol_disc":0,
			"wwd_nrg_recv":0,
			wwd_KPI_nrg_per_m3:function(){return this.wwd_nrg_cons/this.wwd_vol_disc||0},
			wwd_KPI_nrg_rcv_di:function(){return this.wwd_nrg_recv/this.wwd_vol_disc},
			wwd_KPI_std_nrg_cons:function(){return (this.wwd_nrg_cons+this.wwd_nrg_recv)/this.c_wwd_vol_head()},
			wwd_KPI_std_nrg_recv:function(){return this.wwd_nrg_recv/this.c_wwd_trb_head()},
			ww_SL_serv_pop: function(){return Global.Waste.ww_SL_serv_pop()},
			ww_SL_vol_pday: function(){return Global.Waste.ww_SL_vol_pday()},
			/*<Level3>*/
				"wwd_vol_pump":0,
				"wwd_pmp_head":0,
				"wwd_vol_turb":0,
				"wwd_trb_head":0,
				c_wwd_vol_head:function(){return this.wwd_vol_pump*this.wwd_pmp_head/100},
				c_wwd_trb_head:function(){return this.wwd_vol_turb*this.wwd_trb_head/100},
			/*</Level3>*/
		},
	},

	/** Old "General" Level2 */
	Energy:{
		wsg_KPI_nrg_cons:function(){return Global.Water.Abstraction.wsa_nrg_cons + Global.Water.Treatment.wst_nrg_cons + Global.Water.Distribution.wsd_nrg_cons},
		wsg_KPI_nrg_x_ye:function(){return this.wsg_KPI_nrg_cons()/Global.General.Years()},
		wsg_KPI_nrg_x_ys:function(){return this.wsg_KPI_nrg_x_ye()/Global.Water.ws_serv_pop},
		wsg_KPI_nrg_x_m3:function(){return this.wsg_KPI_nrg_cons()/Global.Water.Distribution.wsd_auth_con},
		wsg_KPI_std_nrg_:function(){return (Global.Water.Abstraction.wsa_KPI_std_nrg_cons()+Global.Water.Distribution.wsd_KPI_std_nrg_cons())/2},
		ws_SL_nrg_cost:function(){return Global.Water.ws_SL_nrg_cost()},

		wwg_KPI_nrg_cons:function(){return Global.Waste.Collection.wwc_nrg_cons+Global.Waste.Treatment.wwt_nrg_cons+Global.Waste.Discharge.wwd_nrg_cons},
		wwg_KPI_nrg_x_ye:function(){return this.wwg_KPI_nrg_cons()/Global.General.Years()},
		wwg_KPI_nrg_x_ys:function(){return this.wwg_KPI_nrg_x_ye()/Global.Waste.ww_serv_pop},
		wwg_KPI_nrg_x_br:function(){return this.wwg_KPI_nrg_cons()/Global.Waste.Treatment.c_wwt_bod_rmvd()},
		wwg_KPI_std_nrg_:function(){return (Global.Waste.Collection.wwc_KPI_std_nrg_cons()+Global.Waste.Discharge.wwd_KPI_std_nrg_cons())/2},
		wwg_KPI_nrg_perc:function(){return 100*this.wwg_KPI_nrg_cons()/Global.Waste.ww_nrg_cons},
		ww_SL_nrg_cost:function(){return Global.Waste.ww_SL_nrg_cost()},

		//rest of service levels indicators
		ws_SL_serv_pop:function(){return Global.Water.ws_SL_serv_pop()},
		ws_SL_auth_con:function(){return Global.Water.ws_SL_auth_con()},
		ws_SL_non_revw:function(){return Global.Water.ws_SL_non_revw()},
		ww_SL_serv_pop:function(){return Global.Waste.ww_SL_serv_pop()},
		ww_SL_vol_pday:function(){return Global.Waste.ww_SL_vol_pday()},
		ww_SL_treat_m3:function(){return Global.Waste.ww_SL_treat_m3()},
		ww_SL_dilution:function(){return Global.Waste.ww_SL_dilution()},
	},

	/** Configuration: Active Stages, questions, Technologies and Units */
	Configuration:{
		ActiveStages:{
			"water":0,
			"waterAbs":0,
			"waterTre":0,
			"waterDis":0,
			"waste":0,
			"wasteCol":0,
			"wasteTre":0,
			"wasteDis":0,
		},
		Assessment:{
			Water:{
				Abstraction:"simple",
				Treatment:"simple",
				Distribution:"simple",
			},
			Waste:{
				Collection:"simple",
				Treatment:"simple",
				Discharge:"simple",
			}
		},

		Units:{ }, //custom unit selections for variables are stored here

		/** Calculated or "estimated" assumptions are added here. (calculated is default, so only estimated is added here) */
		DataQuality:{ },

		Selected:
		{
			Country_protein:"Albania", //this is for consumed protein
			FuelType:
			{
				engines_in_water      : "Diesel",
				engines_in_waste      : "Diesel",
				truck_transport_waste : "Diesel",
			},
		},

		"Yes/No":
		{
			engines_in_water:1,
			engines_in_waste:1,
			truck_transport_waste:1,
			producing_biogas:0,
			valorizing_biogas:0,
			producing_energy_waterAbs:0,
			topographic_energy:0,
		},
	},
}
