// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-in-out'
    });

    // Initialize sections state
    const fullImpressumEn = document.getElementById('fullImpressumEn');
    const fullImpressumDe = document.getElementById('fullImpressumDe');
    const fullDatenschutz = document.getElementById('fullDatenschutz');
    
    // Add privacy-content class to all expandable sections
    [fullImpressumEn, fullImpressumDe, fullDatenschutz].forEach(element => {
        if (element) {
            element.classList.add('privacy-content');
        }
    });

    // Add fade-in class to all buttons
    document.querySelectorAll('#langBtn, #phoneBtn, #emailBtn, #whatsappBtn').forEach(btn => {
        btn.classList.add('fade-in');
    });

    // Show buttons initially
    setTimeout(showButtons, 750);
});

// Function to toggle Impressum visibility
function toggleImpressum() {
    console.log('toggleImpressum called'); // Debug log
    
    // Определяем язык из атрибута data-lang кнопки
    const button = document.querySelector('button[onclick="toggleImpressum()"]');
    const lang = button?.getAttribute('data-lang') || 'de';
    const isEnglish = lang === 'en';
    
    // Получаем элемент с контентом, используя правильный ID в зависимости от языка
    const contentId = isEnglish ? 'fullImpressumEn' : 'fullImpressumDe';
    const fullImpressum = document.getElementById(contentId);
    
    if (!fullImpressum) {
        console.error(`Element with id "${contentId}" not found`);
        return;
    }
    
    if (!button) {
        console.error('Button with onclick="toggleImpressum()" not found');
        return;
    }
    
    // Определяем тексты кнопок
    const buttonTexts = {
        en: {
            show: 'Show Full Legal Notice',
            hide: 'Hide Legal Notice'
        },
        de: {
            show: 'Vollständiges Impressum anzeigen',
            hide: 'Impressum ausblenden'
        }
    };
    
    if (!fullImpressum.classList.contains('show')) {
        fullImpressum.classList.add('show');
        button.textContent = buttonTexts[lang].hide;
        console.log('Showing Impressum'); // Debug log
    } else {
        fullImpressum.classList.remove('show');
        button.textContent = buttonTexts[lang].show;
        console.log('Hiding Impressum'); // Debug log
    }
}

// Function to toggle Datenschutz visibility
function toggleDatenschutz() {
    console.log('toggleDatenschutz called'); // Debug log
    const fullDatenschutz = document.getElementById('fullDatenschutz');
    const button = document.querySelector('button[onclick="toggleDatenschutz()"]');
    
    if (!fullDatenschutz) {
        console.error('Element with id "fullDatenschutz" not found');
        return;
    }
    
    if (!button) {
        console.error('Button with onclick="toggleDatenschutz()" not found');
        return;
    }
    
    if (!fullDatenschutz.classList.contains('show')) {
        fullDatenschutz.classList.add('show');
        button.textContent = 'Datenschutzerklärung ausblenden';
        console.log('Showing Datenschutz'); // Debug log
    } else {
        fullDatenschutz.classList.remove('show');
        button.textContent = 'Vollständige Datenschutzerklärung anzeigen';
        console.log('Hiding Datenschutz'); // Debug log
    }
}

// Function to show buttons
function showButtons() {
    const buttons = ['langBtn', 'phoneBtn', 'emailBtn', 'whatsappBtn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.style.opacity = '1';
        }
    });
}

// Function to hide buttons
function hideButtons() {
    const buttons = ['langBtn', 'phoneBtn', 'emailBtn', 'whatsappBtn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.style.transition = 'none';
            btn.style.opacity = '0';
            btn.offsetHeight; // Force reflow
            btn.style.transition = '';
        }
    });
}

// Handle scroll events
let timeout;
window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    hideButtons();
    timeout = setTimeout(showButtons, 750);
}); 