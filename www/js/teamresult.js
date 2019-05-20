


function init(){
   $("#teamsubmit").click (teamsubmit);
}


function foo1(data)
{
  alert(data);  
}

function teamsubmit()
{
	var punkte_team1=$("#punkte_team1").val();
	var punkte_team2=$("#punkte_team2").val();
    	$.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/resultadd.php?team1_id="+team1_id+"&team2_id="+team2_id}).done(foo1);
}

window.onload=init;