function init(){
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    var data_arr = JSON.parse(data);
    var content = "";
    if(data_arr.length != 0){
        for(var i in data_arr) {
            var inhalt = data_arr[i];
            content += "<li>" + inhalt + "</li>";
        }
    }
    else {
        content += "<li>Noch kein Team registriert!</li>";
    }
    $("#groupnames").html(content);
}

function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;