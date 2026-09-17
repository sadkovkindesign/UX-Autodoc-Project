document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Эффектное появление стартового экрана (Hero) при загрузке
    // -----------------------------------------------------------------
    setTimeout(() => {
        document.body.classList.add('hero_loaded');
    }, 100);

    // -----------------------------------------------------------------
    // 2. Переключение активных кнопок в хедере при скролле
    // -----------------------------------------------------------------
    const navLinks = document.querySelectorAll('.header_nav a');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('nav_btn_active');
                    } else {
                        link.classList.remove('nav_btn_active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // -----------------------------------------------------------------
    // 3. Универсальная повторяющаяся анимация для блоков при скролле
    // -----------------------------------------------------------------
    // Исключаем .persona_wrapper из общего списка, чтобы карточки персон 
    // не дергались и их ховер/тени работали безупречно плавно.
    const animatedElements = document.querySelectorAll(
        '[class*="_header"], ' +
        '[class*="_card"], ' +
        ':not(.persona_wrapper)[class*="_wrapper"], ' + 
        '[class*="_box"], ' +
        '[class*="_row"], ' +
        '[class*="_grid"], ' +
        '[class*="_content"], ' +
        '[class*="_graphics"]'
    );

    const animateObserverOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px', 
        threshold: 0.05
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, animateObserverOptions);

    animatedElements.forEach(el => {
        el.classList.add('not-visible-yet');
        animateObserver.observe(el);
    });
});

