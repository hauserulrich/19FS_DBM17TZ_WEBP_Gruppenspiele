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
    for(var i in gruppen){
        gruppen_content += '<div class="group"><h2>Gruppe ' + gruppen[i] + '</h2>';
        for(var q in data_arr){
            if(data_arr[q].gruppen_id == gruppen[i]){
                gruppen_content += '<p>' + data_arr[q].name;
                //gruppen_content += ': Punkte</p>';
                gruppen_content += '</p>';
            }
        }
        gruppen_content += '</div>';
    }
    $("#gruppen_content").html(gruppen_content);
}

function ajaxFailed(){
    alert("fail");
}

window.onload=init;

