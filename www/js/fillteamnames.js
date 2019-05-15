function init(){
    $.ajax({url: "db/teamingroups.php"}).done(receivedteamnames).fail(ajaxFailed);
}

function receivedteamnames(data){
    var data_arr = JSON.parse(data);
    var gruppen_content = "";
    var gruppen = [];
    for(var i in data_arr){
        gruppen.push(data_arr[i].gruppen_id);
    }
    
    // loesche dublikate
    gruppen = [...new Set(gruppen)];
    // Teile Teams in die gruppen
    var content = "";
    for(var i in gruppen){
        content += '<h2>Gruppe ' + gruppen[i] + '</h2>';
        content += '<table class="tg">';
            content += '<tr>';
                content += '<th class="tg-j6a4">Team 1</th>';
                content += '<th class="tg-j6a4">Team 2</th>';
            content += '</tr>';
            for(var q in data_arr){
                if(data_arr[q].gruppen_id == gruppen[i]){
                    content += '<tr>';
                        content += '<th class="tg-6eq8">' + data_arr[q].name; + '</th>';
                        for(var w in data_arr){
                            if(data_arr[w].gruppen_id == gruppen[i]){
                                if(data_arr[w].name != data_arr[q].name){
                                    content += '<th class="tg-6eq8">' + data_arr[w].name; + '</th>';
                                    break;
                                }
                            }
                        }
                    content += '<tr>';
                }
            }
            
        content += '</table>';
        
    }
    $("#spielplan").html(content);
}

function ajaxFailed(){
    alert("fail");
}

window.onload=init;
