/**
 * LUX PERFUME - فروشگاه عطر و ادکلن
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize Hero Slider
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Initialize Testimonial Slider
    const testimonialSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    // Initialize Brand Slider
    const brandSlider = new Swiper('.brands-slider', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Mobile Dropdown Toggle
    const mobileDropdownToggle = document.querySelectorAll('.mobile-nav-item.has-dropdown .mobile-nav-link');
    
    mobileDropdownToggle.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Search Popup Toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchPopup = document.querySelector('.search-popup');
    const searchClose = document.querySelector('.search-close');
    
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(function() {
            document.querySelector('.search-input').focus();
        }, 100);
    });
    
    searchClose.addEventListener('click', function() {
        searchPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const quickViewClose = document.querySelector('.quick-view-close');
    
    quickViewBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    quickViewClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Quantity Input
    const quantityDown = document.querySelectorAll('.quantity-down');
    const quantityUp = document.querySelectorAll('.quantity-up');
    
    quantityDown.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                value--;
            }
            input.value = value;
        });
    });
    
    quantityUp.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            value++;
            input.value = value;
        });
    });

    // Product Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products (in a real project, this would be more complex)
            console.log('Filtering products by:', filterValue);
        });
    });

    // Sticky Header
    const header = document.querySelector('.main-header');
    const navContainer = document.querySelector('.nav-container');
    let headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerHeight) {
            navContainer.classList.add('sticky');
        } else {
            navContainer.classList.remove('sticky');
        }
    });

    // Add to Cart Animation
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product image
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image img');
            
            // Create flying image
            const flyingImage = productImage.cloneNode();
            const cartIcon = document.querySelector('.header-action.cart-icon');
            
            // Set styles for flying image
            flyingImage.style.position = 'absolute';
            flyingImage.style.height = '50px';
            flyingImage.style.width = 'auto';
            flyingImage.style.zIndex = '100';
            flyingImage.style.transition = 'all 1s ease';
            
            // Get positions
            const imgRect = productImage.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();
            
            // Set initial position
            flyingImage.style.top = imgRect.top + 'px';
            flyingImage.style.left = imgRect.left + 'px';
            
            // Append to body
            document.body.appendChild(flyingImage);
            
            // Animate to cart
            setTimeout(function() {
                flyingImage.style.top = cartRect.top + 'px';
                flyingImage.style.left = cartRect.left + 'px';
                flyingImage.style.opacity = '0.5';
                flyingImage.style.transform = 'scale(0.1)';
            }, 10);
            
            // Remove flying image and update cart count
            setTimeout(function() {
                document.body.removeChild(flyingImage);
                
                // Update cart count
                const cartCount = cartIcon.querySelector('.header-action-count');
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Animate cart icon
                cartIcon.classList.add('pulse');
                setTimeout(function() {
                    cartIcon.classList.remove('pulse');
                }, 500);
            }, 1000);
        });
    });

    // Countdown Timer
    function updateCountdown() {
        const countdownElements = document.querySelectorAll('.countdown');
        
        countdownElements.forEach(function(element) {
            const endTime = new Date(element.getAttribute('data-end-time')).getTime();
            const now = new Date().getTime();
            const distance = endTime - now;
            
            if (distance < 0) {
                element.innerHTML = '<div class="countdown-expired">پیشنهاد به پایان رسیده است</div>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            element.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">روز</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">ساعت</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">دقیقه</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">ثانیه</span>
                </div>
            `;
        });
    }
    
    // Update countdown every second
    if (document.querySelector('.countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Product Image Gallery
    const productThumbs = document.querySelectorAll('.product-thumb');
    const productMainImage = document.querySelector('.product-main-image img');
    
    if (productThumbs.length > 0 && productMainImage) {
        productThumbs.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbs
                productThumbs.forEach(function(t) {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked thumb
                this.classList.add('active');
                
                // Update main image
                const imgSrc = this.querySelector('img').getAttribute('src');
                productMainImage.setAttribute('src', imgSrc);
            });
        });
    }

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showFormError(emailInput, 'لطفاً ایمیل خود را وارد کنید');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'لطفاً یک ایمیل معتبر وارد کنید');
                return;
            }
            
            // If validation passes, submit the form (in a real project, this would be an AJAX request)
            showFormSuccess(this, 'با تشکر! ایمیل شما با موفقیت ثبت شد');
            this.reset();
        });
    }
    
    function showFormError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.form-error') || document.createElement('div');
        
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.form-error')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
        
        // Remove error after 3 seconds
        setTimeout(function() {
            if (errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
                input.classList.remove('error');
            }
        }, 3000);
    }
    
    function showFormSuccess(form, message) {
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.textContent = message;
        
        form.appendChild(successElement);
        
        // Remove success message after 3 seconds
        setTimeout(function() {
            if (successElement.parentElement) {
                successElement.parentElement.removeChild(successElement);
            }
        }, 3000);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});



