"use strict";

const bookBtn = document.querySelector(".bookBtn");
const audioBookBtn = document.querySelector(".audioBookBtn");
const allBooks = document.querySelector(".allBooks");
const printBooks = document.querySelector(".books");
const printAudioBooks = document.querySelector(".audiobooks");

bookBtn.addEventListener("click", () => {
  printBooks.innerHTML = "";
  printAudioBooks.innerHTML = "";
  getBook().then((data) => {
    const books = data.data;

    books.forEach((book) => {
      let { Title, Writer, Pages, Grade, Cover, user, genre } = book.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      let { Genre } = genre.data.attributes;
      console.log(genre);
      printBooks.innerHTML += `Titel: ${Title} Författare: ${Writer} Antal sidor: ${Pages} Betyg: ${Grade} Användare: ${username} ${email} Genre: ${Genre} <img src="http://localhost:1337${url}">`;
    });
  });
});

audioBookBtn.addEventListener("click", () => {
  printBooks.innerHTML = "";
  printAudioBooks.innerHTML = "";
  getAudioBooks().then((data) => {
    const audioBooks = data.data;
    console.log(audioBooks);

    audioBooks.forEach((audioBook) => {
      let { Title, Writer, length, Grade, Cover, releasedate, user } =
        audioBook.attributes;
      let { url } = Cover.data.attributes;
      console.log(user);

      let { username, email } = user.data.attributes;
      printAudioBooks.innerHTML += `Titel: ${Title} Författare: ${Writer} Längd: ${length} Betyg: ${Grade} Publicerad: ${releasedate} Användare: ${username} ${email} <img src="http://localhost:1337${url}">`;
    });
  });
});

allBooks.addEventListener("click", () => {
  printBooks.innerHTML = "";
  printAudioBooks.innerHTML = "";
  getBook().then((data) => {
    const books = data.data;
    books.forEach((book) => {
      let { Title, Writer, Pages, Grade, Cover, user } = book.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      printBooks.innerHTML += `Titel: ${Title} Författare: ${Writer} Antal sidor: ${Pages} Betyg: ${Grade} Användare: ${username} ${email} <img src="http://localhost:1337${url}">`;
    });
  });
  getAudioBooks().then((data2) => {
    const audioBooks = data2.data;
    audioBooks.forEach((audioBook) => {
      let { Title, Writer, length, Grade, Cover, releasedate, user } =
        audioBook.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      printAudioBooks.innerHTML += `Titel: ${Title} Författare: ${Writer} Längd: ${length} Betyg: ${Grade} Publicerad: ${releasedate} Användare: ${username} ${email} <img src="http://localhost:1337${url}">`;
    });
  });
});

const getBook = async () => {
  const response = await fetch(`http://localhost:1337/api/books?populate=*`);
  const data = await response.json();
  return data;
};

const getAudioBooks = async () => {
  const response = await fetch(
    `http://localhost:1337/api/audiobooks?populate=*`
  );
  const data = await response.json();
  return data;
};
