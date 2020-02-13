
const addArtistButton = document.getElementById("addArtistBtn");
const addBtn = document.getElementById("addButton");
const artistForm = document.getElementById("artistForm");
const artistList = document.querySelector(".unorderlist");
const search = document.getElementById("search")
const searchBtn = document.getElementById("searchBtn")
const ArtistKey = "Artist";
let artists;

Storage.prototype.setObj = function (key, obj) {
     return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
     return JSON.parse(this.getItem(key));
};

addBtn.addEventListener("click", () => {
     artistName = document.getElementById("artistName").value;
     aboutArtist = document.getElementById("aboutArtist").value;
     artistImg = document.getElementById("artistImg").value;

     if (artistName === "" || aboutArtist === "" || artistImg === "") {
          return;
     }

     const artist = {
          name: artistName,
          aboutArtist: aboutArtist,
          artistImg: artistImg
     };

     addArtistCard(artist);
     addArtist(artist);

     toggleForm(artistForm);
});

addArtistButton.addEventListener("click", () => {
     toggleForm(artistForm);
});

document.addEventListener("DOMContentLoaded", () => {
     artists = localStorage.getObj(ArtistKey);
     if (!artists) {
          artists = [];
          return;
     }

     for (let art of artists) {
          addArtistCard(art);
     }
});

function addArtistCard(artist) {
     const artCard = createArtistCard(artist.name, artist.about, artist.imgUrl);
     artistList.appendChild(artCard);
}

function addArtist(artist) {
     artists.push(artist);
     localStorage.setObj(ArtistKey, artists);
}

function deleteArtist(i) {
     artists.splice(i, 1);
     localStorage.setObj(ArtistKey, artists);
}

function findIndex(el) {
     let i = 0;
     while ((el = el.previousElementSibling) != null) {
          i++;
     }
     return i;
}

function clearForm(form) {
     const inputForm = form.getElementsByTagName("input");
     for (let i = 0; i < inputForm.length; i++) {
          inputForm[i].value = '';
     }
};

function toggleForm(form) {
     clearForm(form);
     artistForm.classList.toggle("hider");
}

function createArtistCard(artistName, aboutArtist, artistImg) {
     const h2 = document.createElement("h2");
     const p = document.createElement("p");
     const li = document.createElement("li");
     const img = document.createElement("img");
     const div = document.createElement("div");
     const button = document.createElement("button");
     button.style.backgroundColor = "red";
     button.addEventListener('click', () => {
          deleteArtist(findIndex(li));
          li.remove();
     });
     li.classList.add("list");
     img.classList.add("image");
     div.classList.add("divider");
     h2.classList.add("name");
     p.classList.add("text");
     button.classList.add("deleteButton");
     img.setAttribute("src", artistImg);
     h2.textContent = artistName;
     p.textContent = aboutArtist;
     button.textContent = "Delete";

     li.appendChild(img);
     li.appendChild(div);
     li.appendChild(button);
     div.appendChild(h2);
     div.appendChild(p);

     return li;
}

searchBtn.addEventListener("click", (event) => {
     const searchValue = search.value;
     const pattern = new RegExp(searchValue, "i");

     for (let i = 0; i < artists.length; i++) {
          if (!pattern.test(artists[i].name)) {
               artistList.children[i].classList.add("hider");
          } else {
               artistList.children[i].classList.remove("hider");
          }
     }
});

