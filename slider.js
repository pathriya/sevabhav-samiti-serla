document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    let current = slides.findIndex(s => s.classList.contains('active'));
    if (current < 0) {
        current = 0;
        slides[0].classList.add('active');
    }

    function showSlide(index) {
        slides.forEach((el, i) => el.classList.toggle('active', i === index));
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play with pause on hover
    let autoplay = setInterval(nextSlide, 4000);
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => {
        clearInterval(autoplay);
        autoplay = setInterval(nextSlide, 4000);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // expose for debugging if needed
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
});