# Backlog of the project 19FS_DBM17TZ_WEBP_Mitglieder

## Info for students

### References for backlog activities

- https://www.atlassian.com/agile/scrum/backlogs
- https://blog.dotag.ch/blog/dot.tipp-die-wichtigsten-elemente-im-backlog-management
- https://t2informatik.de/wissen-kompakt/backlog/
- https://www.scruminc.com/definition-of-ready/
- https://de.wikipedia.org/wiki/Minimum_Viable_Product
Namen

## Aufbau der Webpage
  - Welcome-Seite
  - Seite Teilnehmer hinzufügen
  - Gruppenliste
  - Seite mit Gruppen inklusive aktueller Punktestand und Rangliste
  - Spielplan
  
## Aufbau erste Seite
  - Titel
  - Button Neue Gruppe hinzufügen
    * Name der Gruppe
    * Name der Speiler in Tabelle (Name 1, Name 2 ... inkl. Spieler hinzufügen und löschen)
  - Button zum Spielplan (Idee: jeder Spielt gegen jeden)
    * Gruppe auswählen
    * Tabelle mit einzelnen Spielpaarungen für jede Gruppe erstellen
  - Raster der jeweiligen Gruppen (Gruppe 1, Gruppe 2, Gruppe 3...)
    * in Raster Manschaftsname
  
## Datenbankdesign (Info: Dozent bereitet Datenbank vor, sobald Design und Abhängigkeit erstellt ist)
  - Sportler
    * Name
    * Vorname
    * Ort
    * Gruppenname
    * Gruppenmitglieder
    * Spielergebnis
  
### Abhängigkeit in der Datenbank 
  - Jeder Spieler gehört einer Gruppe an 
   
