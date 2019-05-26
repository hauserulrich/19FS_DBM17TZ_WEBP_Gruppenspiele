// onClick auf #teamsubmit in registrieren.html starte ajax call und erhalte teamnames
$( "#teamsubmit" ).click(function() { 
    $.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(current_group_id).fail(fail)
});

// bei ajax erfolg rechne gruppen_id aus in welche das neue team eingetragen werden soll
function current_group_id(data){
    var team_id = 0;
    var teams = JSON.parse(data);
    // wie viele teams sind dabei
    var anzahl_teams = teams.length;
    // team_id = anzahl teams minus vier -> wieviel mal bis anzahl <= 4
    while(anzahl_teams >= 4){
        anzahl_teams -= 4;
        team_id += 1;
    }
    // rufe function teamsubmit mit team_id
    teamsubmit(team_id);
}

function teamsubmit(team_id) {
    // get input aus registrieren.html
    var team = $("#team").val();
    // falls inputfeld nicht leer ist
    if(team != ""){
        // insert team in datenbank bei erfolg call eintrag_erfolgreich
        $.ajax({url : "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamadd.php?name="+team+"&gruppen_id="+team_id+""}).done(eintrag_erfolgreich).fail(fail);

        // leere das input feld
        document.getElementById("team").placeholder = "";
        document.getElementById("team").value = "";

        // Update Liste "Folgende Teams sind dabei" mit neuem Team
        $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php"}).done(receivedteamnames).fail(fail);
    }
    // falls feld leer -> hinweis
    else{
        document.getElementById("team").placeholder = "Feld darf nicht leer sein!";
    }
}

// zeige alert mit erfolgsnachricht
function eintrag_erfolgreich(){
    alert("Erfolgreich eingetragen!");
}

// bei ajax fail
function fail() {
  alert('keine Verbindung zum Server');  
}

