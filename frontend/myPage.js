"use strict";

const myBooks = document.querySelector(".myBooks");

const fetch = async (url) => {
  let response = await axios.get(url);
  let books = response.data.data;
  return books;
};
const myProfileComponent = (username, email, id, createdAt) => `
        <div class="profileWrapper">
        <div class="info">
            <h2 class="ProfileUsername">Inloggad som: ${username}</h2>
            <h3 class="ProfileEmail">Emailadress: ${email}</h3>
            <h4 class="ProfileId">Id: ${id}</h4>
            <h5 class="ProfileReg">Kontot skapades: ${createdAt}</h5>
            </div>
        </div>
        <div class="myBooksWrapper">
        <h2>Mina böcker:</h2>
        <div class="myBooks"></div>
        </div>
`;

const personalBookComponent = (
  Title,
  Writer,
  Pages,
  Grade,
  Cover,
  name,
  genre
) => `
<div class="bookInfoWrapper">
        <img src="http://localhost:1337${Cover}" alt="${name}">
        <div class="bookInfo">
            <h2>${Title}</h2>
            <h3>Författare: ${Writer}</h3>
            <p>Genre: ${genre}</p>
            <h4>Betyg: ${Grade}/10</h4>
            <h5>${Pages} Sidor</h5>
        </div>
    </div>
`;
const personalAudioBookComponent = (
  Cover,
  Title,
  length,
  genre,
  Grade,
  releasedate
) => `
<div class="audioBookInfoWrapper">
        <img src="http://localhost:1337${Cover}" alt="${Title}">
        <div class="audioBookInfo">
            <h2>${Title}</h2>
            <h3>längd: ${length} timmar</h3>
            <p>Genre: ${genre}</p>
            <h4>Betyg: ${Grade}/10</h4>
            <h5>publicerades: ${releasedate}</h5>
        </div>
    </div>`;

let myProfile = async () => {
  await axios
    .get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    })
    .then((data) => {
      let { username, email, id, createdAt } = data.data;
      const profileDate = new Date(createdAt).toISOString().slice(0, 10);

      myBooks.innerHTML = myProfileComponent(username, email, id, profileDate);
      fetch("http://localhost:1337/api/books?populate=*").then((data) => {
        data.forEach((book) => {
          let { attributes: bookAttributes, id: BookDelId } = book;
          let {
            Title,
            Writer,
            genre,
            Cover,
            Pages,
            Grade,
            userId: bookUserId,
          } = bookAttributes;

          let { Genre } = genre.data.attributes;
          let { data: imgData } = Cover;
          let { attributes: imgAttributes } = imgData;
          let { url: name } = imgAttributes;

          if (id == bookUserId) {
            myBooks.innerHTML += personalBookComponent(
              Title,
              Writer,
              Pages,
              Grade,
              Cover,
              name,
              Genre,
              BookDelId
            );
          }
        });
      });
      fetch("http://localhost:1337/api/audio-books?populate=*").then(
        (audioBooks) => {
          audioBooks.forEach((audio) => {
            let { attributes, id: audioId } = audio;
            let {
              Title,
              releasedate,
              length,
              Grade,
              userId: audioBookUserId,
              Cover,
              genre,
            } = attributes;

            if (id === audioBookUserId) {
              myBooks.innerHTML += personalAudioBookComponent(
                Cover,
                Title,
                length,
                genre,
                Grade,
                releasedate,
                audioId
              );
            }
          });
        }
      );
    });
};

myProfile();
