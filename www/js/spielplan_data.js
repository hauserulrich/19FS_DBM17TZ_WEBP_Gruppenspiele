function init(){
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/games.php"}).done(receivedtore).fail(ajaxFailed);
    
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

var tore_arr;
function receivedtore(tore){
    tore_arr = JSON.parse(tore);
}

function receivedteamnames(data){
    var data_arr = JSON.parse(data);
    var gruppen = [];
    for(var i in data_arr){
        gruppen.push(data_arr[i].gruppen_id);
    }
    
    // Teile Teams in die gruppen
    var content = "";
    if(gruppen.length > 1){
        // loesche dublikate
        gruppen = [...new Set(gruppen)];
        var resultat_existiert = false;
        var counter = 0;
        for(var i in gruppen){
            content += '<h2>Gruppe ' + (parseInt(gruppen[i])+1) + '</h2>';
            content += '<table>';
            content += '<tr>';
            content += '<th>Team 1</th>';
            content += '<th>Team 2</th>';
            content += '<th>Ergebnis Team 1</th>';
            content += '<th>Ergebnis Team 2</th>';
            content += '</tr>';
            for(q in data_arr){
                if(data_arr[q].gruppen_id == gruppen[i]){
                    for(w in data_arr){
                        if(data_arr[w].gruppen_id == gruppen[i]){
                            resultat_existiert = false;
                            if(data_arr[q] != data_arr[w] && data_arr[q].id < data_arr[w].id){
                                content += '<tr>';
                                content += '<td>' + data_arr[q].name; + '</td>';
                                content += '<td>' + data_arr[w].name; + '</td>';

                                // falls Resultat bereits eingetragen
                                for(t in tore_arr){
                                    if((tore_arr[t].team1_id == data_arr[q].id) && (tore_arr[t].team2_id == data_arr[w].id)){
                                        content += '<td><input type="text" class="form-control" value="' + tore_arr[t].punkte_team1 + '" disabled></td>';
                                        content += '<td><input type="text" class="form-control" value="' + tore_arr[t].punkte_team2 + '" disabled></td>';
                                        resultat_existiert = true;
                                    }
                                }
                                // falls Resultat noch nicht eingetragen
                                if(!resultat_existiert){
                                    content += '<td><input type="text" class="form-control" team1_id="' + data_arr[q].id + '" eintrag="' + counter + '" name="punkte_team1" placeholder="kein Eintrag"></td>';

                                    content += '<td><input type="text" class="form-control" team2_id="' + data_arr[w].id + '" eintrag="' + counter + '" name="punkte_team2" placeholder="kein Eintrag"></td>';

                                    content += '<td style="border: none"><button onclick="eintragen_tore(' + counter + ')" id="' + counter + '" name="submit_tore" type="submit" class="btn btn-light">Speichern</button></td>';
                                    content += '<tr>';
                                    counter += 1;
                                }
                            }
                        }
                    }
                }
            }
            content += '</table>';
        }
    }
    else if(gruppen.length == 1) {
        content += "<p>Es müssen mindestens zwei Teams registriert sein!</p>";
        content += '<button class="btn btn-light" onClick="register()">Zweites Team registrieren!</button>';
    }
    else {
        content += '<p>Noch kein Team registriert!</p>';
        content += '<button class="btn btn-light" onClick="register()">Neues Team registrieren!</button>';
    }
    $("#spielplan").html(content);
}

function register(){
     window.location = "registrieren.html";
}

function eintragen_tore(counter){
    var team1 = document.getElementsByName("punkte_team1");
    for (var q = 0; q < team1.length; q++) {
        var eintrag = team1[q].getAttribute("eintrag");
        if(eintrag == counter){
            var punkte_team1 = team1[q].value;
            var team1_id = team1[q].getAttribute("team1_id");
            break;
        }
    }
    var team2 = document.getElementsByName("punkte_team2");
    for (var q = 0; q < team2.length; q++) {
        var eintrag = team2[q].getAttribute("eintrag");
        if(eintrag == counter){
            var punkte_team2 = team2[q].value;
            var team2_id = team2[q].getAttribute("team2_id");
            break;
        }
    }
    
    $.ajax({url : 'http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/resultadd.php?team1_id='+team1_id+'&team2_id='+team2_id+'&punkte_team1='+punkte_team1+'&punkte_team2='+punkte_team2 }).done(init).fail(ajaxFailed);
    
}

function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;
