// Efeito de Rolagem Suave
function smoothScroll(target, duration) {
    const element = document.querySelector(target);
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Adicionando evento nos links
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target, 1000);
    });
});

// Contagem Regressiva
function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    const tenMinutes = 60 * 10;
    const display = document.querySelector('#countdown');
    startCountdown(tenMinutes, display);
};

// Animações ao Scroll
const revealElements = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
});

// FAQ Interativo
const faqItems = document.querySelectorAll('.faq-item label');
faqItems.forEach(label => {
    label.addEventListener('click', () => {
        const content = label.nextElementSibling;
        const allContents = document.querySelectorAll('.faq-content');
        allContents.forEach(item => {
            if (item !== content) item.style.display = 'none';
        });
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Termos e Política de Privacidade
function loadLegalDocuments() {
    fetch('termos_de_uso.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#termos-uso').innerHTML = data;
        });
    fetch('politica_privacidade.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#politica-privacidade').innerHTML = data;
        });
}

window.addEventListener('load', loadLegalDocuments);

// Efeito Parallax
window.addEventListener('scroll', function () {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

// Animação de Vídeo
const video = document.querySelector('video');
video.addEventListener('ended', () => {
    document.querySelectorAll('.after-video').forEach(element => {
        element.classList.remove('hidden');
    });
});
