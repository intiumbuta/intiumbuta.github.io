function get_avatarimage(figureString, asName = false){
  if(asName){
    return "https://www.habbo.com/habbo-imaging/avatarimage?user=" + figureString + "&direction=2&head_direction=2&action=gesture=nrm&size=b"
  }
  return "https://imager.habboon.pw/?figure=" + figureString + "&direction=2&head_direction=2&action=gesture=nrm&size=b"
}

function get_date(timestamp){
  newDate = new Date()
  newDate.setTime(timestamp * 1000)
  return newDate.toUTCString();
}
var scammers = JSON.parse(data);

document.getElementById("site-confirmed-scammers-header").innerHTML = scammers.length + " scammers"
const scammerCard = document.getElementById("site-scammer-card");

scammers.forEach(function(b){
  clone = scammerCard.cloneNode(true);

  clone.querySelector('#site-scammer-card-habbo-name').innerHTML = b.HabboName;
  clone.querySelector('#site-scammer-card-uuid').innerHTML = b.HabboID;
  clone.querySelector('#site-scammer-card-reason').innerHTML = b.ReasonAdded;
  clone.querySelector('#site-scammer-card-last-scanned').innerHTML = get_date(b.LastScanned);

  if(b.Banned == 0){
    clone.querySelector('#site-scammer-card-avatar-image').src = get_avatarimage(b.HabboName, true)
  } else {
    clone.querySelector("#site-scammer-card-banned").classList.remove("d-none");
  }

  if(b.PreviousNames.length > 0){
    previousNamesEl = clone.querySelector('#site-scammer-card-previous-names');
    previousNamesEl.innerHTML = "";
    b.PreviousNames.forEach(function(name){
      previousNamesEl.innerHTML += "<span class='badge bg-site me-1'>" + name + "</span>";
    })
  }

  clone.classList.remove("d-none");
  document.getElementById("site-scammers-row").appendChild(clone);
})
