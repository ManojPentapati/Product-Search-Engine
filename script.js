// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const productContainer = document.getElementById('productContainer');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

// Events
searchButton.addEventListener('click', searchProduct);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchProduct();
});

function searchProduct() {
  const query = searchInput.value.trim();

  if (!query) {
    showError('Please enter a product name');
    return;
  }

  hideError();
  showLoading();

  // Apply spell correction automatically
  const correctedQuery = correctSpelling(query);
  
  // Update the search input with the corrected query
  searchInput.value = correctedQuery;

  // Simulate search delay for UX
  setTimeout(() => {
    displayProduct(correctedQuery);
  }, 800);
}

function displayProduct(query) {
  hideLoading();
  productContainer.innerHTML = '';

  const encodedQuery = encodeURIComponent(query);

  const links = {
    amazon: `https://www.amazon.in/s?k=${encodedQuery}`,
    flipkart: `https://www.flipkart.com/search?q=${encodedQuery}`,
    meesho: `https://www.meesho.com/search?q=${encodedQuery}`,
    myntra: `https://www.myntra.com/search?q=${encodedQuery}`,
    ajio: `https://www.ajio.com/search/?text=${encodedQuery}`,
    googleShopping: `https://www.google.com/search?tbm=shop&q=${encodedQuery}`,
    buyhatke: `https://buyhatke.com/?q=${encodedQuery}`,
    mysmartprice: `https://www.mysmartprice.com/search?q=${encodedQuery}`
  };

  const card = document.createElement('div');
  card.className = 'product-card';

  // Generate sample product information based on the query
  const productInfo = generateProductInfo(query);

  card.innerHTML = `
    <div class="product-image">
      <img src="" alt="${query}" id="productImage">
      <div class="image-loader" id="imageLoader">Loading image...</div>
    </div>

    <div class="product-details">
      <h2 class="product-name">${query}</h2>
      <span class="product-category">${productInfo.category}</span>
      <div class="product-price">Check latest prices below</div>

      <div class="platform-buttons">
        <div class="platform-group">
          <h3 class="platform-group-title">Buy Directly</h3>
          <div class="horizontal-scroll-container">
            <button class="scroll-button left" id="scrollLeftDirect">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="scroll-wrapper" id="directScrollWrapper">
              <div class="platform-item-container">
                <div class="platform-item platform-item-prominent amazon">
                  <div class="platform-header">
                    <img src="logos/amazon.svg" alt="Amazon" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Amazon</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.amazon}" target="_blank" class="platform-button btn-amazon open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-amazon copy-btn copy-btn-large" data-url="${links.amazon}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent flipkart">
                  <div class="platform-header">
                    <img src="logos/flipkart.svg" alt="Flipkart" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Flipkart</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.flipkart}" target="_blank" class="platform-button btn-flipkart open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-flipkart copy-btn copy-btn-large" data-url="${links.flipkart}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent meesho">
                  <div class="platform-header">
                    <img src="logos/meesho.svg" alt="Meesho" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Meesho</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.meesho}" target="_blank" class="platform-button btn-meesho open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-meesho copy-btn copy-btn-large" data-url="${links.meesho}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent myntra">
                  <div class="platform-header">
                    <img src="logos/myntra.svg" alt="Myntra" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Myntra</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.myntra}" target="_blank" class="platform-button btn-myntra open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-myntra copy-btn copy-btn-large" data-url="${links.myntra}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent ajio">
                  <div class="platform-header">
                    <img src="logos/ajio.svg" alt="Ajio" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Ajio</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.ajio}" target="_blank" class="platform-button btn-ajio open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-ajio copy-btn copy-btn-large" data-url="${links.ajio}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="scroll-button right" id="scrollRightDirect">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div class="platform-group">
          <h3 class="platform-group-title">Compare Prices</h3>
          <div class="horizontal-scroll-container">
            <button class="scroll-button left" id="scrollLeftCompare">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="scroll-wrapper" id="compareScrollWrapper">
              <div class="platform-item-container">
                <div class="platform-item platform-item-prominent buyhatke">
                  <div class="platform-header">
                    <img src="logos/buyhatke.svg" alt="BuyHatke" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">BuyHatke</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.buyhatke}" target="_blank" class="platform-button btn-buyhatke open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-buyhatke copy-btn copy-btn-large" data-url="${links.buyhatke}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent mysmartprice">
                  <div class="platform-header">
                    <img src="logos/mysmartprice.svg" alt="MySmartPrice" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">MySmartPrice</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.mysmartprice}" target="_blank" class="platform-button btn-mysmartprice open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-mysmartprice copy-btn copy-btn-large" data-url="${links.mysmartprice}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
                
                <div class="platform-item platform-item-prominent google-shopping">
                  <div class="platform-header">
                    <img src="logos/google-shopping.svg" alt="Google Shopping" class="platform-logo platform-logo-large"> 
                    <span class="platform-name platform-name-large">Google Shopping</span>
                  </div>
                  <div class="platform-actions">
                    <a href="${links.googleShopping}" target="_blank" class="platform-button btn-google-shopping open-btn open-btn-large">
                      <i class="fas fa-external-link-alt"></i> Open
                    </a>
                    <button class="platform-button btn-google-shopping copy-btn copy-btn-large" data-url="${links.googleShopping}">
                      <i class="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="scroll-button right" id="scrollRightCompare">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div class="download-section">
          <button id="downloadLinksBtn" class="platform-button btn-download">
            <i class="fas fa-download"></i> Download all links
          </button>
        </div>
      </div>
    </div>
  `;

  productContainer.appendChild(card);
  productContainer.classList.remove('hidden');
  
  // Load product image
  setTimeout(() => {
    loadProductImage(query);
  }, 100);
  
  // Add event listeners for copy buttons
  const copyButtons = card.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      copyToClipboard(url, this);
    });
  });
  
  // Add event listener for download button
  const downloadButton = card.querySelector('#downloadLinksBtn');
  if (downloadButton) {
    downloadButton.addEventListener('click', function() {
      downloadAllLinks(links);
    });
  }
  
  // Add scroll functionality
  addScrollFunctionality();
  
  // Use MutationObserver to detect when elements are added to the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Re-check scroll functionality when DOM changes
        setTimeout(addScrollFunctionality, 50);
      }
    });
  });
  
  // Observe changes to the product container
  observer.observe(productContainer, { childList: true, subtree: true });
  
  // Also trigger scroll functionality on different events to ensure it works at all zoom levels
  window.addEventListener('load', () => {
    setTimeout(addScrollFunctionality, 100);
    setTimeout(addScrollFunctionality, 500);
  });
  
  // Trigger on visibility change (helps with zoom level changes)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(addScrollFunctionality, 100);
    }
  });
}

