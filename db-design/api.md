# WEB-API of DB, technical documentation, project 19FS_DBM17TZ_WEBP_Gruppenspiele

## Data format:
The returned data format is JSON.

## DB template
The DB structure is available in the file gruppenspiel.sql
The returned JSON objects adhere to the column headers corresponding to the SQL query matching the http request.

## Access
all URL's are given as a php target in the folder `db` of the web page itself
Example URL: `all.php` -> location: `http://server/db/all.php`
At present the server is located at: http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele

## Registration/Team

### Enter team

URL: teamadd.php?name=xxxx&groupid=xyz
return: statement object

* in case of success, the id of the new team is returned
* in case of failure the statement holds error information

Example: `teamadd.php?name=name1&gruppen_id=1`

### Request teams

URL: teamnames.php
return: statement object

* in case of success, the team names are returned as an array
* in case of failure the statement holds error information

Example: `teamnames.php`

## Seite Gruppenuebersicht

### Request teams and groups

URL: teamingroups.php
return: statement object

* in case of success, the complete team records (team id, name and group id) are returned as an array
* in case of failure the statement holds error information

Example: `teamingroups.php`

URL: gamesofteam.php?teamid=xyz
return: statement object

* in case of success, the games are returned as an array
* in case of failure the statement holds error information

Example: `gamesofteam.php?id=2`

## Seite Begegnungen

##Abfrage Teams

* Teamname
* Team-id
* Gruppen-ID
* begegnungen (vollständig)

### Abfrage Begegnungsdaten
* Gruppe
* Begegnung
* team-name
* team-name
* punkte1
* punkte2

URL: teamingroups.php -> see *Request teams and groups*
URL: gameadd.php?team1=xyz&team=xyz
URL: games.php -> team-id ersetzt durch teamnamen

### Register game

URL: resultadd.php?team1\_id=xy&team2\_id=xy&punkte\_team1=xy&punkte\_team2=xy
return: statement object

* in case of success, the id of the new game is returned
* in case of failure the statement holds error information

Example: `resultadd.php?team1_id=1&team2_id=4&punkte_team1=2&punkte_team2=0`

