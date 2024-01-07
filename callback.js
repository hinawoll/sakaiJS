"use strict";

{
  // Intersection Observer API

  function inViewCallback(entries, obs) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("appear");
      obs.unobserve(entry.target);
    });
  }

  function onScrollCallback(entries) {
    //entries は配列で渡されるので、監視するのが一つだけであってもforEachで処理する。
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        toTop.classList.add("appear");
      } else {
        toTop.classList.remove("appear");
      }
    });
  }

  const toTop = document.querySelector("#to-top");

  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });

  document.querySelectorAll(".item").forEach((el) => {
    inViewObserver.observe(el);
  });

  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.getElementById("target"));

  // toTop.addEventListener('click', e => {

  //   e.preventDefault();//URL 末尾にパウンド記号が付かないようにする。ただ、これだけだと上にも戻らなくなるので window.scrollTo と言う命令を使って戻る位置をオブジェクトで指定します。

  //   window.scrollTo({
  //     top: 0,//一番上まで戻りたいので、 top: 0。
  //     behavior: 'smooth',
  //   });
  // });



  
  // const headerHeight = document.querySelector("header").offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const href = anchor.getAttribute("href");

      const target = document.getElementById(href.replace("#", ""));

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY ;
      // const targetPosition =
      //   target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}
