function init(){
    // ajax call um teamnames zu erhalten, bei erfolg call receivedteamnames
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    // speichere daten aus teamnames in data_arr
    var data_arr = JSON.parse(data);
    // initialize content as string
    var content = "";
    // falls teams dabei sind gehe durch array und zeige teamname in liste
    if(data_arr.length != 0){
        for(var i in data_arr) {
            content += "<li>" + data_arr[i] + "</li>";
        }
    }
    // falls kein team registriert ist
    else {
        content += "<li>Noch kein Team registriert!</li>";
    }
    // zeige content in #groupnames in registrieren.html
    $("#groupnames").html(content);
}

// bei ajax fail
function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;