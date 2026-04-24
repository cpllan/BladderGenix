document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail Switching
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            thumb.classList.add('active');
            // Update main image src
            const newSrc = thumb.querySelector('img').src;
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.style.opacity = '1';
            }, 200);
        });
    });

    // Subscription Option Selection
    const subOptions = document.querySelectorAll('.sub-option');
    subOptions.forEach(option => {
        option.addEventListener('click', () => {
            subOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            const radio = option.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Purchase Type Selection
    const purchaseTypes = document.querySelectorAll('.purchase-type');
    purchaseTypes.forEach(type => {
        type.addEventListener('click', () => {
            purchaseTypes.forEach(t => {
                t.style.background = 'var(--white)';
            });
            type.style.background = '#d7e1e4';
            const radio = type.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Toggle plus/minus icon if needed
            faqItems.forEach(i => {
                const icon = i.querySelector('.faq-question img');
                if (i.classList.contains('active')) {
                    icon.src = 'assets/imgMinus.svg';
                } else {
                    icon.src = 'assets/imgUPlus.svg';
                }
            });
        });
    });

    // Basic Animation for main image
    mainImage.style.transition = 'opacity 0.3s ease';

    // Breakthrough Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if(targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
