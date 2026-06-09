/* ========================================
   TECNOWEBTITO - JAVASCRIPT PRINCIPAL
   ======================================== */

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funciones
    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initScrollTop();
    initDonationButtons();
    initContactForm();
    initAnimations();
});

/* ========================================
   NAVEGACIÓN
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Cambiar estilo al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar link activo
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

/* ========================================
   SCROLL SUAVE
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('navMenu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

/* ========================================
   MENÚ MÓVIL
   ======================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

/* ========================================
   BOTÓN SCROLL TOP
   ======================================== */
function initScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
        
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ========================================
   BOTONES DE DONACIÓN
   ======================================== */
function initDonationButtons() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            amountBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Aquí podrías actualizar el monto en un formulario o redirigir
            const amount = btn.getAttribute('data-amount');
            console.log(`Monto seleccionado: $${amount}`);
        });
    });
    
    // Botones de métodos de pago
    const methodBtns = document.querySelectorAll('.method-btn');
    
    methodBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.classList.contains('gofundme')) {
                e.preventDefault();
                alert('Próximamente disponible. Por ahora, usa GoFundMe para donar.');
            }
        });
    });
}

/* ========================================
   FORMULARIO DE CONTACTO
   ======================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.name || !data.email || !data.subject || !data.message) {
                showAlert('Por favor completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showAlert('Por favor ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Aquí iría el envío real del formulario
            // Por ahora, simulamos un envío exitoso
            try {
                // Simular envío
                await simulateFormSubmission();
                
                showAlert('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
                contactForm.reset();
            } catch (error) {
                showAlert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            }
        });
    }
}

function simulateFormSubmission() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

function showAlert(message, type) {
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Estilos de la alerta
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00ff88' : '#ff6b6b'};
        color: ${type === 'success' ? '#1a1a2e' : '#fff'};
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    `;
    
    // Agregar animación CSS
    if (!document.getElementById('alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alert);
    
    // Remover alerta después de 5 segundos
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

/* ========================================
   ANIMACIONES AL SCROLL
   ======================================== */
function initAnimations() {
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const animatedElements = document.querySelectorAll('.course-card, .service-card, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animar números de estadísticas
    animateStats();
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStat = (stat) => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentValue);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            stat.textContent = displayValue;
        }, stepTime);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

/* ========================================
   FUNCIONES UTILITARIAS
   ======================================== */

// Detectar si el dispositivo es móvil
function isMobile() {
    return window.innerWidth <= 968;
}

// Throttle para eventos de scroll
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(this, args);
            }, delay);
        } else {
            lastExecTime = currentTime;
            func.apply(this, args);
        }
    };
}

// Lazy loading para imágenes (si las agregas)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ========================================
   CONSOLA DE BIENVENIDA
   ======================================== */
console.log('%c👋 ¡Bienvenido a TecnoWebTito!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%c Academia del Autodidacta - Educación Tech Gratis', 'color: #00ff88; font-size: 14px;');
console.log('%c💚 Creado con ❤️ por Luis Vilches y la comunidad', 'color: #8892b0; font-size: 12px;');
console.log('%c\n🚀 ¿Quieres contribuir? Visita: https://gofundme.com/rompe-la-barrera', 'color: #00d9ff; font-size: 12px;');

/* ========================================
   SERVICE WORKER (Para PWA - Opcional)
   ======================================== */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('ServiceWorker registrado:', registration);
//             })
//             .catch(error => {
//                 console.log('ServiceWorker falló:', error);
//             });
//     });
// }