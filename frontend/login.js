"use strict";

const formLogin = document.querySelector("#login_form");
const loginBtn = document.querySelector(".loginBtn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#login_email_field").value;
  const userPassword = document.querySelector("#login_password_field").value;
  const hiddenObj = document.querySelectorAll(".hidden");
  const loginText = document.querySelectorAll(".hide");

  try {
    let loginUser = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: userEmail,
      password: userPassword,
    });

    let token = loginUser.data.jwt;
    sessionStorage.setItem("Token", token);
    window.location.href = "./index.html";
  } catch {
    alert("Det finns ingen användare med detta inlogg!");
  }

  hiddenObj.forEach((obj) => {
    obj.classList.remove("hidden");
  });

  loginText.forEach((e) => {
    e.classList.add("hidden");
  });
});
