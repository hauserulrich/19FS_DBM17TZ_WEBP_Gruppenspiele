function init(){
    // bei erfolg rechne punkte aus mit who_win
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/games.php"}).done(who_win).fail(ajaxFailed);
}

// erhalte teamname
function receivedteamnames(data){
    // speichere gruppen_id in data_arr
    var data_arr = JSON.parse(data);
    var content = "";
    var gruppen = [];
    // für alle teams speichere gruppen_id in gruppen
    for(var i in data_arr){
        gruppen.push(data_arr[i].gruppen_id);
    }
    
    // loesche dublikate
    gruppen = [...new Set(gruppen)];
    
    // falls gruppen array nicht leer ist
    if(gruppen.length != 0){
        // Teile Teams in die gruppen
        for(var i in gruppen){
            content += '<div class="group"><h2>Gruppe ' + (parseInt(gruppen[i])+1) + '</h2>';
            //reset platzierung für jede gruppe
            var platzierung = [];
            for(var q in data_arr){
                // reset punkte für jedes team
                var punkte = 0;
                // falls gruppen_id mit der der gruppen id des teams in data_arr ueberreinstimmt
                if(data_arr[q].gruppen_id == gruppen[i]){
                    for(var id in punktestand){
                        // erhalte punkte von aktuellem team
                        if(punktestand[id][0] == data_arr[q].id){
                            punkte = punktestand[id][1];
                            break;
                        }
                    }
                    // push punkte und teamname in array platzierung
                    platzierung.push([punkte, data_arr[q].name]);
                }
            }
            // sortiere array platzierung nach punkte absteigend
            platzierung.sort(function([a], [b]){return [b] - [a]});
            // gib platzierung der reihe nach aus
            for(var w in platzierung){
                content += '<p>' + platzierung[w][1];
                content += '<br><strong>' + platzierung[w][0] + ' Punkte</strong>';
                content += '</p>';
            }
            content += '</div>';
        }
        // moeglichkeit Gruppenspiel zu beenden
        content += '<div class="clearfix"></div>';
        content += '<div class="text-center mt-5">';
        content += '<h2>Gruppenspiel beenden und Gruppensieger ernennen?</h2>';
        content += '<button style="font-size: 30px;" class="btn btn-light" onClick="beenden()";">Yes do it!</button>';
        content += '</div>';
    }
    // falls gruppen array leer ist-> keine teams sind registriert
    else {
        content += '<p>Noch kein Team registriert!</p>';
        content += '<button class="btn btn-light" onClick="register()">Neues Team registrieren!</button>';
    }
    // gib alles in content weiter an #gruppen_content in gruppen.html
    $("#gruppen_content").html(content);
}

// falls click on button "Neues Team registrieren!" go to registrieren.html
function register(){
     window.location = "registrieren.html";
}

// initialize punktestand array fuer globalen gebrauch
var punktestand = [];

function who_win(data){
    // get data von games.php und speichere in data_arr
    var data_arr = JSON.parse(data);
    // für alle teams speichere team id in punktestand
    for(var i in data_arr){
        punktestand.push(data_arr[i].team1_id);
        punktestand.push(data_arr[i].team2_id);
    }
    // get array with unique team_id
    punktestand = [...new Set(punktestand)];
    
    // add 0 punkte zu jeder team_id
    for(var i in punktestand){
        punktestand[i] = [punktestand[i], 0];
    }
    // addiere gewonnene punkte für jedes team
    for(var i in data_arr){
        // falls team1 gewonnen hat -> 3 punkte
        if(data_arr[i].punkte_team1 > data_arr[i].punkte_team2){
            for(var id in punktestand){
                if(punktestand[id][0] == data_arr[i].team1_id){
                    punktestand[id][1] += 3;
                }
            }
        }
        // falls team2 gewonnen hat -> 3 punkte
        if(data_arr[i].punkte_team1 < data_arr[i].punkte_team2){
            for(var id in punktestand){
                if(punktestand[id][0] == data_arr[i].team2_id){
                    punktestand[id][1] += 3;
                }
            }
        }
        // falls gleichstand -> je 1 punkt
        if(data_arr[i].punkte_team1 == data_arr[i].punkte_team2){
            for(var id in punktestand){
                if(punktestand[id][0] == data_arr[i].team1_id){
                    punktestand[id][1] += 1;
                }
                if(punktestand[id][0] == data_arr[i].team2_id){
                    punktestand[id][1] += 1;
                }
            }
        }
    }
    // bei erfolg erhalte teamname
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

// onclick go to beendet.html
function beenden(){
     window.location = "beendet.html";
}

// bei ajax fehler
function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;