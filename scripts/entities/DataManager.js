class DataManager {
  static data = null;
  //fetch data from database if not already done
  static async loadJson(file) {
    if (this.data === null) {
      try {
        this.data = await (await fetch(file)).json();
      } catch (err) {
        const errMessage = new ErrorManager(err);
        document.getElementById("main").innerHTML +=
          errMessage.getErrorMessageDOM();
      }
    }
  }
  static getPhotographers() {
    return this.data.photographers;
  }

  static getMedia() {
    return this.data.media;
  }

  static getPhotographer(id) {
    return this.data.photographers.find(
      (photographer) => photographer.id === id
    );
  }

  static getPhotographerMedia(id) {
    return this.data.media.filter((media) => media.photographerId === id);
  }

  //get all media from a particular photographer sorted by title, alphabetical
  static getPhotographerMediaByTitle(id) {
    return this.getPhotographerMedia(id).sort((a, b) =>
      b.title < a.title ? 1 : -1
    );
  }

  //get all media from a particular photographer sorted by number of likes, from highest to lowest
  static getPhotographerMediaByPopularity(id) {
    return this.getPhotographerMedia(id).sort((a, b) =>
      b.likes > a.likes ? 1 : -1
    );
  }

  //get all media from a particular photographer sorted by date, from more recent to the older ones
  static getPhotographerMediaByDate(id) {
    return this.getPhotographerMedia(id).sort((a, b) =>
      b.date > a.date ? 1 : -1
    );
  }
}
