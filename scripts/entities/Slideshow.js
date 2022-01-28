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
    this.display();
  }

  display() {
    if (this.mediaList[this.current].image) {
      this.focusedMedia = document.createElement("img");
      this.focusedMedia.setAttribute(
        "src",
        `/assets/Sample Photos/${this.photographerName}/${
          this.mediaList[this.current].image
        }`
      );
      this.focusedMedia.setAttribute(
        "alt",
        this.mediaList[this.current].altText
      );
    } else if (this.mediaList[this.current].video) {
      this.focusedMedia = document.createElement("video");
      this.focusedMedia.setAttribute(
        "src",
        `/assets/Sample Photos/${this.photographerName}/${
          this.mediaList[this.current].video
        }`
      );
      this.focusedMedia.setAttribute("controls", `true`);
    } else
      throw (err) => {
        const errMessage = new ErrorManager(err);
        document.getElementById("focused-media").innerHTML +=
          errMessage.getErrorMessageDOM();
      };

    document.getElementById("focused-media").appendChild(this.focusedMedia);
    document.getElementById("focused-media-title").innerText =
      this.mediaList[this.current].title;
    this.focusedMedia.focus();
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
    document.getElementById("focused-media").innerHTML = "";
    document.getElementById("lightbox").style.display = "none";
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
}
