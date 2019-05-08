function init()
{
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data)
{
    alert(data);
}

function ajaxFailed()
{
    
}

window.onload=init;