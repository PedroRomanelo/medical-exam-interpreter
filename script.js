let currentSlide = 0; // Índice do slide atual

function showSlide(slideIndex) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  // Esconde todos os slides
  slides.forEach(slide => slide.classList.remove('active'));

  // Desativa todos os dots
  dots.forEach(dot => dot.classList.remove('active'));

  // Mostra o slide e o dot correspondente
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function autoShowSlides() {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  showSlide(currentSlide);
  currentSlide = (currentSlide + 1) % totalSlides;

  setTimeout(autoShowSlides, 4000); // Troca de slide a cada 5 segundos
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  // Menu responsivo (se existir no HTML)
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('active');
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
      }
    });

    // Fecha o menu ao clicar em qualquer botão dentro dele
    const menuButtons = menu.querySelectorAll('button');
    menuButtons.forEach(button => {
      button.addEventListener('click', function () {
        menu.classList.remove('active');
      });
    });
  }

  // Mostra o slide inicial
  showSlide(currentSlide);

  // Inicia o carrossel automático
  autoShowSlides();
});


