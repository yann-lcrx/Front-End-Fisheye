class Photo {
  constructor(jsonPhoto, photographerName) {
    jsonPhoto && Object.assign(this, jsonPhoto);
    this.photographerName = photographerName;
  }

  //generate a thumbnail
  getPreviewDOM() {
    return `<article class="media-preview">
        <img tabindex="0"
          src="/assets/Sample Photos/${this.photographerName}/${this.image}"
          alt="${this.altText}"
          data-id="${this.id}"
        />
        <div>
          <p class="media-title">${this.title}</p>
          <div class="like-section" role="button" tabindex="0" aria-label="J'aime ce contenu">
            <p class="like-count">
            ${this.likes}
            </p>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </div>
      </article>`;
  }

  //generate a version suited for the slideshow and update its title
  getDOM() {
    document.getElementById("focused-media-title").innerText = this.title;
    return `<img 
              src="/assets/Sample Photos/${this.photographerName}/${this.image}" 
              alt="${this.altText}" />`;
  }

  focus() {
    document.querySelector("#focused-media img").focus();
  }
}
