document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('typewriter');
    if (!element) return;

    // Guarda o texto original e limpa o elemento
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    // Adiciona a classe do cursor
    element.classList.add('cursor');

    let index = 0;
    let currentText = '';
    const speed = 75; // Velocidade da digitação em ms (menor = mais rápido)

    function type() {
        if (index < originalHTML.length) {
            const char = originalHTML.charAt(index);
            
            if (char === '<') {
                let tag = '';
                do {
                    tag += originalHTML.charAt(index);
                    index++;
                } while (index < originalHTML.length && originalHTML.charAt(index - 1) !== '>');
                currentText += tag;
                element.innerHTML = currentText;
                type();
            } else {
                currentText += char;
                element.innerHTML = currentText;
                index++;
                setTimeout(type, speed);
            }
        }
    }

    // Inicia a digitação após um pequeno delay
    setTimeout(type, 500);

    // Lógica de Animação ao Scroll (Fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
            }
        });
    });

    // Seleciona elementos para animar
    const hiddenElements = document.querySelectorAll('section, .hero, .card, .project-card, .resume-item, .process-item');
    hiddenElements.forEach((el) => el.classList.add('scroll-hidden'));
    hiddenElements.forEach((el) => observer.observe(el));

    // Validação do Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const emailInput = contactForm.querySelector('input[name="email"]');
            const emailValue = emailInput.value.trim();
            
            // Regex para validar formato de email (ex: texto@texto.texto)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailValue)) {
                e.preventDefault();
                alert('Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).');
                emailInput.style.borderColor = '#ff4444';
                emailInput.focus();
            } else {
                emailInput.style.borderColor = 'var(--border-soft)';
            }
        });
    }

    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
