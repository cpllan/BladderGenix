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

    // Header Actions Functionality
    
    // Search Toggle
    const searchIcons = [document.getElementById('searchIcon'), document.getElementById('mobileSearchIcon')];
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    searchIcons.forEach(icon => {
        if (icon && searchOverlay) {
            icon.addEventListener('click', () => {
                searchOverlay.classList.add('active');
                if (typeof toggleMenu === 'function') toggleMenu(false); // Close mobile menu
                setTimeout(() => searchInput.focus(), 300);
            });
        }
    });

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Cart Toggle
    const cartIcons = [document.getElementById('cartIcon'), document.getElementById('mobileCartIcon')];
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    function toggleCart(show) {
        if (show) {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (typeof toggleMenu === 'function') toggleMenu(false); // Close mobile menu
        } else {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    cartIcons.forEach(icon => {
        if (icon) {
            icon.addEventListener('click', () => toggleCart(true));
        }
    });

    if (closeCart) closeCart.addEventListener('click', () => toggleCart(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

    // Profile Toggle
    const profileIcons = [document.getElementById('profileIcon'), document.getElementById('mobileProfileIcon')];
    const profileDropdown = document.getElementById('profileDropdown');

    profileIcons.forEach(icon => {
        if (icon && profileDropdown) {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
                if (currencyDropdown) currencyDropdown.classList.remove('active');
                if (typeof toggleMenu === 'function') toggleMenu(false); // Close mobile menu
            });
        }
    });

    // Currency Selector
    const currencySelectors = [document.getElementById('currencySelector'), document.getElementById('mobileCurrencySelector')];
    const currencyDropdown = document.getElementById('currencyDropdown');
    const currentCurrencyTexts = [document.getElementById('currentCurrencyText'), document.getElementById('mobileCurrentCurrencyText')];
    const currentCurrencyFlags = [document.getElementById('currentCurrencyFlag'), document.getElementById('mobileCurrentCurrencyFlag')];
    const currencyOptions = document.querySelectorAll('.currency-option');

    currencySelectors.forEach(selector => {
        if (selector && currencyDropdown) {
            selector.addEventListener('click', (e) => {
                e.stopPropagation();
                currencyDropdown.classList.toggle('active');
                selector.classList.toggle('active');
                if (profileDropdown) profileDropdown.classList.remove('active');
                // Don't close mobile menu here because the dropdown is usually inside or needs visibility
            });
        }
    });

    currencyOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const currency = option.getAttribute('data-currency');
            const flag = option.getAttribute('data-flag');
            
            currentCurrencyTexts.forEach(txt => { if (txt) txt.textContent = currency; });
            currentCurrencyFlags.forEach(img => { if (img) img.src = flag; });
            
            currencyDropdown.classList.remove('active');
            currencySelectors.forEach(s => { if (s) s.classList.remove('active'); });
            if (typeof toggleMenu === 'function') toggleMenu(false); // Close mobile menu
            
            updatePrices(currency);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (profileDropdown) profileDropdown.classList.remove('active');
        if (currencyDropdown) {
            currencyDropdown.classList.remove('active');
            currencySelectors.forEach(s => { if (s) s.classList.remove('active'); });
        }
    });

    // Simple Cart Simulation
    const ctaButtons = document.querySelectorAll('.cta-button');
    let cartCount = 0;
    const cartCountBadge = document.querySelector('.cart-count');
    const cartCountDisplay = document.querySelector('.cart-count-display');

    ctaButtons.forEach(btn => {
        // Find if it's the product buy button
        if (btn.innerText.includes('GET YOUR BLADDERGENIX') || btn.innerText.includes('Add to Cart')) {
            btn.addEventListener('click', () => {
                cartCount++;
                if (cartCountBadge) cartCountBadge.textContent = cartCount;
                if (cartCountDisplay) cartCountDisplay.textContent = cartCount;
                
                toggleCart(true);
                
                const cartItems = document.getElementById('cartItems');
                if (cartCount === 1) {
                    cartItems.innerHTML = `
                        <div class="cart-item flex gap-md items-center" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-300);">
                            <img src="assets/imgMainProductImage.png" alt="" width="80" height="80" style="border-radius: 8px; background: var(--off-white);">
                            <div class="flex-1">
                                <h4 class="font-bold">BladderGenix</h4>
                                <p class="text-sm color-gray-500">6 Bottles - One-time</p>
                                <div class="flex justify-between items-center" style="margin-top: 10px;">
                                    <span class="font-bold">$32.83</span>
                                    <div class="flex items-center gap-sm">
                                        <button style="width: 24px; height: 24px; border: 1px solid var(--gray-300); background: none; border-radius: 4px;">-</button>
                                        <span>1</span>
                                        <button style="width: 24px; height: 24px; border: 1px solid var(--gray-300); background: none; border-radius: 4px;">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    document.getElementById('cartSubtotal').textContent = '$32.83';
                }
            });
        }
    });

    function updatePrices(currency) {
        const symbols = { 'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'CA$' };
        const rates = { 'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'CAD': 1.36 };
        
        const symbol = symbols[currency] || '$';
        const rate = rates[currency] || 1;
        
        const basePrice = 32.83;
        const salePrices = document.querySelectorAll('.sale-price');
        salePrices.forEach(p => {
            const converted = (basePrice * rate).toFixed(2);
            p.textContent = `${symbol}${converted} / ea`;
        });

        // Update old price too
        const oldPrices = document.querySelectorAll('.old-price');
        const baseOldPrice = 419.70;
        oldPrices.forEach(p => {
            const converted = (baseOldPrice * rate).toFixed(2);
            p.textContent = `${symbol}${converted}`;
        });
    }
});
