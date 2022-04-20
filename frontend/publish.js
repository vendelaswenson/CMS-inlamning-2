"use strict";

const newBookBtn = document.querySelector(".newBook");
const newAudioBookBtn = document.querySelector(".newAudioBook");
const addBook = document.querySelector(".addBookWrapper");
const addAudioBook = document.querySelector(".addAudioBookWrapper");
const addBookBtn = document.querySelector(".addBookBtn");
const addAudioBookBtn = document.querySelector(".addAudioBookBtn");

newBookBtn.addEventListener("click", () => {
  addBook.classList.remove("hidden");
  newBookBtn.classList.add("hidden");
  newAudioBookBtn.classList.add("hidden");
});

newAudioBookBtn.addEventListener("click", () => {
  addAudioBook.classList.remove("hidden");
  newBookBtn.classList.add("hidden");
  newAudioBookBtn.classList.add("hidden");
});

addBookBtn.addEventListener("click", async () => {
  let Title = document.querySelector("#_title").value;
  let author = document.querySelector("#_author").value;
  let pages = document.querySelector("#_pages").value;
  let rating = document.querySelector("#_rating").value;
  let genre = document.querySelector("#_genre").value;
  let image = document.querySelector("#_image").files;
  let userId;
  let imgData = new FormData();
  imgData.append("files", image[0]);
  let dataId = await axios
    .get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    })
    .then((data) => {
      return (userId = data.data.id);
    });

  await axios
    .post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    })
    .then((response) => {
      let imgId = response.data[0].id;
      axios.post(
        "http://localhost:1337/api/books",
        {
          data: {
            Title,
            Writer: author,
            Pages: pages,
            Grade: rating,
            Cover: imgId,
            userId: dataId,
            user: [dataId],
            genre,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        }
      );
    });
});

addAudioBookBtn.addEventListener("click", async () => {
  let Title = document.querySelector("#_TITLE").value;
  let author = document.querySelector("#_AUTHOR").value;
  let length = document.querySelector("#_LENGTH").value;
  let rating = document.querySelector("#_RATING").value;
  let genres = document.querySelector("#_GENRE").value;
  let releasedate = document.querySelector("_RELEASEDATE");
  let image = document.querySelector("#_IMAGE").files;
  let imgData = new FormData();
  imgData.append("files", image[0]);

  await axios
    .post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    })
    .then((response) => {
      let imgId = response.data[0].id;
      axios.post(
        "http://localhost:1337/api/audiobooks",
        {
          data: {
            Title,
            Writer: author,
            length,
            Grade: rating,
            releasedate,
            Cover: imgId,
            userId: dataId,
            user: [dataId],
            genres,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        }
      );
    });
});
