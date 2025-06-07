
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', function() {
  const serviceModal = document.getElementById('serviceModal');
  
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const serviceId = button.getAttribute('data-service');
      const serviceItem = button.closest('.service-item');
      
      // Définir l'ID du service sur le modal
      serviceModal.setAttribute('data-service', serviceId);
      
      // Récupérer les données du service
      const title = serviceItem.querySelector('h3').textContent;
      const description = serviceItem.querySelector('p').textContent;
      const iconClass = serviceItem.querySelector('i').className;
      
      // Mettre à jour le modal
      serviceModal.querySelector('.modal-title-text').textContent = title;
      serviceModal.querySelector('.modal-description').textContent = description;
      serviceModal.querySelector('.modal-icon').className = `modal-icon ${iconClass}`;
      
      // Générer le contenu dynamique en fonction du service
      const featuresGrid = serviceModal.querySelector('.features-grid');
      featuresGrid.innerHTML = '';
      
      // Données pour chaque service (vous pouvez les personnaliser)
      const serviceData = {
        '1': [
          { icon: 'bi bi-brush', title: 'Logo Design', description: 'Création de logos uniques et mémorables' },
          { icon: 'bi bi-palette', title: 'Charte Graphique', description: 'Développement d\'une identité visuelle cohérente' },
          { icon: 'bi bi-card-image', title: 'Print Design', description: 'Conception de supports imprimés professionnels' },
          { icon: 'bi bi-easel', title: 'Illustration', description: 'Création d\'illustrations personnalisées' }
        ],
        '2': [
          { icon: 'bi bi-camera-video', title: 'Vidéos', description: 'Production vidéo professionnelle' },
          { icon: 'bi bi-camera', title: 'Photographie', description: 'Séances photo et retouches' },
          { icon: 'bi bi-mic', title: 'Podcasts', description: 'Production et montage audio' },
          { icon: 'bi bi-file-earmark-play', title: 'Motion Design', description: 'Animations et vidéos explicatives' }
        ],
        '3': [
          { icon: 'bi bi-lightbulb', title: 'Stratégie', description: 'Planification stratégique sur mesure' },
          { icon: 'bi bi-people', title: 'Branding', description: 'Développement de votre marque' },
          { icon: 'bi bi-graph-up', title: 'Marketing', description: 'Stratégies marketing innovantes' },
          { icon: 'bi bi-megaphone', title: 'Communication', description: 'Plans de communication efficaces' }
        ],
        '4': [
          { icon: 'bi bi-globe', title: 'Sites Web', description: 'Développement de sites vitrines' },
          { icon: 'bi bi-cart', title: 'E-commerce', description: 'Boutiques en ligne performantes' },
          { icon: 'bi bi-laptop', title: 'Applications Web', description: 'Solutions web sur mesure' },
          { icon: 'bi bi-search', title: 'SEO', description: 'Optimisation pour les moteurs de recherche' }
        ],
        '5': [
          { icon: 'bi bi-phone', title: 'Apps Mobiles', description: 'Applications iOS et Android' },
          { icon: 'bi bi-google', title: 'Google Profil', description: 'Optimisation de votre présence Google' },
          { icon: 'bi bi-server', title: 'Hébergement', description: 'Solutions cloud sécurisées' },
          { icon: 'bi bi-shield-lock', title: 'Sécurité', description: 'Protection de vos données' }
        ]
      };
      
      // Ajouter les cartes avec des animations aléatoires
      const animations = ['animate-fade', 'animate-zoom', 'animate-slide'];
      serviceData[serviceId].forEach((feature, index) => {
        const animationClass = animations[index % animations.length];
        
        const card = document.createElement('div');
        card.className = `feature-card ${animationClass}`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
          <i class="${feature.icon}"></i>
          <h4>${feature.title}</h4>
          <p>${feature.description}</p>
        `;
        featuresGrid.appendChild(card);
      });
    });
    
    // Réinitialiser les animations lorsque le modal est fermé
    serviceModal.addEventListener('hidden.bs.modal', function() {
      serviceModal.removeAttribute('data-service');
    });
  }
});

// Gestion du modal Packages
document.addEventListener('DOMContentLoaded', function() {
  const packagesModal = document.getElementById('packagesModal');
  
  if (packagesModal) {
    const quizSteps = packagesModal.querySelectorAll('.quiz-step');
    const progressBar = packagesModal.querySelector('.progress-bar');
    const nextBtn = packagesModal.querySelector('.next-btn');
    const prevBtn = packagesModal.querySelector('.prev-btn');
    let currentStep = 1;
    
    // Initialisation
    updateProgress();
    
    // Gestion des boutons
    nextBtn.addEventListener('click', function() {
      if (currentStep < quizSteps.length) {
        goToStep(currentStep + 1);
      } else {
        // Soumettre le formulaire
        submitPackageForm();
      }
    });
    
    prevBtn.addEventListener('click', function() {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
    
    function goToStep(step) {
      quizSteps.forEach(s => s.classList.remove('active'));
      packagesModal.querySelector(`.quiz-step[data-step="${step}"]`).classList.add('active');
      currentStep = step;
      
      // Mettre à jour les boutons
      prevBtn.disabled = step === 1;
      nextBtn.innerHTML = step === quizSteps.length 
        ? 'Voir les résultats <i class="bi bi-check-circle ms-2"></i>' 
        : 'Suivant <i class="bi bi-chevron-right ms-2"></i>';
      
      updateProgress();
    }
    
    function updateProgress() {
      const progress = (currentStep / quizSteps.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
    
    function submitPackageForm() {
      // Récupérer les réponses
      const answers = {
        stage: packagesModal.querySelector('input[name="stage"]:checked')?.value,
        // Ajouter les autres réponses
      };
      
      // Afficher les packages recommandés (simulation)
      const recommended = packagesModal.querySelector('.recommended-packages');
      recommended.innerHTML = `
        <div class="col-md-6 mb-4">
          <div class="card h-100 border-primary">
            <div class="card-body">
              <h4 class="card-title text-primary">Starter Pack</h4>
              <p class="card-text">Parfait pour les nouveaux projets avec un budget limité.</p>
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item">Consultation initiale</li>
                <li class="list-group-item">Analyse de marché</li>
                <li class="list-group-item">Plan d'action</li>
              </ul>
              <button class="btn btn-outline-primary w-100">Choisir ce package</button>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="card h-100 border-success">
            <div class="card-body">
              <h4 class="card-title text-success">Business Pack</h4>
              <p class="card-text">Solution complète pour les projets en croissance.</p>
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item">Stratégie complète</li>
                <li class="list-group-item">Design & Développement</li>
                <li class="list-group-item">Support 3 mois</li>
              </ul>
              <button class="btn btn-outline-success w-100">Choisir ce package</button>
            </div>
          </div>
        </div>
      `;
      
      goToStep(quizSteps.length); // Aller à la dernière étape
    }
  }
  
  // Activer le lien "En savoir plus" pour Packages
  document.querySelector('.service-item h3:contains("Packages")')?.closest('.service-item')
    .querySelector('.service-link')
    .setAttribute('data-bs-toggle', 'modal')
    .setAttribute('data-bs-target', '#packagesModal');
});

document.addEventListener('DOMContentLoaded', function() {
  const phrases = [
    "expériences mémorables",
    "solutions innovantes",
    "résultats exceptionnels"
  ];
  const element = document.querySelector('.rotating-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let pauseBetweenPhrases = 2000;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting characters
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing characters
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = pauseBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before starting next phrase
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start the animation
  typeWriter();
});