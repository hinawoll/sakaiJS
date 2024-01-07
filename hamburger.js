"use strict";
{
  const hamBtn = document.querySelector(".hamburger");
  const navi = document.querySelector("#navi");
  const naviMenu = document.querySelectorAll("#header #navi-menu a");


  hamBtn.addEventListener("click", () => {
    hamBtn.classList.toggle("active");
    navi.classList.toggle("active");
  });

  naviMenu.forEach((menu) => {
    menu.addEventListener("click", () => {
      hamBtn.classList.remove("active");
      navi.classList.remove("active");
    });
  });


}