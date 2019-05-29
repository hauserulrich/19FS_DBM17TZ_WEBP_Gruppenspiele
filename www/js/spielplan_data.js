function init(){
    // erhalte eingetragene punkte von db und starte bei erfolg receivedpunkte
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/games.php"}).done(receivedpunkte).fail(ajaxFailed);
}

// initialize punkte_arr
var punkte_arr;

function receivedpunkte(tore){
    // speichere daten von games.php in punkte_arr
    punkte_arr = JSON.parse(tore);
    // ajax call -> erhalte teamnamen und ihre gruppen_id bei erfolg starte receivedteamnames
    $.ajax({url: "http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    // initialize content as string -> speichere alle outputs in content
    var content = "";
    // speichere daten von teamingroups.php in data_arr
    var data_arr = JSON.parse(data);
    // speichere gruppen_id in gruppen array
    var gruppen = [];
    for(var i in data_arr){
        gruppen.push(data_arr[i].gruppen_id);
    }
    
    // falls gruppen existieren
    if(gruppen.length > 1){
        // loesche dublikate aus gruppen
        gruppen = [...new Set(gruppen)];
        var resultat_existiert = false;
        // initialize counter um zu wissen welches inputfeld abgefragt werden muss bei eintrag von resultat
        var counter = 0;
        // für jede gruppe mache folgendes
        for(var i in gruppen){
            // parseInt um string in int zu wandeln und bsp gruppe 0 als gruppe 1 abzubilden
            content += '<h2>Gruppe ' + (parseInt(gruppen[i])+1) + '</h2>';
            content += '<table>';
            content += '<tr>';
            content += '<th>Team 1</th>';
            content += '<th>Team 2</th>';
            content += '<th>Ergebnis Team 1</th>';
            content += '<th>Ergebnis Team 2</th>';
            content += '</tr>';
            // für jedes team suche die teams mit aktueller gruppen_id
            for(q in data_arr){
                if(data_arr[q].gruppen_id == gruppen[i]){
                    // sucher erneut jedes team mit aktueller gruppen_id 
                    for(w in data_arr){
                        if(data_arr[w].gruppen_id == gruppen[i]){
                            resultat_existiert = false;
                            // lasse jedes team aus einer gruppe gegen jeden aus derselben gruppe einmal antretten
                            if(data_arr[q] != data_arr[w] && data_arr[q].id < data_arr[w].id){
                                content += '<tr>';
                                content += '<td>' + data_arr[q].name; + '</td>';
                                content += '<td>' + data_arr[w].name; + '</td>';

                                // gehe durch alle eintraege von games.php
                                for(t in punkte_arr){
                                    // falls team_id ueberreinstimmt von games.php mit aktueller team_id
                                    // das heisst ein spielresultat existiert bereits
                                    if((punkte_arr[t].team1_id == data_arr[q].id) && (punkte_arr[t].team2_id == data_arr[w].id)){
                                        content += '<td><input type="text" class="form-control" team1_id="' + data_arr[q].id + '" eintrag="' + counter + '" name="punkte_team1" value="' + punkte_arr[t].punkte_team1 + '"></td>';
                                        content += '<td><input type="text" class="form-control" team2_id="' + data_arr[w].id + '" eintrag="' + counter + '" name="punkte_team2" value="' + punkte_arr[t].punkte_team2 + '"></td>';
                                        // moeglichkeit das resultat zu aendern, bei eintragen_tore wird die info mitgesendet, dass bereits ein eintrag existiert
                                        content += '<td style="border: none"><button onclick="eintragen_tore(1, ' + counter + ')" id="' + counter + '" name="submit_tore" type="submit" class="btn btn-light">ändern</button></td>';
                                        // setze var auf true da resultat existiert
                                        resultat_existiert = true;
                                    }
                                }
                                // falls spielresultat noch nicht eingetragen wurde
                                if(!resultat_existiert){
                                    content += '<td><input type="text" class="form-control" team1_id="' + data_arr[q].id + '" eintrag="' + counter + '" name="punkte_team1" placeholder="kein Eintrag"></td>';

                                    content += '<td><input type="text" class="form-control" team2_id="' + data_arr[w].id + '" eintrag="' + counter + '" name="punkte_team2" placeholder="kein Eintrag"></td>';
                                    // speichere input durch click -> eintragen_tore(existiert, counter)
                                    // die info das noch kein eintrag existiert wird mitgesendet
                                    content += '<td style="border: none"><button onclick="eintragen_tore(0, ' + counter + ')" id="' + counter + '" name="submit_tore" type="submit" class="btn btn-light">eintragen</button></td>';
                                }
                                // erhoehe counter nach jeder zeile in ausgabetabelle
                                counter += 1;
                                content += '</tr>';
                            }
                        }
                    }
                }
            }
            // schliesse tabelle nach jeder gruppe
            content += '</table>';
        }
        // moeglichkeit Gruppenspiel zu beenden
        content += '<div class="clearfix"></div>';
        content += '<div class="text-center mt-5">';
        content += '<h2>Gruppenspiel beenden und Gruppensieger ernennen?</h2>';
        content += '<button style="font-size: 30px;" class="btn btn-light" onClick="beenden()";">Yes do it!</button>';
        content += '</div>';
    }
    // falls nur ein team registriert ist
    else if(gruppen.length == 1) {
        content += "<p>Es müssen mindestens zwei Teams registriert sein!</p>";
        content += '<button class="btn btn-light" onClick="register()">Zweites Team registrieren!</button>';
    }
    // falls kein team registriert ist
    else {
        content += '<p>Noch kein Team registriert!</p>';
        content += '<button class="btn btn-light" onClick="register()">Neues Team registrieren!</button>';
    }
    // gib content weiter an #spielplan in spielplan.html
    $("#spielplan").html(content);
}

//on click auf "Neues Team registrieren!" oder "Zweites Team registrieren!"
function register(){
     window.location = "registrieren.html";
}

// onclick auf "eintragen" oder "aendern"
function eintragen_tore(existiert, counter){
    // erhalte punkte von inputfeld mit name punkte_team1
    var team1 = document.getElementsByName("punkte_team1");
    // gehe durch alle elemente
    for (var q = 0; q < team1.length; q++) {
        // get attribut eintrag
        var eintrag = team1[q].getAttribute("eintrag");
        // falls eintrag == uebergebene counter nr
        if(eintrag == counter){
            // get value and team1_id
            var punkte_team1 = team1[q].value;
            var team1_id = team1[q].getAttribute("team1_id");
            break;
        }
    }
    // erhalte punkte von inputfeld mit name punkte_team2
    var team2 = document.getElementsByName("punkte_team2");
    // gehe durch alle elemente
    for (var q = 0; q < team2.length; q++) {
        // get attribut eintrag
        var eintrag = team2[q].getAttribute("eintrag");
        // falls eintrag == uebergebene counter nr
        if(eintrag == counter){
            // get value and team2_id
            var punkte_team2 = team2[q].value;
            var team2_id = team2[q].getAttribute("team2_id");
            break;
        }
    }
    // sende team1_id, team2_id und punkte_team1, punkte_team2 an resultadd um die resultate zu speichern
    // bei erfolg call eintrag_erfolgreich mit info ob eintrag bereits existierte oder neu eingetragen wurde
    $.ajax({url : 'http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/resultadd.php?team1_id='+team1_id+'&team2_id='+team2_id+'&punkte_team1='+punkte_team1+'&punkte_team2='+punkte_team2 }).done(eintrag_erfolgreich(existiert)).fail(ajaxFailed);
    
}

// alert erfolgsmeldung und lade tabelle neu
function eintrag_erfolgreich(existiert){
    // eintrag existierte bereits und wurde evtl. veraendert
    if(existiert){
        alert("Eintrag neu gespeichert!");
    }
    // eintrag wurde neu gespeichert
    else{
        alert("Erfolgreich eingetragen!");
    }
    init();
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
