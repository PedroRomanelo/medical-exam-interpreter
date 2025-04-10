function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide'); // Seleciona todos os slides
    const dots = document.querySelectorAll('.dot');     // Seleciona todos os indicadores (pontos)
  
    // Oculta todos os slides
    slides.forEach(slide => {
      slide.classList.remove('active'); // Remove a classe 'active' de todos os slides
    });
  
    // Remove a classe 'active' de todos os pontos
    dots.forEach(dot => {
      dot.classList.remove('active'); // Desativa todos os pontos
    });
  
    // Mostra o slide selecionado e ativa o ponto correspondente
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }
  

  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
      }
    });

    // Fechar o menu ao clicar em um botão
    const menuButtons = menu.querySelectorAll('button');
    menuButtons.forEach(button => {
      button.addEventListener('click', function() {
        menu.classList.remove('active');
      });
    });
  });