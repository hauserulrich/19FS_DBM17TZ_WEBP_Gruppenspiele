


function init(){
   $("#teamsubmit").click (teamsubmit);
}


function foo1(data)
{
  alert(data);  
}

function teamsubmit()
{
    var team=$("#team").val(); 
    	$.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamadd.php?name="+team+"&gruppen_id=27"}).done(foo1);
}

window.onload=init;