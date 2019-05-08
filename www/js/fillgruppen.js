function init()
{
  $.ajax("http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamnames.php").done(receivedTeamnames);

}

function receivedTeamnames(data)
{
  alert(data);
}

function init()
{
  $.ajax("http://767727-7.web1.fh-htwchur.ch/19FS_DBM17TZ_WEBP_Gruppenspiele/db/teamingroups.php").done(receivedTeamingroups);

}

function receivedTeamingroups(data)
{
  alert(data);
}

window.onload=init;
