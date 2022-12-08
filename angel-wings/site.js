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
var binds = JSON.parse(data);

document.getElementById("site-confirmed-binds-header").innerHTML = binds.Binds.length + " binds"
document.getElementById("site-last-updated").innerHTML =  "Last updated " + binds.LastUpdated

const bindCard = document.getElementById("site-bind-card");

binds.Binds.forEach(function(b){
  clone = bindCard.cloneNode(true);

  clone.querySelector('#site-bind-card-habbo-name').innerHTML = b.HabboName;
  clone.querySelector('#site-bind-card-avatar-image').src = get_avatarimage(b.OutfitFigureString)
  clone.classList.remove("d-none");

  //clone.querySelector("#site-bind-card-habbo-name").setAttribute("href", "https://www.habbowidgets.com/habinfo/" + b.HabboID);
  profileLink = clone.querySelector("#site-bind-card-card")
  profileLink.setAttribute("data-habboname", b.HabboName)
  profileLink.setAttribute("data-uuid", b.HabboID)
  profileLink.setAttribute("data-figurestring", b.OutfitFigureString)
  profileLink.setAttribute("data-level", b.HabboCurrentLevel)
  profileLink.setAttribute("data-friends", b.HabboFriendsCount)
  profileLink.setAttribute("data-scanned", b.HabboLastScanned)

  if(b.BindUnitNumber > 0){
    clone.querySelector("#site-bind-card-unit-number").innerHTML = b.BindUnitNumber;
    clone.querySelector(".site-bind-card-unit-number").classList.remove("d-none");
  }

  if(b.Unconfirmed){
    clone.querySelector('#site-bind-card-community-confirmed').classList.remove("d-none");
  }

  document.getElementById("site-bind-row").appendChild(clone);
})


const profileModal = document.getElementById('site-profile-modal')
profileModal.addEventListener('show.bs.modal', event => {
  // do something...
  profileModal.querySelector("#site-profile-modal-title-habbo-name").innerHTML = event.relatedTarget.getAttribute("data-habboname")
  profileModal.querySelector("#site-profile-modal-uuid").innerHTML = event.relatedTarget.getAttribute("data-uuid")
  profileModal.querySelector("#site-profile-modal-level").innerHTML = event.relatedTarget.getAttribute("data-level")
  profileModal.querySelector("#site-profile-modal-friends").innerHTML = event.relatedTarget.getAttribute("data-friends")
  profileModal.querySelector("#site-profile-modal-last-scan").innerHTML = get_date(event.relatedTarget.getAttribute("data-scanned"))
  profileModal.querySelector("#site-profile-modal-avatarimage").setAttribute("src", get_avatarimage(event.relatedTarget.getAttribute("data-habboname"),true))
  profileModal.querySelector("#site-profile-modal-hw-link").href += "habinfo/" + event.relatedTarget.getAttribute("data-uuid")
})
