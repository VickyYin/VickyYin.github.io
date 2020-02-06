const addArtistButton = document.getElementById("addArtistBtn");
const addBtn = document.getElementById("addButton");
const artistForm = document.getElementById("artistForm");
const artistList = document.querySelector(".unorderlist");
addBtn.addEventListener("click",()=>{
     artistName = document.getElementById("artistName").value;
     aboutArtist = document.getElementById("aboutArtist").value;
     artistImg = document.getElementById("artistImg").value;
     if(artistName ==="" || aboutArtist ==="" || artistImg ===""){
          return;
     }
     artistCard = createartistCard(artistName, aboutArtist, artistImg);
     artistList.appendChild(artistCard);
     toggleForm(artistForm);
});
addArtistButton.addEventListener("click",() =>{
     toggleForm(artistForm);
});
function clearForm(form){
     const inputForm = form.getElementsByTagName("input");
     for(let i = 0; i < inputForm.length;i++){
          inputForm[i].value = '';
     }
};
   
function toggleForm(form) {
     clearForm(form);
     artistForm.classList.toggle("hide");
   }
function createartistCard(artistName, aboutArtist, artistImg) {
     const h2 = document.createElement("h2");
     const p = document.createElement("p");
     const li = document.createElement("li");
     const img = document.createElement("img");
     const div = document.createElement("div");
     const button = document.createElement("button");
     button.style.backgroundColor = "red";
     button.style.height = "30px";
     button.addEventListener('click', () => {
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
   