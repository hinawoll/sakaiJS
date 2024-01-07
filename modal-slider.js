"use strict";
{
  const mask = document.querySelector("#mask");
  const openImages = document.querySelectorAll("#open");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  // const btnList = document.querySelector("#btn-list");
  // const container = document.querySelector(".container");
  const modalList = document.querySelector("#modal-list");
  const slides = modalList.children;
  const dots = [];
  let currentIndex = 0;
  const modal = document.querySelector("#modal");

  // const modalFirstItem = document.querySelectorAll('#modal-list li')[0];
  // const copyFirstItem = modalFirstItem.cloneNode(true);
  // const setLastItem = document.querySelector('li')[slides.length];//=[6]＝1枚目の画像
  // modalList.insertBefore(copyFirstItem, setLastItem);//=[6]に[0]のコピーを入れる

  // const modalLastItem = document.querySelectorAll('#modal-list li')[slides.length - 2];//6枚目の画像
  // const copyLastItem = modalLastItem.cloneNode(true);//6枚目のコピー
  // const setFirstItem = document.querySelector('#modal-list li')[0];
  // modalList.insertBefore(copyLastItem, setFirstItem);

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width; //ulのwidthを計算
    modalList.style.transform = `translateX(${ -1 * slideWidth * currentIndex }px)`; //現スライド番号×幅
  }

  function setupDots() {
    //スライドの数に合わせてdotを作り、dotがクリックされたらそのdotの色を変えて、そのdotに対応するスライドを表示する
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        currentIndex = i; //i＝ボタンが作られる回数=prevまたはnextボタンをクリックした回数
        updateDots();
        moveSlides();
        modalList.style.transition = "transform 0.3s";
      });
      dots.push(button);
      document.querySelector("#btn-list").appendChild(button);
    }

    dots[0].classList.add("current");
  }

  function updateDots() {
    //表示中の画像のdotをグレーにする
    dots.forEach((dot) => {
      dot.classList.remove("current");
    });
    dots[currentIndex].classList.add("current"); //current番目のdotの色を変える
  }

  for (let i = 0; i < slides.length; i++) {
    openImages[i].addEventListener("click", () => {
      currentIndex = i;
      moveSlides();
      updateDots();
      modalList.style.transition = "none";
    });
  }

  //2.画像を押したときに modal,modalList,mask,prev,next,btnList が表示されるようにする。
  openImages.forEach((open) => {
    open.addEventListener("click", () => {
      modal.classList.add("active");

      // document.getElementById(open.dataset.id).classList.add("active");
      // mask.classList.add("active");
      // container.classList.add("active");
      // prev.classList.add("active");
      // next.classList.add("active");
      // btnList.classList.add("active");
    });

    //3.mask をクリックしたときに modal,modalList,mask,prev,next,btnList が消えるようにする。
    mask.addEventListener("click", () => {
      modal.classList.remove("active");
      // document.getElementById(open.dataset.id).classList.remove("active");
      // mask.classList.remove("active");
      // container.classList.remove("active");
      // prev.classList.remove("active");
      // next.classList.remove("active");
      // btnList.classList.remove("active");
    });
  });

  setupDots();

  next.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex > 5) {
      currentIndex = 0;
    }
    updateDots();
    moveSlides();
    modalList.style.transition = "transform 0.3s";
  });

  prev.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = 5;
    }
    updateDots();
    moveSlides();
    modalList.style.transition = "transform 0.3s";
  });

  window.addEventListener("resize", () => {
    moveSlides();
  });
}
