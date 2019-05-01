# API fuer die Gruppenspiele Zugriff DB

## Seite Teameingabe/TRegistration

### Eingabe Team

* Teamname
* Gruppen-ID

URL: teamadd.php?teamname=xxxx&groupid=xyz

### Abfrage Teams

* Teamname

URL: teamnames.php -> alle teamnamen

## Seite Gruppenuebersicht

### Abfrage Teams mit Gruppe

* Teamname
* Gruppen-ID
* Punktestand

URL: teamingroups.php -> alle teams + group-id
URL: gamesofteam.php?teamname=xyz

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

URL: teamingroups.php -> alle teams + group-id
URL: gameadd.php?team1=xyz&team=xyz
URL: games.php -> team-id ersetzt durch teamnamen

### Erfassung Begegnungsergebnis

* Begnung-id
* Punkte1
* Punkte2

URL: resultadd.php?game=id&result1=xy&result2=xy

