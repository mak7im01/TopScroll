// TopScroll — аддон для PulseSync
// Клик по левому краю экрана прокручивает страницу наверх (правый клик — вниз)

let lastScrollY = 0;

function initZone() {
    if (document.getElementById('topscroll-zone')) return;

    const zone = document.createElement('div');
    zone.id = 'topscroll-zone';

    // Левый клик — скролл наверх, запоминаем позицию
    zone.addEventListener('click', () => {
        const scrollable = getScrollableElement();
        if (!scrollable) return;

        const current = scrollable === window ? window.scrollY : scrollable.scrollTop;

        if (current > 0) {
            lastScrollY = current;
            doScrollTo(scrollable, 0);
        } else {
            // Уже наверху — вернуться назад
            doScrollTo(scrollable, lastScrollY);
        }
    });

    // Правый клик — скролл вниз
    zone.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        const scrollable = getScrollableElement();
        if (!scrollable) return;

        const maxScroll = scrollable === window
            ? document.body.scrollHeight - window.innerHeight
            : scrollable.scrollHeight - scrollable.clientHeight;

        doScrollTo(scrollable, maxScroll);
    });

    document.body.appendChild(zone);
}

function getScrollableElement() {
    const candidates = document.querySelectorAll('*');
    for (const el of candidates) {
        const overflowY = getComputedStyle(el).overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
            return el;
        }
    }
    return window;
}

function doScrollTo(target, position) {
    if (target === window) {
        window.scrollTo({ top: position, behavior: 'smooth' });
    } else {
        target.scrollTo({ top: position, behavior: 'smooth' });
    }
}

initZone();
