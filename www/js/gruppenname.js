function init(){
    $.ajax({url: "db/teamnames.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    var data_arr = data;
    var content = "";
    for(var i in data_arr) {
        inhalt = data_arr[i];
        content += "<li>" + inhalt + "</li>";
    }
    $("#groupnames").html(content);
}

function ajaxFailed(){
    alert("fail");
}

window.onload=init;