function init(){
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/games.php"}).done(who_win).fail(ajaxFailed);
    
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    var data_arr = JSON.parse(data);
    var content = "";
    var gruppen = [];
    for(var i in data_arr){
        gruppen.push(data_arr[i].gruppen_id);
    }
    
    // loesche dublikate
    gruppen = [...new Set(gruppen)];
    
    if(gruppen.length != 0){
        // Teile Teams in die gruppen
        for(var i in gruppen){
            content += '<div class="group"><h2>Gruppe ' + (parseInt(gruppen[i])+1) + '</h2>';
            var punkte = 0;
            for(var q in data_arr){
                if(data_arr[q].gruppen_id == gruppen[i]){
                    content += '<p>' + data_arr[q].name;
                    for(var id in punktestand){
                        if(punktestand[id][0] == data_arr[q].id){
                            punkte = punktestand[id][1];
                        }
                    }
                    content += '<br><strong>' + punkte + ' Punkte</strong>';
                    content += '</p>';
                }
            }
            content += '</div>';
        }
    }
    else {
        content += '<p>Noch kein Team registriert!</p>';
        content += '<button class="btn btn-light" onClick="register()">Neues Team registrieren!</button>';
    }
    $("#gruppen_content").html(content);
}

function register(){
     window.location = "registrieren.html";
}

var punktestand = [];
function who_win(data){
    var data_arr = JSON.parse(data);
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
    for(var i in data_arr){
        // team1 gewonnen
        if(data_arr[i].punkte_team1 > data_arr[i].punkte_team2){
            for(var id in punktestand){
                if(punktestand[id][0] == data_arr[i].team1_id){
                    punktestand[id][1] += 3;
                }
            }
        }
        // team2 gewonnen
        if(data_arr[i].punkte_team1 < data_arr[i].punkte_team2){
            for(var id in punktestand){
                if(punktestand[id][0] == data_arr[i].team2_id){
                    punktestand[id][1] += 3;
                }
            }
        }
        // gleichstand
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
}

function ajaxFailed(){
    alert("keine Verbindung zum Server");
}

window.onload=init;