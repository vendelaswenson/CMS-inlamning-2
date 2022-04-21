"use strict";

//homepage
const bookBtn = document.querySelector(".bookBtn");
const audioBookBtn = document.querySelector(".audioBookBtn");
const allBooks = document.querySelector(".allBooks");
const printBooks = document.querySelector(".books");
const printAudioBooks = document.querySelector(".audiobooks");
const printAllBooks = document.querySelector(".showAllBooks");
const hiddenObj = document.querySelectorAll(".hidden");
const loginText = document.querySelectorAll(".hide");

const displayLinks = () => {
  let loggedIn = sessionStorage.getItem("Token");
  if (loggedIn) {
    hiddenObj.forEach((obj) => {
      obj.classList.remove("hidden");
    });

    loginText.forEach((e) => {
      e.classList.add("hidden");
    });
  } else {
    hiddenObj.forEach((obj) => {
      obj.classList.add("hidden");
    });

    loginText.forEach((e) => {
      e.classList.remove("hidden");
    });
  }
};

displayLinks();

bookBtn.addEventListener("click", () => {
  printBooks.style.display = "flex";
  printBooks.innerHTML = "";
  printAudioBooks.innerHTML = "";
  printAllBooks.innerHTML = "";
  getBook().then((data) => {
    const books = data.data;

    books.forEach((book) => {
      let { Title, Writer, Pages, Grade, Cover, user, genre } = book.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      printBooks.innerHTML += `<div class="bookCardWrapper"> <img src="http://localhost:1337${url}"> <br> <div class ="bookInfoWrap"> Titel: ${Title} <br> Författare: ${Writer} <br> Antal sidor: ${Pages} <br> Betyg: ${Grade} <br> Användare: ${username} ${email} <br> Genre: ${genre} </div> </div>`;
    });
  });
});

audioBookBtn.addEventListener("click", () => {
  printAudioBooks.style.display = "flex";
  printBooks.style.display = "none";
  printAudioBooks.innerHTML = "";
  printAllBooks.innerHTML = "";
  getAudioBooks().then((data) => {
    const audioBooks = data.data;

    audioBooks.forEach((audioBook) => {
      let { Title, Writer, length, Grade, Cover, releasedate, user } =
        audioBook.attributes;
      let { url } = Cover.data.attributes;

      let { username, email } = user.data.attributes;
      printAudioBooks.innerHTML += `<div class="audioBookCardWrapper"> <img src="http://localhost:1337${url}"> <br> <div class ="bookInfoWrap"> Titel: ${Title} <br> Författare: ${Writer} <br> Längd: ${length} <br> Betyg: ${Grade} <br> Publicerad: ${releasedate} <br> Användare: ${username} ${email} </div> </div>`;
    });
  });
});

allBooks.addEventListener("click", () => {
  printAllBooks.style.display = "flex";
  printBooks.style.display = "none";
  printAudioBooks.style.display = "none";
  printAllBooks.innerHTML = "";
  getBook().then((data) => {
    const books = data.data;
    books.forEach((book) => {
      let { Title, Writer, Pages, Grade, Cover, user } = book.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      printAllBooks.innerHTML += `<div class="allBooksWrapper"> <img src="http://localhost:1337${url}"> <br> <div class ="bookInfoWrap"> Titel: ${Title} <br> Författare: ${Writer} <br> Antal sidor: ${Pages} <br> Betyg: ${Grade} <br> Användare: ${username} ${email} </div>  </div>`;
    });
  });
  getAudioBooks().then((data2) => {
    const audioBooks = data2.data;
    audioBooks.forEach((audioBook) => {
      let { Title, Writer, length, Grade, Cover, releasedate, user } =
        audioBook.attributes;
      let { url } = Cover.data.attributes;
      let { username, email } = user.data.attributes;
      printAllBooks.innerHTML += `<div class="allBooksWrapper"> <img src="http://localhost:1337${url}"> <br> <div class ="bookInfoWrap"> Titel: ${Title} Författare: ${Writer} Längd: ${length} Betyg: ${Grade} Publicerad: ${releasedate} Användare: ${username} ${email} </div> </div>`;
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
