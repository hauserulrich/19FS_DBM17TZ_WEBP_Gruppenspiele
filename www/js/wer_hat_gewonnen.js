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
            var ein_gewinner = false;
            content += '<div class="group"><h2>Gruppe ' + (parseInt(gruppen[i])+1) + '</h2>';
            //reset platzierung für jede gruppe
            var platzierung = [];
            for(var q in data_arr){
                // reset punkte für jedes team
                var punkte = 0;
                var tore = 0;
                // falls gruppen_id mit der der gruppen id des teams in data_arr ueberreinstimmt
                if(data_arr[q].gruppen_id == gruppen[i]){
                    for(var id in punktestand){
                        // erhalte punkte von aktuellem team
                        if(punktestand[id][0] == data_arr[q].id){
                            punkte = punktestand[id][1];
                            tore = punktestand[id][2];
                            break;
                        }
                    }
                    // push punkte und teamname in array platzierung
                    platzierung.push([punkte, data_arr[q].name, tore]);
                }
            }
            // sortiere array platzierung nach punkte absteigend
            platzierung.sort(function([a], [b]){return [b] - [a]});
            // der beste hat mind. 1 punkt
            if(platzierung[0][0] != 0){
                if(platzierung.length > 1){
                    if(platzierung[0][0] == platzierung[1][0]){
                        if(platzierung.length > 2){
                            if(platzierung[0][0] == platzierung[2][0]){
                                if(platzierung.length > 3){
                                    if(platzierung[0][0] == platzierung[3][0]){
                                        // alle vier sind gleich 
                                        sortiere_nach_tore();
                                    }
                                    else{
                                        // die ersten drei sind gleich bei 4 total
                                        platzierung.pop();
                                        sortiere_nach_tore();
                                    }
                                }
                                else{
                                    // die ersten drei sind gleich bei 3 total
                                    sortiere_nach_tore();
                                }
                            }
                            else{
                                // die ersten zwei sind gleich bei 3 total
                                platzierung.pop();
                                sortiere_nach_tore();
                            }
                        }
                        else{
                            // die ersten zwei sind gleich bei 2 total
                            sortiere_nach_tore();
                        }
                    }
                    else{
                        ein_gewinner = true;
                    }
                }
                else{
                    ein_gewinner = true;
                }
                
            }
            // es wurden keine resultate eingetragen -> der beste hat 0 punkte
            else {
                content += '<p>Es wurde nicht gespielt!</p>';
            }
            // falls ein_gewinner true ist
            if(ein_gewinner){
                content += '<p><strong>Sieger</strong><br> ' + platzierung[0][1];
                content += '<br>mit <strong>' + platzierung[0][0] + ' Punkte</strong>';
                content += '</p>';
            }
            // sortiert neu nach anzahl tore und gibt sieger aus
            function sortiere_nach_tore(){
                platzierung.sort(function(a, b){return b[2] - a[2]});
                content += '<p><strong>Sieger</strong><br> ' + platzierung[0][1];
                content += '<br>mit <strong>' + platzierung[0][0] + ' Punkte (Punktegleichstand)</strong>';
                content += '<br>und <strong>' + platzierung[0][2] + ' Tore</strong>';
                content += '</p>';
            }
            
            content += '</div>';
        }
    }
    
    // gib alles in content weiter an #sieger_content in beendet.html
    $("#sieger_content").html(content);
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
    
    // add 0 punkte zu jeder team_id und 0 tore
    for(var i in punktestand){
        punktestand[i] = [punktestand[i], 0, 0];
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
        
        // anzahl tore speichern, wird gebraucht bei punktegleichstand
        for(var id in punktestand){
            if(punktestand[id][0] == data_arr[i].team1_id){
                // eingetragene tore speichern
                punktestand[id][2] += parseInt(data_arr[i].punkte_team1);
            }
            if(punktestand[id][0] == data_arr[i].team2_id){
                punktestand[id][2] += parseInt(data_arr[i].punkte_team2);
            }
        }
    }
    // bei erfolg erhalte teamname
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

// reset db and if wanted preset db
function reset(id) {
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/dbwipe.php"}).done(weiter).fail(ajaxFailed);
    function weiter(){
        if(id == 1){
            $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/dbpreset.php"}).done(go_home).fail(ajaxFailed);
        }
        else {
            window.location = "index.html";
        }
    }
}

// go home
function go_home(){
     window.location = "index.html";
}

// bei ajax fehler
function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;