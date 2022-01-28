const currentUrl = new URL(window.location.href);
const photographerId = parseInt(currentUrl.searchParams.get("id"));
const totalLikeCount = document.getElementById("total-like-count");
const previewSection = document.getElementById("preview-section");

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
  document.getElementById("photographer-name").innerText = photographer.name;
}

function displayArtistMedia(jsonData, photographerName) {
  previewSection.innerHTML = null;
  for (let jsonMedia of jsonData) {
    const media = new MediaFactory(jsonMedia, photographerName);
    previewSection.innerHTML += media.getPreviewDOM();
  }
}

function likeMedia(likeButton) {
  likeButton.children[0].innerText =
    parseInt(likeButton.children[0].innerText) + 1;
  likeButton.classList.add("liked");
  likeButton.setAttribute("aria-label", "Je n'aime plus ce contenu");
  totalLikeCount.innerText = parseInt(totalLikeCount.innerText) + 1;
}

function unlikeMedia(likeButton) {
  likeButton.children[0].innerText =
    parseInt(likeButton.children[0].innerText) - 1;
  likeButton.classList.remove("liked");
  likeButton.setAttribute("aria-label", "J'aime ce contenu");
  totalLikeCount.innerText = parseInt(totalLikeCount.innerText) - 1;
}

function setupLikeButtons() {
  for (let likeButton of document.getElementsByClassName("like-section")) {
    likeButton.addEventListener("click", () => {
      if (!likeButton.classList.contains("liked")) {
        likeMedia(likeButton);
      } else {
        unlikeMedia(likeButton);
      }
    });
    likeButton.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        if (!likeButton.classList.contains("liked")) {
          likeMedia(likeButton);
        } else {
          unlikeMedia(likeButton);
        }
      }
    });
  }
}

function setupSort(photographerName) {
  document
    .getElementById("sort-options")
    .addEventListener("change", (event) => {
      if (event.target.value === "popularity") {
        displayArtistMedia(
          DataManager.getPhotographerMediaByPopularity(photographerId),
          photographerName
        );
      }
      if (event.target.value === "date") {
        displayArtistMedia(
          DataManager.getPhotographerMediaByDate(photographerId),
          photographerName
        );
      }
      if (event.target.value === "title") {
        displayArtistMedia(
          DataManager.getPhotographerMediaByTitle(photographerId),
          photographerName
        );
      }
      setupSlideshow(photographerName);
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
  setupSlideshow(photographer.name);
}

init();

const lightbox = document.getElementById("lightbox");

function setupSlideshow(photographerName) {
  const slideshow = new Slideshow(
    DataManager.getPhotographerMedia(photographerId),
    photographerName
  );
  slideshow.setupControls();
  for (let thumbnail of document.querySelectorAll(
    "article img, article video"
  )) {
    thumbnail.addEventListener("click", (event) => {
      slideshow.show(event.currentTarget.dataset.id);
    });
    thumbnail.addEventListener("keyup", (event) => {
      if (event.key === "Enter" && !slideshow.isVisible)
        slideshow.show(event.currentTarget.dataset.id);
    });
  }
}
