$( "#teamsubmit" ).click(function() { 
    $.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(current_group_id).fail(fail)
});

function current_group_id(data){
    var team_id = 0;
    var teams = JSON.parse(data);
    var anzahl_teams = teams.length;
    while(anzahl_teams >= 4){
        anzahl_teams -= 4;
        team_id += 1;
    }
    teamsubmit(team_id);
}

function teamsubmit(team_id) {
    // get input
    var team = $("#team").val();
    if(team != ""){
        // insert team in datenbank
        $.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamadd.php?name="+team+"&gruppen_id="+team_id+""}).fail(fail);

        // leere das input feld
        document.getElementById("team").placeholder = "";
        document.getElementById("team").value = "";

        // Update Liste "Folgende Teams sind dabei" mit neuem Team
        $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(receivedteamnames).fail(fail);
    }
    else{
        document.getElementById("team").placeholder = "Feld darf nicht leer sein!";
    }
}

function fail() {
  alert('keine Verbindung zum Server');  
}

