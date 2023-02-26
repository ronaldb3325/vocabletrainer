<?php
if (isset($_GET["id"])) {
	$pid 	= $_GET["id"];
} else {
	$pid = "";
}
   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('./vokabeln.db');
      }
   }
   
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   }

   $sql =<<<EOF
      SELECT * from myunitwords where unitid=$pid;
EOF;
   $ret = $db->query($sql);
   $cnt=0;
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
	  $rows[] = $row;
	  $cnt++;
   }
   $db->close();
   if ($cnt==0) {
	$rows=[];
   }
   print json_encode($rows);
?>