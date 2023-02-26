<?php
if (isset($_GET["id"])) {
	$pid 	= $_GET["id"];
} else {
	$pid = "0";
}
if (isset($_GET["l1w1"])) {
	$pl1w1 	= $_GET["l1w1"];
} else {
	$pl1w1 = "";
}
if (isset($_GET["l1w2"])) {
	$pl1w2 	= $_GET["l1w2"];
} else {
	$pl1w2 = "";
}
if (isset($_GET["l1w3"])) {
	$pl1w3 	= $_GET["l1w3"];
} else {
	$pl1w3 = "";
}
if (isset($_GET["l2w1"])) {
	$pl2w1 	= $_GET["l2w1"];
} else {
	$pl2w1 = "";
}
if (isset($_GET["l2w2"])) {
	$pl2w2 	= $_GET["l2w2"];
} else {
	$pl2w2 = "";
}
if (isset($_GET["l2w3"])) {
	$pl2w3 	= $_GET["l2w3"];
} else {
	$pl2w3 = "";
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
insert into myunitwords (unitid, lang1w1, lang1w2, lang1w3, lang2w1, lang2w2, lang2w3)
values ($pid, '$pl1w1', '$pl1w2', '$pl1w3', '$pl2w1', '$pl2w2', '$pl2w3');
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
	);
   print json_encode($ret);
?>