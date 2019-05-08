function init()
{
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedTeamingroups).fail(ajaxFailed);
} 

function receivedTeamingroups(data)
{
    alert(data);
}

function ajaxFailed() 
{
    alert("Error");
}

window.onload=init;