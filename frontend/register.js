"use strict";

let registerBtn = document.querySelector(".registerBtn");

const setUsers = async () => {
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const hiddenObj = document.querySelectorAll(".hidden");
  const loginText = document.querySelectorAll(".hide");

  try {
    const response = await axios.post(
      `http://localhost:1337/api/auth/local/register`,
      {
        username,
        email,
        password,
      }
    );
    let token = response.data.jwt;
    sessionStorage.setItem("token", token);

    hiddenObj.forEach((obj) => {
      obj.classList.remove("hidden");
    });

    loginText.forEach((e) => {
      e.classList.add("hidden");
    });
    window.location.href = "./index.html";
  } catch {
    alert(
      "Det finns redan en användare med detta användarnamn eller mailadress!"
    );
  }
};

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setUsers();
});
