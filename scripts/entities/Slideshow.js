class Slideshow {
  constructor(mediaList, photographerName) {
    this.mediaList = mediaList;
    this.photographerName = photographerName;
    this.current = 0;
    this.focusedMedia = null;
    this.isVisible = false;
  }

  show(id) {
    document.getElementById("lightbox").style.display = "flex";
    this.isVisible = true;
    this.current = this.getMediaById(id);
    document.getElementById("lightbox").setAttribute("aria-hidden", "false");
    document
      .getElementById("photographer-page")
      .setAttribute("aria-hidden", "true");
    this.display();
  }

  display() {
    const media = new MediaFactory(
      this.mediaList[this.current],
      this.photographerName
    );

    document.getElementById("focused-media").innerHTML = media.getDOM();
    media.focus();
  }

  next() {
    if (this.current < this.mediaList.length - 1) {
      this.current++;
    } else {
      this.current = 0;
    }
    document.getElementById("focused-media").innerHTML = "";
    this.display();
  }

  prev() {
    if (this.current > 0) {
      this.current--;
    } else {
      this.current = this.mediaList.length - 1;
    }
    document.getElementById("focused-media").innerHTML = "";
    this.display();
  }

  close() {
    this.current = null;
    document.getElementById("lightbox").setAttribute("aria-hidden", "true");
    document
      .getElementById("photographer-page")
      .setAttribute("aria-hidden", "false");
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("focused-media").innerHTML = "";
    this.isVisible = false;
  }

  getMediaById(id) {
    const idList = this.mediaList.map((media) => {
      {
        return media.id.toString();
      }
    });
    return idList.indexOf(id.toString());
  }

  setupControls() {
    document
      .getElementsByClassName("close")[0]
      .addEventListener("click", () => {
        this.close();
      });
    document.getElementById("chevron-right").addEventListener("click", () => {
      this.next();
    });
    document.getElementById("chevron-left").addEventListener("click", () => {
      this.prev();
    });
    window.addEventListener("keyup", (event) => {
      if (this.isVisible) {
        if (event.key === "ArrowLeft") this.prev();
        if (event.key === "ArrowRight") this.next();
        if (event.key === "Escape") this.close();
      }
    });
  }

  changeMediaList(mediaList) {
    this.mediaList = mediaList;
  }
}
