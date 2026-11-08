
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     PAGE LOAD
  ===================================== */

  document.body.classList.add("page-loaded");


  /* =====================================
     MOBILE NAVIGATION
  ===================================== */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      hamburger.innerHTML = isOpen ? "&times;" : "&#9776;";
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.innerHTML = "&#9776;";
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

  }


  /* =====================================
     ACTIVE NAVIGATION LINK
  ===================================== */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }

  });


  

/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

const revealElements = document.querySelectorAll(
  ".content h1, .content h2, .content h3, " +
  ".content p, .gallery-item, .carousel, " +
  ".hero-image-container"
);

if ("IntersectionObserver" in window) {

  document.documentElement.classList.add("js-reveal");

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0,
    rootMargin: "0px 0px 100px 0px"
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}



  /* =====================================
     GALLERY MODAL
  ===================================== */

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalText = document.getElementById("modal-text");
  const modalContent = document.querySelector(".modal-content");

  if (modal && modalImg && modalText && modalContent) {

    const closeBtn = modal.querySelector(".close-modal");

    function openModal(item) {

      const image = item.querySelector("img");

      if (!image) return;

      const title = item.dataset.title || image.alt || "";
      const description = item.dataset.description || "";

      modalImg.src = image.src;
      modalImg.alt = title;

      modalText.replaceChildren();

      const heading = document.createElement("h2");
      heading.className = "modal-title";
      heading.textContent = title;

      modalText.appendChild(heading);

      description.split("||").forEach(text => {

        const trimmed = text.trim();

        if (trimmed) {
          const paragraph = document.createElement("p");
          paragraph.textContent = trimmed;
          modalText.appendChild(paragraph);
        }

      });

      modal.style.display = "flex";

      requestAnimationFrame(() => {
        modal.classList.add("show");
      });

      document.body.style.overflow = "hidden";
    }


    function closeModal() {

      modal.classList.remove("show");

      setTimeout(() => {
        modal.style.display = "none";
        modalImg.src = "";
        modalText.replaceChildren();
        document.body.style.overflow = "";
      }, 350);

    }


    document.querySelectorAll(".gallery-item").forEach(item => {

      item.addEventListener("click", () => {
        openModal(item);
      });

    });


    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }


    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal();
      }

    });


    document.addEventListener("keydown", event => {

      if (event.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }

    });

  }


  /* =====================================
     ABOUT PAGE CAROUSEL
  ===================================== */

  const carousel = document.querySelector(".carousel");

  if (carousel) {

    const images = carousel.querySelectorAll(".carousel-image");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");

    if (images.length && nextBtn && prevBtn) {

      let currentIndex = 0;
      let timer;

      function showImage(index) {

        images.forEach(image => {
          image.classList.remove("active");
        });

        images[index].classList.add("active");

      }


      function nextImage() {

        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);

      }


      function prevImage() {

        currentIndex =
          (currentIndex - 1 + images.length) % images.length;

        showImage(currentIndex);

      }


      function restartAuto() {

        clearInterval(timer);

        if (!window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches) {
          timer = setInterval(nextImage, 5000);
        }

      }


      nextBtn.addEventListener("click", () => {
        nextImage();
        restartAuto();
      });


      prevBtn.addEventListener("click", () => {
        prevImage();
        restartAuto();
      });


      carousel.addEventListener("mouseenter", () => {
        clearInterval(timer);
      });


      carousel.addEventListener("mouseleave", restartAuto);


      restartAuto();

    }

  }


  /* =====================================
     BACKGROUND PARALLAX
     Retained for existing background images
  ===================================== */

  const bg = document.getElementById("painting-bg");

  if (bg && window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  ).matches) {

    let ticking = false;

    window.addEventListener("scroll", () => {

      if (!ticking) {

        requestAnimationFrame(() => {

          const scrollY = window.scrollY;

          bg.style.transform =
            `translate(${-scrollY * 0.025}px, ${-scrollY * 0.02}px)`;

          ticking = false;

        });

        ticking = true;
      }

    }, { passive: true });

  }

});
