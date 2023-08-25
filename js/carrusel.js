document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  let isDragging = false;
  let startPos = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const intervalTime = 5000; // Intervalo de tiempo en milisegundos (5 segundos)

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    updateIndicators();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".slider-indicators button");
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  }

  // Crear los indicadores dinámicamente
  const indicatorsContainers = document.querySelectorAll(".slider-indicators");
  indicatorsContainers.forEach((container) => {
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.addEventListener("click", () => {
        currentSlide = i;
        showSlide(currentSlide);
        updateIndicators();
      });
      container.appendChild(indicator);
    }
  });

  // Mostrar el primer slide e indicador activo al cargar la página
  showSlide(currentSlide);
  updateIndicators();

    // Agregar la transición automática
  setInterval(() => {
    nextSlide();
  }, intervalTime);

  // Funcionalidad de arrastre
  slides.forEach((slide) => {
    slide.addEventListener("mousedown", (e) => {
      isDragging = true;
      startPos = e.clientX;
    });

    slide.addEventListener("touchstart", (e) => {
      isDragging = true;
      startPos = e.touches[0].clientX;
    });

    slide.addEventListener("mouseup", () => {
      isDragging = false;
    });

    slide.addEventListener("touchend", () => {
      isDragging = false;
    });

    slide.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const diff = e.clientX - startPos;
      if (diff > 100) {
        prevSlide();
        isDragging = false;
      } else if (diff < -100) {
        nextSlide();
        isDragging = false;
      }
    });

    slide.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startPos;
      if (diff > 100) {
        prevSlide();
        isDragging = false;
      } else if (diff < -100) {
        nextSlide();
        isDragging = false;
      }
    });
  });
});
