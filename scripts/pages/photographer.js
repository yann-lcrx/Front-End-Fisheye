const currentUrl = new URL(window.location.href);
const photographerId = parseInt(currentUrl.searchParams.get("id"));
const totalLikeCount = document.getElementById("total-like-count");
const mediaPreviews = document.getElementsByClassName("media-previews")[0];

function displayPhotographer(photographer) {
  document.getElementById("description").innerHTML +=
    photographer.getPhotographerDetailsDOM();
  document
    .getElementById("profile-pic")
    .setAttribute("src", photographer.getPortraitUrl());
  document
    .getElementById("profile-pic")
    .setAttribute("alt", photographer.altText);
  document.getElementById("price-count").innerText =
    photographer.getFormattedPrice();
  document.getElementsByTagName("title")[0].innerText =
    photographer.getPageName();
}

function displayArtistMedia(jsonData, photographerName) {
  mediaPreviews.innerHTML = null;
  for (let jsonMedia of jsonData) {
    const media = new MediaFactory(jsonMedia, photographerName);
    mediaPreviews.innerHTML += media.getDOM();
  }
}

function setupLikeButtons() {
  for (let likeButton of document.getElementsByClassName("like-section")) {
    likeButton.addEventListener("click", () => {
      if (!likeButton.classList.contains("liked")) {
        likeButton.children[0].innerText =
          parseInt(likeButton.children[0].innerText) + 1;
        likeButton.classList.add("liked");
        likeButton.setAttribute("aria-label", "Je n'aime plus ce contenu");
        totalLikeCount.innerText = parseInt(totalLikeCount.innerText) + 1;
      } else {
        likeButton.children[0].innerText =
          parseInt(likeButton.children[0].innerText) - 1;
        likeButton.classList.remove("liked");
        likeButton.setAttribute("aria-label", "J'aime ce contenu");
        totalLikeCount.innerText = parseInt(totalLikeCount.innerText) - 1;
      }
    });
  }
}

function setupSort(photographerName) {
  const options = document.getElementsByTagName("option");
  options[0].addEventListener("click", () => {
    displayArtistMedia(
      DataManager.getPhotographerMediaByPopularity(photographerId),
      photographerName
    );
  });
  options[1].addEventListener("click", () => {
    displayArtistMedia(
      DataManager.getPhotographerMediaByDate(photographerId),
      photographerName
    );
  });
  options[2].addEventListener("click", () => {
    displayArtistMedia(
      DataManager.getPhotographerMediaByTitle(photographerId),
      photographerName
    );
  });
}

function calculateLikeTotal() {
  let newLikeCount = 0;
  for (let likeCount of document.getElementsByClassName("like-count")) {
    newLikeCount += parseInt(likeCount.innerText);
  }
  totalLikeCount.innerText = newLikeCount;
}

async function init() {
  await DataManager.loadJson("../../data/photographers.json");
  const photographer = new Photographer(
    DataManager.getPhotographer(photographerId)
  );
  displayPhotographer(photographer);
  displayArtistMedia(
    DataManager.getPhotographerMediaByPopularity(photographerId),
    photographer.name
  );
  setupSort(photographer.name);
  setupLikeButtons();
  calculateLikeTotal();
}

init();
