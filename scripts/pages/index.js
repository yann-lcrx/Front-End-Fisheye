async function displayData() {
  //display preview article for each photographer in database
  for (let jsonPhotographer of DataManager.getPhotographers()) {
    const photographer = new Photographer(jsonPhotographer);
    document.getElementsByClassName("photographer_section")[0].innerHTML +=
      photographer.getPreviewDOM();
  }
}

async function init() {
  await DataManager.loadJson("../../data/photographers.json");
  displayData();
}

init();
