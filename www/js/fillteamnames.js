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
    //for(var i in gruppen){
        content += '<h2>Gruppe ' + gruppen[0] + '</h2>';
        content += '<table class="tg">';
            content += '<tr>';
                content += '<th class="tg-j6a4">Team 1</th>';
                content += '<th class="tg-j6a4">Team 2</th>';
                content += '<th class="tg-j6a4">Ergebnis Team 1</th>';
                content += '<th class="tg-j6a4">Ergebnis Team 2</th>';
            content += '</tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[0].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[1].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[2].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[3].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[0].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[2].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[1].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[3].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[0].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[3].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
            content += '<tr>';
                content += '<th class="tg-6eq8">' + data_arr[1].name; + '</th>';
                content += '<th class="tg-6eq8">' + data_arr[2].name; + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<input type="text" class="form-control" value="0">' + '</th>';
                content += '<th class="tg-6eq8">' + '<button type="submit" class="btn btn-light">Bestätigen</button>' + '</th>';
            content += '<tr>';
        content += '</table>';
        
   // }
    $("#spielplan").html(content);
}

function ajaxFailed(){
    alert("fail");
}

window.onload=init;
