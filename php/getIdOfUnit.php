<?php
if (isset($_GET["name"])) {
	$pn 	= $_GET["name"];
} else {
	$pn = "0";
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
      SELECT unitid from myunits where unitname='$pn';
EOF;
   $lastid=-1;
   $ret = $db->query($sql);
   $cnt=0;
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
	  $rows[] = $row;
     $lastid=$row['unitid'];
	  $cnt++;
   }
   $db->close();
   print $lastid;
?>