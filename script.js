// Gestion du menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du bouton hamburger
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Gestion du scroll smooth pour les liens d'ancrage
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80; // Décalage de 30px vers le haut
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gestion de l'intersection observer pour les animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.training-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}



// Fonction pour afficher le lecteur vidéo embarqué
// Variables globales pour le contrôle du lecteur vidéo
let isVideoPlayerOpen = false;
let initialScrollPosition = 0;
let scrollListener = null;
let youtubePlayer = null;

function showVideoPlayer() {
    const thumbnailContainer = document.getElementById('video-thumbnail-container');
    const playerContainer = document.getElementById('video-player-container');
    const iframe = document.getElementById('youtube-player');
    
    // Marquer que le lecteur est ouvert
    isVideoPlayerOpen = true;
    initialScrollPosition = window.pageYOffset;
    
    // Masquer la miniature avec une transition
    thumbnailContainer.style.opacity = '0';
    thumbnailContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Cacher complètement la miniature
        thumbnailContainer.style.display = 'none';
        
        // Charger la vidéo (lazy loading)
        if (iframe.getAttribute('data-src')) {
            iframe.src = iframe.getAttribute('data-src');
            iframe.removeAttribute('data-src');
        }
        
        // Afficher le lecteur
        playerContainer.style.display = 'block';
        
        // Animation d'apparition du lecteur
        setTimeout(() => {
            playerContainer.style.opacity = '1';
            playerContainer.style.transform = 'scale(1)';
            
            // Initialiser les écouteurs d'événements pour la fermeture automatique
            initVideoCloseListeners();
        }, 50);
    }, 300);
}

function closeVideoPlayer() {
    const thumbnailContainer = document.getElementById('video-thumbnail-container');
    const playerContainer = document.getElementById('video-player-container');
    const iframe = document.getElementById('youtube-player');
    
    if (!isVideoPlayerOpen) return;
    
    // Marquer que le lecteur est fermé
    isVideoPlayerOpen = false;
    
    // Supprimer les écouteurs d'événements
    removeVideoCloseListeners();
    
    // Masquer le lecteur avec une transition
    playerContainer.style.opacity = '0';
    playerContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Cacher complètement le lecteur
        playerContainer.style.display = 'none';
        
        // Arrêter la vidéo en rechargeant l'iframe
        iframe.src = '';
        iframe.setAttribute('data-src', 'https://www.youtube.com/embed/JL-62fBOmgk?si=kG2tZyxCV_3a2j4T&autoplay=1&rel=0&modestbranding=1&enablejsapi=1');
        
        // Réafficher la miniature
        thumbnailContainer.style.display = 'block';
        
        // Animation d'apparition de la miniature
        setTimeout(() => {
            thumbnailContainer.style.opacity = '1';
            thumbnailContainer.style.transform = 'scale(1)';
        }, 50);
    }, 300);
}

function initVideoCloseListeners() {
    // Écouteur de scroll
    scrollListener = function() {
        if (!isVideoPlayerOpen) return;
        
        const currentScrollPosition = window.pageYOffset;
        const scrollDifference = Math.abs(currentScrollPosition - initialScrollPosition);
        
        // Fermer si on scroll de plus de 400px
        if (scrollDifference > 400) {
            closeVideoPlayer();
        }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Écouteur pour la pause de la vidéo YouTube
    // Utiliser l'API YouTube pour détecter les changements d'état
    window.addEventListener('message', function(event) {
        if (!isVideoPlayerOpen) return;
        
        // Vérifier si le message provient de YouTube
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
            const data = JSON.parse(event.data);
            // État 2 = pause dans l'API YouTube
            if (data.event === 'video-progress' || (data.info && data.info.playerState === 2)) {
                closeVideoPlayer();
            }
        } catch (e) {
            // Ignorer les erreurs de parsing JSON
        }
    });
}

function removeVideoCloseListeners() {
    if (scrollListener) {
        window.removeEventListener('scroll', scrollListener);
        scrollListener = null;
    }
}

// Ancienne fonction openVideo (gardée pour compatibilité)
function openVideo() {
    const videoUrl = 'https://youtu.be/JL-62fBOmgk?si=kG2tZyxCV_3a2j4T';
    window.open(videoUrl, '_blank');
}

// Configuration EmailJS
(function() {
  // Configuration EmailJS

// Initialiser EmailJS avec votre Public Key
emailjs.init('CHqy5sAzFCuRa003s'); // Public Key EmailJS
})();

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher un message de chargement
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = '#e3f2fd';
            formStatus.style.color = '#1976d2';
            formStatus.textContent = 'Envoi en cours...';
            
            // Envoyer l'email via EmailJS
        emailjs.sendForm('service_8006v4p', 'template_jq8qmu5', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.style.backgroundColor = '#e8f5e8';
                    formStatus.style.color = '#2e7d32';
                    formStatus.textContent = 'Message envoyé avec succès ! Nous vous recontacterons bientôt.';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.style.backgroundColor = '#ffebee';
                    formStatus.style.color = '#c62828';
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.';
                });
        });
    }
});

// Animation des statistiques
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const targetValue = parseInt(entry.target.dataset.stat);
                
                animateNumber(statNumber, 0, targetValue, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing pour une animation plus fluide
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    
    // Initialiser l'animation des statistiques
    animateStats();
    

});

// Gestion du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.12)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.12)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Temps de chargement:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Language Selector Dropdown Functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const button = document.querySelector('.lang-dropdown-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const languageSelector = document.querySelector('.language-selector');
    const dropdown = document.getElementById('langDropdown');
    const button = document.querySelector('.lang-dropdown-btn');
    
    if (languageSelector && !languageSelector.contains(event.target)) {
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            if (button) {
                button.classList.remove('active');
            }
        }
    }
});