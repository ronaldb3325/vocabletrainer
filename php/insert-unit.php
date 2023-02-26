<?php
if (isset($_GET["name"])) {
	$pn 	= $_GET["name"];
} else {
	$pn = "0";
}
if (isset($_GET["cl"])) {
	$pc 	= $_GET["cl"];
} else {
	$pc = "0";
}
if (isset($_GET["l1"])) {
	$pl1 	= $_GET["l1"];
} else {
	$pl1 = "";
}
if (isset($_GET["l2"])) {
	$pl2 	= $_GET["l2"];
} else {
	$pl2 = "";
}
$msg = "okay";
   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('./vokabeln.db');
      }
   }
   
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   } else

   $sql =<<<EOF
insert into myunits (unitname, unitclass, lang1, lang2)
values ('$pn', '$pc', '$pl1', '$pl2');
EOF;

   $cnt=0;
   $query = $db->exec($sql);
   if ($query) {
      $cnt = $db->changes();
      
   }
   $db->close();
   $ret =  array(
    "count" => $cnt,
	 "sql" => $sql,
	 "msg" => $msg,
     "id" => $lastId
	);
   print json_encode($ret);
?>