<?php

//current language is in COOKIE "lang". Default is english ("en")
$lang=isset($_COOKIE['lang']) ? $_COOKIE['lang'] : "en" ;

//load selected language
	$lang_file = file_get_contents("languages/$lang.json");
	$lang_json = json_decode($lang_file,true);
	if($lang_json==NULL)
	{
		echo "
			<script>
				var $lang = $lang_file;
			</script>";
		die("Error in $lang.json file. Paste the $lang.json file <a href='https://jsonformatter.curiousconcept.com/'>here</a> find the error.");
	}

//use $lang_json to fetch $id inside file "$lang".json
function write($id)
{
	global $lang;global $lang_json;

	//find text or display [not found]
	$text = isset($lang_json[$id]) ? $lang_json[$id] : "[ $id not found for lang $lang ]";

	echo $text;
}

?>
<script><?php echo "var lang=$lang_file;" ?></script>
<script>function translate(id){return lang['#'+id]||"[translation not found]"}</script>