// Function to add scroll functionality
function addScrollFunctionality() {
  // Small delay to ensure rendering
  setTimeout(() => {
    // Direct purchase scroll buttons
    const directScrollWrapper = document.getElementById('directScrollWrapper');
    const scrollLeftDirect = document.getElementById('scrollLeftDirect');
    const scrollRightDirect = document.getElementById('scrollRightDirect');
    
    if (scrollLeftDirect && scrollRightDirect && directScrollWrapper) {
      // Check if scrolling is needed and show/hide buttons accordingly
      function updateDirectScrollButtons() {
        // Ensure elements are rendered before checking dimensions
        if (directScrollWrapper.scrollWidth === 0 || directScrollWrapper.clientWidth === 0) {
          // Try again after a short delay
          setTimeout(updateDirectScrollButtons, 50);
          return;
        }
        
        const isOverflowing = directScrollWrapper.scrollWidth > directScrollWrapper.clientWidth;
        scrollLeftDirect.style.display = isOverflowing ? 'flex' : 'none';
        scrollRightDirect.style.display = isOverflowing ? 'flex' : 'none';
        
        // Update button states based on scroll position
        scrollLeftDirect.disabled = directScrollWrapper.scrollLeft <= 0;
        scrollRightDirect.disabled = directScrollWrapper.scrollLeft >= directScrollWrapper.scrollWidth - directScrollWrapper.clientWidth - 1;
      }
      
      // Initial check
      updateDirectScrollButtons();
      
      // Update on scroll
      directScrollWrapper.addEventListener('scroll', updateDirectScrollButtons);
      
      // Update on window resize with debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateDirectScrollButtons, 100);
      });
      
      // Also check after short delays to ensure elements are rendered
      setTimeout(updateDirectScrollButtons, 100);
      setTimeout(updateDirectScrollButtons, 500);
      setTimeout(updateDirectScrollButtons, 1000);
      
      scrollLeftDirect.addEventListener('click', () => {
        directScrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
      });
      
      scrollRightDirect.addEventListener('click', () => {
        directScrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
    
    // Compare prices scroll buttons
    const compareScrollWrapper = document.getElementById('compareScrollWrapper');
    const scrollLeftCompare = document.getElementById('scrollLeftCompare');
    const scrollRightCompare = document.getElementById('scrollRightCompare');
    
    if (scrollLeftCompare && scrollRightCompare && compareScrollWrapper) {
      // Check if scrolling is needed and show/hide buttons accordingly
      function updateCompareScrollButtons() {
        // Ensure elements are rendered before checking dimensions
        if (compareScrollWrapper.scrollWidth === 0 || compareScrollWrapper.clientWidth === 0) {
          // Try again after a short delay
          setTimeout(updateCompareScrollButtons, 50);
          return;
        }
        
        const isOverflowing = compareScrollWrapper.scrollWidth > compareScrollWrapper.clientWidth;
        scrollLeftCompare.style.display = isOverflowing ? 'flex' : 'none';
        scrollRightCompare.style.display = isOverflowing ? 'flex' : 'none';
        
        // Update button states based on scroll position
        scrollLeftCompare.disabled = compareScrollWrapper.scrollLeft <= 0;
        scrollRightCompare.disabled = compareScrollWrapper.scrollLeft >= compareScrollWrapper.scrollWidth - compareScrollWrapper.clientWidth - 1;
      }
      
      // Initial check
      updateCompareScrollButtons();
      
      // Update on scroll
      compareScrollWrapper.addEventListener('scroll', updateCompareScrollButtons);
      
      // Update on window resize with debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCompareScrollButtons, 100);
      });
      
      // Also check after short delays to ensure elements are rendered
      setTimeout(updateCompareScrollButtons, 100);
      setTimeout(updateCompareScrollButtons, 500);
      setTimeout(updateCompareScrollButtons, 1000);
      
      scrollLeftCompare.addEventListener('click', () => {
        compareScrollWrapper.scrollBy({ left: -300, behavior: 'smooth' });
      });
      
      scrollRightCompare.addEventListener('click', () => {
        compareScrollWrapper.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  }, 10); // Small initial delay to ensure DOM is ready
}

// Function to load product image from Unsplash API
function loadProductImage(query) {
  const imageElement = document.getElementById('productImage');
  const loaderElement = document.getElementById('imageLoader');
  
  if (!imageElement || !loaderElement) return;
  
  // Show loader
  loaderElement.style.display = 'block';
  imageElement.style.display = 'none';
  
  // Clean the query for better image search results
  const cleanedQuery = query.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
  
  // Use a more reliable approach with Pexels API as alternative
  // For now, we'll use a direct approach with a timeout-based loading
  const imageUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(cleanedQuery)},product`;
  
  // Create a new image element to preload the image
  const img = new Image();
  
  // Set a reasonable timeout
  const timeout = setTimeout(() => {
    if (!img.complete) {
      img.src = ''; // Cancel the request
      fallbackToPlaceholder(query);
    }
  }, 8000); // 8 second timeout
  
  img.onload = function() {
    clearTimeout(timeout);
    // Image loaded successfully
    imageElement.src = imageUrl;
    imageElement.style.display = 'block';
    loaderElement.style.display = 'none';
  };
  
  img.onerror = function() {
    clearTimeout(timeout);
    // Try a simpler query
    const simpleImageUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(cleanedQuery.split(' ')[0])}`;
    const simpleImg = new Image();
    
    const simpleTimeout = setTimeout(() => {
      if (!simpleImg.complete) {
        simpleImg.src = ''; // Cancel the request
        fallbackToPlaceholder(query);
      }
    }, 5000);
    
    simpleImg.onload = function() {
      clearTimeout(simpleTimeout);
      imageElement.src = simpleImageUrl;
      imageElement.style.display = 'block';
      loaderElement.style.display = 'none';
    };
    
    simpleImg.onerror = function() {
      clearTimeout(simpleTimeout);
      fallbackToPlaceholder(query);
    };
    
    simpleImg.src = simpleImageUrl;
  };
  
  // Start loading the image
  img.src = imageUrl;
}

