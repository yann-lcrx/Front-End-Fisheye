class Photo {
  constructor(jsonPhoto, photographerName) {
    jsonPhoto && Object.assign(this, jsonPhoto);
    this.photographerName = photographerName;
  }

  getPreviewDOM() {
    return `<article class="media-preview">
        <img tabindex="0"
          src="/assets/Sample Photos/${this.photographerName}/${this.image}"
          alt="${this.altText}"
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
}
