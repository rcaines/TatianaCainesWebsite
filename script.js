document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SCROLL-BASED DIAGONAL BACKGROUND ---------- */
  const bg = document.getElementById("painting-bg");
  const aboutText = document.querySelector(".content");

  if (bg || aboutText) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (bg) {
        const moveX = scrollY * 0.04;
        const moveY = scrollY * 0.03;
        bg.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      }
    });
  }

/* ---------- GALLERY MODAL ---------- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");

if (modal && modalImg && modalText) {
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const title = item.dataset.title || "";
      const description = item.dataset.description || "";

      const paragraphs = description
        .split("||")
        .map(text => `<p>${text.trim()}</p>`)
        .join("");

      modal.style.display = "flex";
      modalImg.src = imgSrc;
      modalText.innerHTML = `<strong>${title}</strong>${paragraphs}`;
    });
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


  /* ---------- CAROUSEL (ABOUT PAGE ONLY) ---------- */
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const images = carousel.querySelectorAll(".carousel-image");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");

    if (images.length && nextBtn && prevBtn) {
      let currentIndex = 0;
      let timer;

      function showImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nextImage();
        restartAuto();
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prevImage();
        restartAuto();
      });

      function restartAuto() {
        clearInterval(timer);
        timer = setInterval(nextImage, 4000);
      }

      restartAuto();
    }
  }

});