// Fallback to placeholder image
function fallbackToPlaceholder(query) {
  const imageElement = document.getElementById('productImage');
  const loaderElement = document.getElementById('imageLoader');
  
  if (!imageElement || !loaderElement) return;
  
  imageElement.src = `https://placehold.co/400x400?text=${encodeURIComponent(query)}`;
  imageElement.style.display = 'block';
  loaderElement.style.display = 'none';
}

// Function to copy URL to clipboard
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback to user
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    // Show error feedback
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed!';
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  });
}

// Function to download all links as a text file
function downloadAllLinks(links) {
  let content = "Product Search Links\n===================\n\n";
  
  content += "Buy Directly:\n";
  content += "- Amazon: " + links.amazon + "\n";
  content += "- Flipkart: " + links.flipkart + "\n";
  content += "- Meesho: " + links.meesho + "\n";
  content += "- Myntra: " + links.myntra + "\n";
  content += "- Ajio: " + links.ajio + "\n\n";
  
  content += "Compare Prices:\n";
  content += "- BuyHatke: " + links.buyhatke + "\n";
  content += "- MySmartPrice: " + links.mysmartprice + "\n";
  content += "- Google Shopping: " + links.googleShopping + "\n";
  
  // Create blob and download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'product-search-links.txt';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// UI Helpers
function showLoading() {
  loadingMessage.classList.remove('hidden');
  productContainer.classList.add('hidden');
  errorMessage.classList.add('hidden');
}

function hideLoading() {
  loadingMessage.classList.add('hidden');
}

function showError(msg) {
  hideLoading();
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
  productContainer.classList.add('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}

// Spell correction dictionary for common misspellings
const spellCorrectionDict = {
    // Common smartphone typos
    'iphne': 'iphone',
    'samsng': 'samsung',
    'samsumg': 'samsung',
    'redmi note': 'redmi note',
    'pixela': 'pixel',
    'pixle': 'pixel',
    'galxy': 'galaxy',
    'glaxy': 'galaxy',
    'onepls': 'oneplus',
    'oneplsu': 'oneplus',
    'realmea': 'realme',
    'realmex': 'realme',
    
    // Common laptop/computer typos
    'lenovoa': 'lenovo',
    'lenevo': 'lenovo',
    'delll': 'dell',
    'asuss': 'asus',
    'macbooka': 'macbook',
    'mackbook': 'macbook',
    'thinkpadt': 'thinkpad',
    
    // Common clothing/apparel typos
    'nikae': 'nike',
    'adidasa': 'adidas',
    'pumaq': 'puma',
    'reebokk': 'reebok',
    'underarmour': 'under armour',
    'hollister': 'hollister',
    'levis': 'levi\'s',
    
    // Common electronics typos
    'sonyy': 'sony',
    'jbl speaker': 'jbl speaker',
    'bosee': 'bose',
    'appletv': 'apple tv',
    'firestick': 'fire stick',
    
    // Common household items typos
    'philipsa': 'philips',
    'dysonn': 'dyson',
    'nestle': 'nestle',
    
    // Common general typos
    'televizion': 'television',
    'headfone': 'headphone',
    'headfonez': 'headphones',
    'chargerz': 'charger',
    'wireles': 'wireless',
    'bluetoth': 'bluetooth',
    'usb cabble': 'usb cable',
    'powerbank': 'power bank',
    'smartwatch': 'smart watch'
};

// Function to correct common misspellings
function correctSpelling(query) {
    let correctedQuery = query.toLowerCase().trim();
    
    // Apply corrections from dictionary
    for (const [misspelled, correct] of Object.entries(spellCorrectionDict)) {
        const regex = new RegExp('\\b' + misspelled + '\\b', 'gi');
        correctedQuery = correctedQuery.replace(regex, correct);
    }
    
    // Capitalize first letter of each word
    correctedQuery = correctedQuery.replace(/\b\w/g, char => char.toUpperCase());
    
    return correctedQuery;
}

// Function to generate sample product information based on query
function generateProductInfo(query) {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Define product categories
    const categories = {
        'phone': 'Electronics > Mobile Phones',
        'mobile': 'Electronics > Mobile Phones',
        'smartphone': 'Electronics > Mobile Phones',
        'laptop': 'Electronics > Computers',
        'computer': 'Electronics > Computers',
        'tablet': 'Electronics > Tablets',
        'headphone': 'Electronics > Audio',
        'speaker': 'Electronics > Audio',
        'tv': 'Electronics > Televisions',
        'television': 'Electronics > Televisions',
        'camera': 'Electronics > Cameras',
        'watch': 'Accessories > Watches',
        'shoe': 'Footwear',
        'sneaker': 'Footwear',
        'shirt': 'Clothing > Tops',
        't-shirt': 'Clothing > Tops',
        'jeans': 'Clothing > Bottoms',
        'dress': 'Clothing > Dresses',
        'bag': 'Accessories > Bags',
        'backpack': 'Accessories > Bags',
        'book': 'Books',
        'toy': 'Toys',
        'game': 'Games',
        'console': 'Electronics > Gaming',
        'charger': 'Electronics > Accessories',
        'cable': 'Electronics > Accessories',
        'power bank': 'Electronics > Accessories',
        'bluetooth': 'Electronics > Audio',
        'wireless': 'Electronics > Audio',
        'earbud': 'Electronics > Audio',
        'airpod': 'Electronics > Audio',
        'fitness': 'Sports & Fitness',
        'sports': 'Sports & Fitness',
        'home': 'Home & Kitchen',
        'kitchen': 'Home & Kitchen',
        'furniture': 'Home & Furniture',
        'bed': 'Home & Furniture',
        'sofa': 'Home & Furniture',
        'chair': 'Home & Furniture'
    };
    
    // Define price ranges based on category
    const priceRanges = {
        'Electronics > Mobile Phones': [15000, 80000],
        'Electronics > Computers': [30000, 150000],
        'Electronics > Tablets': [10000, 60000],
        'Electronics > Audio': [1000, 25000],
        'Electronics > Televisions': [15000, 100000],
        'Electronics > Cameras': [5000, 50000],
        'Accessories > Watches': [500, 50000],
        'Footwear': [500, 15000],
        'Clothing > Tops': [200, 10000],
        'Clothing > Bottoms': [500, 8000],
        'Clothing > Dresses': [500, 15000],
        'Accessories > Bags': [300, 20000],
        'Books': [100, 5000],
        'Toys': [200, 10000],
        'Games': [500, 15000],
        'Electronics > Gaming': [2000, 50000],
        'Electronics > Accessories': [100, 5000],
        'Sports & Fitness': [500, 25000],
        'Home & Kitchen': [500, 50000],
        'Home & Furniture': [1000, 100000]
    };
    
    // Define sample descriptions
    const descriptions = {
        'Electronics > Mobile Phones': 'Latest smartphone with advanced features, high-resolution camera, and long-lasting battery life. Perfect for photography, gaming, and productivity.',
        'Electronics > Computers': 'High-performance laptop/desktop with powerful processor, ample storage, and crisp display. Ideal for work, gaming, and creative projects.',
        'Electronics > Tablets': 'Portable tablet with vibrant touchscreen, long battery life, and versatile functionality. Great for entertainment, reading, and light productivity tasks.',
        'Electronics > Audio': 'Premium quality audio device with crystal-clear sound, wireless connectivity, and comfortable design. Enhances your music and video experience.',
        'Electronics > Televisions': 'Ultra-high definition television with smart features, vibrant colors, and immersive sound. Perfect for movies, sports, and gaming.',
        'Electronics > Cameras': 'Professional-grade camera with advanced imaging technology, multiple lenses, and intuitive controls. Captures stunning photos and videos.',
        'Accessories > Watches': 'Stylish timepiece with elegant design, durable materials, and reliable mechanism. Combines fashion with functionality.',
        'Footwear': 'Comfortable and durable footwear with ergonomic design, quality materials, and trendy style. Suitable for daily wear and special occasions.',
        'Clothing > Tops': 'Fashionable top with premium fabric, perfect fit, and stylish design. Versatile piece for casual and formal occasions.',
        'Clothing > Bottoms': 'Well-crafted bottom wear with comfortable fit, quality material, and contemporary style. Perfect for everyday use.',
        'Clothing > Dresses': 'Elegant dress with flattering silhouette, quality fabric, and beautiful detailing. Ideal for parties, gatherings, and special events.',
        'Accessories > Bags': 'Functional and fashionable bag with spacious compartments, durable construction, and stylish appearance. Perfect for work, travel, or daily use.',
        'Books': 'Engaging book with informative content, well-written narrative, and quality printing. Enriches knowledge and provides entertainment.',
        'Toys': 'Fun and educational toy with safe materials, creative design, and engaging features. Encourages learning and development.',
        'Games': 'Entertaining game with immersive gameplay, high-quality graphics, and exciting features. Provides hours of enjoyment for players.',
        'Electronics > Gaming': 'Cutting-edge gaming console/device with powerful performance, stunning graphics, and extensive game library. Ultimate gaming experience.',
        'Electronics > Accessories': 'Essential accessory with reliable functionality, compact design, and universal compatibility. Enhances device performance and convenience.',
        'Sports & Fitness': 'Quality sports/fitness equipment with durable construction, ergonomic design, and performance-enhancing features. Supports active lifestyle.',
        'Home & Kitchen': 'Practical home/kitchen appliance with efficient operation, user-friendly controls, and sleek design. Makes daily tasks easier and more enjoyable.',
        'Home & Furniture': 'Beautiful furniture piece with sturdy construction, comfortable design, and aesthetic appeal. Enhances living space and functionality.'
    };
    
    // Determine category based on keywords in query
    let category = 'General Products';
    for (const [keyword, cat] of Object.entries(categories)) {
        if (lowerQuery.includes(keyword)) {
            category = cat;
            break;
        }
    }
    
    // Get price range for category
    const priceRange = priceRanges[category] || [500, 10000];
    
    // Generate random price within range
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    const price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    
    // Format price with commas
    const formattedPrice = price.toLocaleString('en-IN');
    
    // Get description for category
    const description = descriptions[category] || 'High-quality product with excellent features and reliable performance. Meets your needs and exceeds expectations.';
    
    return {
        category: category,
        price: formattedPrice,
        description: description
    };
}
