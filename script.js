const addbutton = document.querySelector("#addnote");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
};

const updateLSDataTitle = () => {
  const title = document.querySelectorAll("input");
  const titles = [];
  console.log(title);
  title.forEach((note) => {
    return titles.push(note.value);
  });
  console.log(titles);
  localStorage.setItem("titles", JSON.stringify(titles));
};

const addnewnotes = (title= "",text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `    
                        <div class="section1">
                            
                          <div class="titlediv ${title ? "" : "hidden"}"></div>

                                <input type="text" class="titlename ${
                                  title ? "hidden" : ""
                                }" placeholder="Title" spellcheck="false">
                            
                            <div class="operation">
                                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="delete"><i class="fa-solid fa-trash"></i></button>
                            </div>

                        </div>

                        <div class="text ${text ? "" : "hidden"}"></div>

                        <textarea class="textarea ${
                          text ? "hidden" : ""
                        }" spellcheck="false" placeholder="Write a note..."></textarea>`;

  note.insertAdjacentHTML("beforeend", htmlData);

  // getting the references
  const editbutton = note.querySelector(".edit");
  const delbutton = note.querySelector(".delete");
  const maindiv = note.querySelector(".text");
  const textarea = note.querySelector(".textarea");
  const titlediv = note.querySelector(".titlediv");
  const titlename = note.querySelector(".titlename");

  // deleting the node
  delbutton.addEventListener("click", () => {
    note.remove();
    updateLSData();
    updateLSDataTitle();
  });

  //toggle using edit button
  textarea.innerHTML = text;
  maindiv.innerHTML = text;
  titlediv.innerHTML=title;
  titlename.value=title;

  editbutton.addEventListener("click", () => {
    note.style.height = "fit-content";
    maindiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    titlediv.classList.toggle("hidden");
    titlename.classList.toggle("hidden");
  });

  textarea.addEventListener("keyup", () => {
    textarea.style.height = "2px";
    textarea.style.height = 2 + textarea.scrollHeight + "px";
  });

  textarea.addEventListener("change", (event) => {
    const valueoftextarea = event.target.value;
    maindiv.innerHTML = valueoftextarea;
    updateLSData();
  });

  titlename.addEventListener("change", (event) => {
    const valueoftitle = event.target.value;
    titlediv.innerHTML = valueoftitle;
    updateLSDataTitle();
  });

  // document.body.appendChild(note);
  document.body.prepend(note);
};


//getting data of text area back from storage
const notes = JSON.parse(localStorage.getItem("notes"));

//getting data of title back from storage
const titles= JSON.parse(localStorage.getItem("titles"));


let size=(notes && notes.length);
for(var i=(size)-1;i>=0;i--){

  if(notes && titles){
    addnewnotes(titles[i],notes[i]);
  }
};


addbutton.addEventListener("click", () => addnewnotes());