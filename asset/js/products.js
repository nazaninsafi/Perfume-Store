document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Search Bar Toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    
    searchBtn.addEventListener('click', function() {
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.querySelector('input').focus();
        }
    });
    
    // Price Range Slider
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const thumbLeft = document.querySelector('.thumb.left');
    const thumbRight = document.querySelector('.thumb.right');
    const range = document.querySelector('.range');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    
    function setLeftValue() {
        const _this = rangeMin;
        const min = parseInt(_this.min);
        const max = parseInt(_this.max);
        
        _this.value = Math.min(parseInt(_this.value), parseInt(rangeMax.value) - 500000);
        
        const percent = ((_this.value - min) / (max - min)) * 100;
        
        thumbLeft.style.left = percent + '%';
        range.style.left = percent + '%';
        
        // Format price with commas
        priceMin.textContent = formatPrice(parseInt(_this.value)) + ' تومان';
    }
    
    function setRightValue() {
        const _this = rangeMax;
        const min = parseInt(_this.min);
        const max = parseInt(_this.max);
        
        _this.value = Math.max(parseInt(_this.value), parseInt(rangeMin.value) + 500000);
        
        const percent = ((_this.value - min) / (max - min)) * 100;
        
        thumbRight.style.right = (100 - percent) + '%';
        range.style.right = (100 - percent) + '%';
        
        // Format price with commas
        priceMax.textContent = formatPrice(parseInt(_this.value)) + ' تومان';
    }
    
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    rangeMin.addEventListener('input', setLeftValue);
    rangeMax.addEventListener('input', setRightValue);
    
    // Initialize range slider
    setLeftValue();
    setRightValue();
    
    // View Toggle (Grid/List)
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsContainer = document.getElementById('products-container');
    
    gridViewBtn.addEventListener('click', function() {
        productsContainer.className = 'grid-view-container';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        productsContainer.className = 'list-view-container';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    // Sort Products
    const sortOptions = document.getElementById('sort-options');
    
    sortOptions.addEventListener('change', function() {
        const sortValue = this.value;
        sortProducts(sortValue);
    });
    
        function sortProducts(sortValue) {
        const products = Array.from(document.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            if (sortValue === 'price-low') {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                return priceA - priceB;
            } else if (sortValue === 'price-high') {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                return priceB - priceA;
            } else if (sortValue === 'newest') {
                const dateA = new Date(a.dataset.date);
                const dateB = new Date(b.dataset.date);
                return dateB - dateA;
            } else if (sortValue === 'popular') {
                const ratingA = parseFloat(a.dataset.rating);
                const ratingB = parseFloat(b.dataset.rating);
                return ratingB - ratingA;
            }
            return 0;
        });
        
        // Clear container and append sorted products
        productsContainer.innerHTML = '';
        products.forEach(product => {
            productsContainer.appendChild(product);
        });
    }
    
    // Quick View Modal
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContainer = document.querySelector('.modal-container');
    
    function openQuickViewModal(product) {
        // Set modal content based on product data
        document.getElementById('modalMainImage').src = product.image;
        document.getElementById('modalProductTitle').textContent = product.title;
        document.getElementById('modalProductBrand').textContent = product.brand;
        document.getElementById('modalProductPrice').textContent = formatPrice(product.price) + ' تومان';
        
        if (product.oldPrice) {
            document.getElementById('modalProductOldPrice').textContent = formatPrice(product.oldPrice) + ' تومان';
            document.getElementById('modalProductOldPrice').classList.remove('hidden');
        } else {
            document.getElementById('modalProductOldPrice').classList.add('hidden');
        }
        
        document.getElementById('modalProductDescription').textContent = product.description;
        
        // Show modal
        quickViewModal.classList.remove('hidden');
        setTimeout(() => {
            modalContainer.classList.add('active');
        }, 10);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    function closeQuickViewModal() {
        modalContainer.classList.remove('active');
        setTimeout(() => {
            quickViewModal.classList.add('hidden');
        }, 300);
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }
    
    closeModal.addEventListener('click', closeQuickViewModal);
    modalOverlay.addEventListener('click', closeQuickViewModal);
    
    // Volume Option Selection
    const volumeOptions = document.querySelectorAll('.volume-option');
    
    volumeOptions.forEach(option => {
        option.addEventListener('click', function() {
            volumeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity Selector
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            const currentValue = parseInt(input.value);
            
            if (this.textContent === '+') {
                input.value = currentValue + 1;
            } else if (this.textContent === '-' && currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filter Reset
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    resetFiltersBtn.addEventListener('click', function() {
        // Reset checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset price range
        rangeMin.value = rangeMin.min;
        rangeMax.value = rangeMax.max;
        setLeftValue();
        setRightValue();
    });
    
    // Load Products Data
    loadProducts();
    
    function loadProducts() {
        // Sample product data - in a real application, this would come from an API
        const products = [
            {
                id: 1,
                title: 'عطر زنانه شنل چنس',
                brand: 'Chanel Chance',
                price: 2850000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/ec9a962187e1f82cc47e7a148ef99ec1c6fd024d_1656423336.jpg',
                category: 'women',
                volume: '100ml',
                rating: 4.8,
                date: '2023-10-15',
                description: 'عطر زنانه شنل چنس با رایحه‌ای گلدار و میوه‌ای، انتخابی ایده‌آل برای استفاده روزانه است. این عطر با ماندگاری بالا و پخش بوی مناسب، حس تازگی و شادابی را به شما هدیه می‌دهد.',
                isNew: true,
                discount: null
            },
            {
                id: 2,
                title: 'عطر مردانه دیور ساواج',
                brand: 'Dior Sauvage',
                price: 3150000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/111964462.jpg',
                category: 'men',
                volume: '100ml',
                rating: 4.9,
                date: '2023-09-20',
                description: 'عطر مردانه دیور ساواج با رایحه‌ای تند و خنک، مناسب برای آقایان با اعتماد به نفس بالا است. این عطر با ترکیبی از نت‌های مرکبات و چوب، انتخابی مناسب برای استفاده روزانه و مجالس رسمی است.',
                isNew: false,
                discount: null
            },
            {
                id: 3,
                title: 'عطر زنانه گوچی بلوم',
                brand: 'Gucci Bloom',
                price: 2550000,
                oldPrice: 3000000,
                image: 'https://dkstatics-public.digikala.com/digikala-products/121566614.jpg',
                category: 'women',
                volume: '50ml',
                rating: 4.6,
                date: '2023-08-10',
                description: 'عطر زنانه گوچی بلوم با رایحه‌ای گلدار و شیرین، احساس طراوت و شادابی را به شما منتقل می‌کند. این عطر با ماندگاری بالا، مناسب برای استفاده در تمام فصول سال است.',
                isNew: false,
                discount: 15
            },
            {
                id: 4,
                title: 'عطر مردانه ورساچه اروس',
                brand: 'Versace Eros',
                price: 2950000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/114304488.jpg',
                category: 'men',
                volume: '100ml',
                rating: 4.7,
                date: '2023-11-05',
                description: 'عطر مردانه ورساچه اروس با رایحه‌ای شیرین و گرم، انتخابی مناسب برای آقایان جوان است. این عطر با ماندگاری بسیار بالا و پخش بوی عالی، برای استفاده در مهمانی‌ها و مجالس شبانه ایده‌آل است.',
                isNew: true,
                discount: null
            },
            {
                id: 5,
                title: 'عطر یونیسکس تام فورد بلک ارکید',
                brand: 'Tom Ford Black Orchid',
                price: 4250000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/119564436.jpg',
                category: 'unisex',
                volume: '100ml',
                rating: 4.9,
                date: '2023-07-25',
                description: 'عطر یونیسکس تام فورد بلک ارکید با رایحه‌ای شرقی و گرم، مناسب برای استفاده در فصول سرد سال است. این عطر لوکس با ماندگاری فوق‌العاده، انتخابی ایده‌آل برای افراد خاص‌پسند است.',
                isNew: false,
                discount: null
            },
            {
                id: 6,
                title: 'عطر زنانه لانکوم لا ویه است بل',
                brand: 'Lancome La Vie Est Belle',
                price: 3450000,
                oldPrice: 3800000,
                image: 'https://dkstatics-public.digikala.com/digikala-products/110534452.jpg',
                category: 'women',
                volume: '75ml',
                rating: 4.8,
                date: '2023-10-01',
                description: 'عطر زنانه لانکوم لا ویه است بل با رایحه‌ای شیرین و میوه‌ای، حس شادی و نشاط را به شما هدیه می‌دهد. این عطر با ماندگاری بالا، مناسب برای استفاده در مهمانی‌ها و مجالس است.',
                isNew: false,
                discount: 10
            },
            {
                id: 7,
                title: 'عطر مردانه کرید اونتوس',
                brand: 'Creed Aventus',
                price: 5850000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/4321277.jpg',
                category: 'men',
                volume: '100ml',
                rating: 5.0,
                date: '2023-11-10',
                description: 'عطر مردانه کرید اونتوس با رایحه‌ای میوه‌ای و چوبی، نماد قدرت و موفقیت است. این عطر لوکس با ماندگاری فوق‌العاده و پخش بوی عالی، انتخابی بی‌نظیر برای آقایان موفق و با اعتماد به نفس است.',
                isNew: true,
                discount: null
            },
            {
                id: 8,
                title: 'عطر زنانه مارک جاکوبز دیزی',
                brand: 'Marc Jacobs Daisy',
                price: 2750000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/110551836.jpg',
                category: 'women',
                volume: '50ml',
                rating: 4.5,
                date: '2023-09-15',
                description: 'عطر زنانه مارک جاکوبز دیزی با رایحه‌ای گلدار و میوه‌ای، حس طراوت و شادابی را به شما منتقل می‌کند. این عطر با طراحی شیشه زیبا و منحصر به فرد، هدیه‌ای ایده‌آل برای بانوان جوان است.',
                isNew: false,
                discount: null
            },
            {
                id: 9,
                title: 'عطر یونیسکس بایردو جیپسی واتر',
                brand: 'Byredo Gypsy Water',
                price: 4950000,
                oldPrice: null,
                image: 'https://dkstatics-public.digikala.com/digikala-products/120552296.jpg',
                category: 'unisex',
                volume: '100ml',
                rating: 4.7,
                date: '2023-08-20',
                description: 'عطر یونیسکس بایردو جیپسی واتر با رایحه‌ای چوبی و دودی، انتخابی خاص و متفاوت است. این عطر نیش مارکت با ماندگاری مناسب، برای افرادی که به دنبال رایحه‌ای منحصر به فرد هستند، ایده‌آل است.',
                isNew: false,
                discount: null
            }
        ];
        
        // Render products
        renderProducts(products);
        
        // Add event listeners for quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = parseInt(this.dataset.id);
                const product = products.find(p => p.id === productId);
                if (product) {
                    openQuickViewModal(product);
                }
            });
        });
    }
    
    function renderProducts(products) {
        let html = '';
        
        products.forEach(product => {
            html += `
                <div class="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                     data-id="${product.id}"
                     data-price="${product.price}"
                     data-rating="${product.rating}"
                     data-date="${product.date}"
		                             data-category="${product.category}">
                    <div class="relative">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover">
                        ${product.isNew ? '<div class="absolute top-2 right-2 bg-gold text-xs text-gray-900 px-2 py-1 rounded">جدید</div>' : ''}
                        ${product.discount ? `<div class="absolute top-2 right-2 bg-red-500 text-xs text-white px-2 py-1 rounded">${product.discount}٪ تخفیف</div>` : ''}
                        <button class="quick-view-btn absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-gold transition-colors" data-id="${product.id}">
                            مشاهده سریع
                        </button>
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="text-lg font-medium">${product.title}</h3>
                                <p class="text-gray-500 text-sm">${product.brand}</p>
                            </div>
                            <div class="flex text-gold text-sm">
                                ${generateStarRating(product.rating)}
                            </div>
                        </div>
                        <p class="product-description hidden text-gray-600 text-sm mb-4">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-900 font-bold">${formatPrice(product.price)} تومان</span>
                                ${product.oldPrice ? `<span class="text-gray-500 line-through text-sm mr-2">${formatPrice(product.oldPrice)}</span>` : ''}
                            </div>
                            <div class="flex space-x-2 space-x-reverse">
                                <button class="text-gray-400 hover:text-gold transition-colors">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="text-gray-400 hover:text-gold transition-colors">
                                    <i class="fas fa-shopping-bag"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        productsContainer.innerHTML = html;
    }
    
    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && halfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
    
    // Apply Filters
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    applyFiltersBtn.addEventListener('click', function() {
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"][value="women"], input[type="checkbox"][value="men"], input[type="checkbox"][value="unisex"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get selected brands
        const selectedBrands = Array.from(document.querySelectorAll('input[type="checkbox"][value="chanel"], input[type="checkbox"][value="dior"], input[type="checkbox"][value="tomford"], input[type="checkbox"][value="gucci"], input[type="checkbox"][value="versace"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get price range
        const minPrice = parseInt(rangeMin.value);
        const maxPrice = parseInt(rangeMax.value);
        
        // Get selected volumes
        const selectedVolumes = Array.from(document.querySelectorAll('input[type="checkbox"][value="30ml"], input[type="checkbox"][value="50ml"], input[type="checkbox"][value="100ml"], input[type="checkbox"][value="200ml"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Get selected scent types
        const selectedScents = Array.from(document.querySelectorAll('input[type="checkbox"][value="floral"], input[type="checkbox"][value="woody"], input[type="checkbox"][value="oriental"], input[type="checkbox"][value="fresh"], input[type="checkbox"][value="citrus"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Filter products
        filterProducts(selectedCategories, selectedBrands, minPrice, maxPrice, selectedVolumes, selectedScents);
    });
    
    function filterProducts(categories, brands, minPrice, maxPrice, volumes, scents) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const price = parseInt(card.dataset.price);
            const category = card.dataset.category;
            
            // Check if product matches all selected filters
            const matchesCategory = categories.length === 0 || categories.includes(category);
            const matchesPrice = price >= minPrice && price <= maxPrice;
            
            // For demo purposes, we're only implementing category and price filters
            // In a real application, you would check all filter criteria
            
            if (matchesCategory && matchesPrice) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Product Image Thumbnails in Modal
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    
    thumbnailItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnailItems.forEach(thumb => thumb.classList.remove('border-gold'));
            
            // Add active class to clicked thumbnail
            this.classList.add('border-gold');
            
            // Update main image
            const imgSrc = this.querySelector('img').src;
            document.getElementById('modalMainImage').src = imgSrc;
        });
    });
});
