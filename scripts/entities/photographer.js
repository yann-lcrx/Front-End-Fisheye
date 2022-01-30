class Photographer {
  constructor(jsonPhotographer) {
    jsonPhotographer && Object.assign(this, jsonPhotographer);
  }

  getFormattedPrice() {
    return this.price + "€ / jour";
  }

  getPortraitUrl() {
    return `assets/Sample Photos/Photographers ID Photos/${this.portrait}`;
  }

  getPageName() {
    return `Fisheye - ${this.name}`;
  }

  getPhotographerDetailsDOM() {
    return `
      <h1>${this.name}</h1>
      <p class="location">${this.city}, ${this.country}</p>
      <p class="tagline">${this.tagline}</p>
    `;
  }

  getPreviewDOM() {
    return `<article class="preview-card"><a href="photographer.html?id=${this.id}"><div class="img-wrapper"><img alt="${this.name}" src="assets/Sample Photos/Photographers ID Photos/${this.portrait}" alt="bonhomme"></div><h2>${this.name}</h2><p class="location">${this.city}, ${this.country}</p><p class="tagline">${this.tagline}</p><p class="price">${this.price}€/jour</p></a></article>`;
  }

  displayPage() {
    document.getElementById("description").innerHTML +=
      this.getPhotographerDetailsDOM();
    document
      .getElementById("profile-pic")
      .setAttribute("src", this.getPortraitUrl());
    document.getElementById("profile-pic").setAttribute("alt", this.name);
    document.getElementById("price-count").innerText = this.getFormattedPrice();
    document.getElementsByTagName("title")[0].innerText = this.getPageName();
    document.getElementById("photographer-name").innerText = this.name;
  }
}
