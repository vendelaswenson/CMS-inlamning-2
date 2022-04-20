"use strict";

const logout = document.querySelector(".logout");

logout.addEventListener("click", () => {
  sessionStorage.clear();
});
