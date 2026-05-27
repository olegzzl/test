// ===================================
// ОСНОВНИЙ JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // КАСТОМНИЙ КУРСОР
    // ===================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Ефект при наведенні на інтерактивні елементи
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .service-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // ===================================
    // НАВІГАЦІЯ ПРИ СКРОЛІ
    // ===================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===================================
    // ПОВНОЕКРАННЕ МЕНЮ
    // ===================================
    const menuToggle = document.getElementById('menu-toggle');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const menuClose = document.getElementById('menu-close');
    const fullMenuLinks = document.querySelectorAll('.full-menu-link');
    
    if (menuToggle && fullscreenMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            fullscreenMenu.classList.toggle('active');
            document.body.style.overflow = fullscreenMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Закриття меню при кліку на посилання
        fullMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===================================
    // ФІЛЬТРАЦІЯ ПОРТФОЛІО
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Активна кнопка
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 300);
                }
            });
        });
    });
    
    // ===================================
    // АНІМАЦІЯ ПРИ СКРОЛІ (Intersection Observer)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Додаємо fade-in клас до секцій
    const sections = document.querySelectorAll('.about, .portfolio, .services, .contact');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // ===================================
    // TILT ЕФЕКТ ДЛЯ КАРТОК
    // ===================================
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ===================================
    // КОНТАКТНА ФОРМА
    // ===================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Імітація відправки форми
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Відправка...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                
                // Показати toast повідомлення
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                }
            }, 1500);
        });
    }
    
    // ===================================
    // ПЛАВНИЙ СКРОЛ ДО ЯКОРІВ
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // ПАРАЛАКС ЕФЕКТ ДЛЯ ГРАДІЄНТНИХ КУЛЬ
    // ===================================
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===================================
    // АНІМАЦІЯ ЛІЧИЛЬНИКА (для досвіду)
    // ===================================
    const experienceBadge = document.querySelector('.experience-badge');
    
    if (experienceBadge) {
        const numberEl = experienceBadge.querySelector('.number');
        const targetNumber = parseInt(numberEl.textContent);
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = targetNumber / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            numberEl.textContent = targetNumber + '+';
                            clearInterval(counter);
                        } else {
                            numberEl.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                    
                    countObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        countObserver.observe(experienceBadge);
    }
    
    // ===================================
    // ЕФЕКТ "ХОЛОГРАМИ" ДЛЯ ПОРТФОЛІО
    // ===================================
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const overlay = card.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(108, 92, 231, 0.95), rgba(108, 92, 231, 0.9))`;
            }
        });
    });
    
    // ===================================
    // ДИНАМІЧНІ ЧАСТИНКИ НА HERO СЕКЦІЇ
    // ===================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Додавання ефекту при русі миші
        heroSection.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
    
    // ===================================
    // ЗМІНА КОЛЬОРУ ЛОГОТИПУ ПРИ СКРОЛІ
    // ===================================
    const logoText = document.querySelector('.logo-text');
    const logoDot = document.querySelector('.logo-dot');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (logoText) logoText.style.color = '#ffffff';
            if (logoDot) logoDot.style.color = '#6c5ce7';
        } else {
            if (logoText) logoText.style.color = '#ffffff';
            if (logoDot) logoDot.style.color = '#6c5ce7';
        }
    });
    
    // ===================================
    // КНОПКА "НАГОРУ"
    // ===================================
    const createScrollToTopButton = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6c5ce7 0%, #fd79a8 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'translateY(-5px)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'translateY(0)';
        });
    };
    
    createScrollToTopButton();
    
    // ===================================
    // ЕФЕКТ "ДРУКУ" ДЛЯ ЗАГОЛОВКІВ
    // ===================================
    const animateTitle = () => {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeWriter = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeWriter);
                    }
                }, 100);
            }, 800 + (index * 100));
        });
    };
    
    // Запускаємо після завантаження сторінки
    setTimeout(animateTitle, 2500);
    
    console.log('🎨 Сайт дизайнера успішно завантажено!');
});

// ===================================
// ДОДАТКОВІ ЕФЕКТИ
// ===================================

// Ефект магніту для кнопок
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Хвилястий ефект при кліку
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #6c5ce7;
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        animation: rippleEffect 0.6s ease-out forwards;
        z-index: 9999;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Додаємо анімацію для ripple ефекту
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
