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

// Create close button dynamically (so you don't have to edit HTML)
const modalContent = document.querySelector(".modal-content");

if (modal && modalImg && modalText && modalContent) {

  // Add close button if it doesn't exist
  let closeBtn = document.querySelector(".close-modal");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.classList.add("close-modal");
    closeBtn.innerHTML = "&times;";
    modalContent.prepend(closeBtn);
  }

  // Open modal
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {

      const imgSrc = item.querySelector("img").src;
      const title = item.dataset.title || "";
      const description = item.dataset.description || "";

      // Split description into paragraphs
      const paragraphs = description
        .split("||")
        .map(text => `<p>${text.trim()}</p>`)
        .join("");

      modalImg.src = imgSrc;
      modalText.innerHTML = `
        <h2 class="modal-title">${title}</h2>
        ${paragraphs}
      `;

      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Close when clicking X button
  closeBtn.addEventListener("click", () => {
    closeModal();
  });

  // Close when clicking outside modal-content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    modalImg.src = "";
    modalText.innerHTML = "";
    document.body.style.overflow = "auto"; // Restore scroll
  }
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