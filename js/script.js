
 // Disable browser automatic scroll restoration to ensure refreshing always opens the first landing page
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Reset scroll to top before unloading
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Reset scroll to top immediately on load
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    console.log("Job Portal landing page loaded successfully.");

    // Clear any hash in the URL to prevent automatic jumping on reload
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Smooth scroll for in-page navigation links without modifying URL hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // FAQ Accordion Toggle Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const btn = otherItem.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                questionBtn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
