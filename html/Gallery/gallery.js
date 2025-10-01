// ParticlesJS Config
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 2 },
    line_linked: { enable: true },
    color: "#ffffff"
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  }
});

// Scroll Fade-in Animation
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// ===============================
// Slideshow for Specific Gallery
// ===============================
const slideshow = document.querySelector("#slideshow-gallery");

if (slideshow) {
  let images = slideshow.querySelectorAll("img");
  let currentIndex = 0;

  function showNextImage() {
    // Reset all images
    images.forEach((img, index) => {
      img.style.opacity = (index === currentIndex) ? "1" : "0";
      img.style.transition = "opacity 1s ease-in-out";
      img.style.position = "absolute";
      img.style.left = "0";
      img.style.top = "0";
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "12px";
    });

    // Move to next
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Start auto slideshow
  setInterval(showNextImage, 3000); // change every 3s
  showNextImage();
}

/*slide*/

// Slideshow for Specific Gallery
const slideshow = document.querySelector("#slideshow-gallery");

if (slideshow) {
  let images = slideshow.querySelectorAll(".slides img");
  let prevBtn = slideshow.querySelector(".prev");
  let nextBtn = slideshow.querySelector(".next");
  let dotsContainer = slideshow.querySelector(".dots");
  let currentIndex = 0;
  let autoSlide;

  // Create dots
  images.forEach((_, index) => {
    let dot = document.createElement("span");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  let dots = dotsContainer.querySelectorAll("span");

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
      dots[i].classList.remove("active");
      if (i === index) {
        img.classList.add("active");
        dots[i].classList.add("active");
      }
    });
    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-slide
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  slideshow.addEventListener("mouseenter", stopAutoSlide);
  slideshow.addEventListener("mouseleave", startAutoSlide);

  // Init
  showSlide(0);
  startAutoSlide();
}

// Mobile Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("open");
});

// Optional animation for hamburger
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
});

