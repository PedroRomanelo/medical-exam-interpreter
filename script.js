document.addEventListener('DOMContentLoaded', function () {
  // Variáveis para os carrosséis
  let currentContentSlide = 0;
  let currentBannerSlide = 0;
  let slideInterval;

  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  
  // Menu responsivo
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

  // Função para mostrar slides de conteúdo
  function showContentSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0 || dots.length === 0) return;

    // Limita o índice ao número de slides disponíveis
    slideIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));
    currentContentSlide = slideIndex;

    // Esconde todos os slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Desativa todos os dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Mostra o slide e o dot correspondente
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }

  // Função para controlar o carrossel de banners (topo)
  function showBannerSlide(slideIndex) {
    const bannerSlides = document.querySelectorAll('.slide2');
    if (bannerSlides.length === 0) return;

    // Limita o índice ao número de banners disponíveis
    slideIndex = Math.max(0, Math.min(slideIndex, bannerSlides.length - 1));
    currentBannerSlide = slideIndex;

    // Calcula o deslocamento
    const offset = -slideIndex * 100;
    const slidesContainer = document.querySelector('.slides1');
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(${offset}%)`;
    }
  }

  // Configuração dos dots para os slides de conteúdo
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showContentSlide(index);
      resetTimer();
    });
  });

  // Configuração de navegação para banners (se quiser adicionar)
  // Pode adicionar botões de navegação se necessário

  // Função para alternar slides automaticamente
  function startAutoSlides() {
    // Limpa qualquer intervalo existente
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    
    // Cria um novo intervalo
    slideInterval = setInterval(() => {
      // Avança o slide de conteúdo
      currentContentSlide = (currentContentSlide + 1) % document.querySelectorAll('.slide').length;
      showContentSlide(currentContentSlide);
      
      // Avança o banner
      currentBannerSlide = (currentBannerSlide + 1) % document.querySelectorAll('.slide2').length;
      showBannerSlide(currentBannerSlide);
    }, 4000);
  }
  
  // Função para resetar o timer quando o usuário interage
  function resetTimer() {
    clearInterval(slideInterval);
    startAutoSlides();
  }

  // Detecta eventos de toque para dispositivos móveis
  const contentContainer = document.querySelector('.content-container');
  const carouselContainer = document.querySelector('.carousel');
  
  // Variáveis para controle de gestos
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Configura evento de toque para slides de conteúdo
  if (contentContainer) {
    contentContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    contentContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(
        touchStartX, 
        touchEndX, 
        () => {
          showContentSlide((currentContentSlide - 1 + document.querySelectorAll('.slide').length) % document.querySelectorAll('.slide').length);
        }, 
        () => {
          showContentSlide((currentContentSlide + 1) % document.querySelectorAll('.slide').length);
        }
      );
      resetTimer();
    }, false);
  }
  
  // Configura evento de toque para carrossel de banners
  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(
        touchStartX, 
        touchEndX, 
        () => {
          showBannerSlide((currentBannerSlide - 1 + document.querySelectorAll('.slide2').length) % document.querySelectorAll('.slide2').length);
        }, 
        () => {
          showBannerSlide((currentBannerSlide + 1) % document.querySelectorAll('.slide2').length);
        }
      );
      resetTimer();
    }, false);
  }
  
  // Função para manipular eventos de swipe
  function handleSwipe(startX, endX, leftCallback, rightCallback) {
    const threshold = 50; // Mínimo de pixels para detectar um swipe
    
    if (startX - endX > threshold) {
      // Swipe para esquerda (próximo slide)
      rightCallback();
    } else if (endX - startX > threshold) {
      // Swipe para direita (slide anterior)
      leftCallback();
    }
  }

  // Inicializa os dois carrosséis
  showContentSlide(0);
  showBannerSlide(0);
  
  // Inicia a alteração automática dos slides
  startAutoSlides();
});


//--------------

document.addEventListener('DOMContentLoaded', function() {
  const classificationButtons = document.querySelectorAll('.classification-button');
  const infoBoxes = document.querySelectorAll('.classification-info');
  
  // Função para ocultar todas as caixas de informação
  function hideAllInfoBoxes() {
    infoBoxes.forEach(box => {
      box.style.display = 'none';
    });
    
    // Remove a classe active de todos os botões
    classificationButtons.forEach(button => {
      button.classList.remove('active');
    });
  }
  
  // Adiciona o evento de clique a cada botão
  classificationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const infoBox = document.getElementById('info-' + type);
      
      // Se o botão já estiver ativo, oculta a caixa de informação
      if (this.classList.contains('active')) {
        hideAllInfoBoxes();
      } else {
        // Caso contrário, oculta todas as caixas e exibe a selecionada
        hideAllInfoBoxes();
        infoBox.style.display = 'block';
        this.classList.add('active');
      }
    });
  });
});