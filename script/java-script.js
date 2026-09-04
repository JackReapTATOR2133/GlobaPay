document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) {
        return;
    }

    let current = 0;

    const visibleCount = () => window.innerWidth <= 700 ? 1 : 3;
    const totalCards = () => track.querySelectorAll('.card').length;

    function maxIndex() {
        return Math.max(0, totalCards() - visibleCount());
    }

    function buildDots() {
        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxIndex(); i++) {
            const d = document.createElement('button');
            d.className = 'dot' + (i === current ? ' active' : '');
            d.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(d);
        }
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function getCardWidth() {
        const card = track.querySelector('.card');
        if (!card) {
            return 0;
        }

        const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
        return card.getBoundingClientRect().width + gap;
    }

    function goTo(index) {
        if (totalCards() <= visibleCount()) {
            current = 0;
        } else if (index < 0) {
            current = maxIndex();
        } else if (index > maxIndex()) {
            current = 0;
        } else {
            current = index;
        }

        const offset = current * getCardWidth();
        track.style.transform = `translateX(-${offset}px)`;

        updateDots();
        prevBtn.style.opacity = '1';
        nextBtn.style.opacity = '1';
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    buildDots();
    goTo(0);

    window.addEventListener('resize', () => {
        buildDots();
        goTo(Math.min(current, maxIndex()));
    });
});