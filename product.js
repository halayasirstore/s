// ==== بيانات المنتجات ====
let products = [
  {
    "id": 1,
    "name": "صندلة Hermes Premium",
    "price": 195,
    "oldPrice": 219,
    "category": "أحذية",
    "img": "https://i.imgur.com/VJUtvQs.jpeg",
    "images": [
      "https://i.imgur.com/VJUtvQs.jpeg",
      "https://i.imgur.com/JGvrR2X.jpeg",
      "https://i.imgur.com/Xxrciy9.jpeg"
    ],
    "badge": "الأكثر مبيعاً",
    "desc": "راحة وأناقة في نفس الوقت، خامة ممتازة ومناسبة للمشي اليومي. هذه الصندلة مصنوعة من مواد عالية الجودة توفر الراحة طوال اليوم. تحتوي على نعل داخلي مريح يدعم قوس القدم."
  }
];

// ==== عناصر DOM ====
const DOM = {
  backBtn: document.getElementById('backBtn'),
  mainProductImage: document.getElementById('mainProductImage'),
  productThumbnails: document.getElementById('productThumbnails'),
  productTitle: document.getElementById('productTitle'),
  productPrice: document.getElementById('productPrice'),
  productOldPrice: document.getElementById('productOldPrice'),
  productDescription: document.getElementById('productDescription'),
  productBadge: document.getElementById('productBadge'),
  productQty: document.getElementById('productQty'),
  increaseQty: document.getElementById('increaseQty'),
  decreaseQty: document.getElementById('decreaseQty'),
  addToCartBtn: document.getElementById('addToCartBtn'),
  sendOrderBtn: document.getElementById('sendOrderBtn'),
  sendOrderWhatsAppBtn: document.getElementById('sendOrderWhatsAppBtn'),
  cartCount: document.getElementById('cartCount'),
  cartStatus: document.getElementById('cartStatus'),
  cartStatusText: document.getElementById('cartStatusText'),
  custName: document.getElementById('custName'),
  custPhone: document.getElementById('custPhone'),
  custCity: document.getElementById('custCity'),
  custAddress: document.getElementById('custAddress'),
  custNote: document.getElementById('custNote')
};

// ==== حالة التطبيق ====
const state = {
  currentOrder: JSON.parse(localStorage.getItem('halayasir-order')) || [],
  currentQty: 1,
  currentProduct: null
};

// ==== وظائف مساعدة ====
const helpers = {
  formatPrice: (price) => `${price} درهم`,
  showToast: (message, type = 'success') => {
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s';
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
  },
  validatePhone: (phone) => /^0[5-7][0-9]{8}$/.test(phone.trim()),
  generateId: () => Date.now(),
  // Check if product is in cart
  isProductInCart: (productId) => {
    return state.currentOrder.some(item => item.id === productId);
  }
};

// ==== إدارة التخزين المحلي ====
const storage = {
  saveOrder: () => {
    localStorage.setItem('halayasir-order', JSON.stringify(state.currentOrder));
  },
  clearOrder: () => {
    state.currentOrder = [];
    localStorage.removeItem('halayasir-order');
  }
};

// ==== إدارة DOM ====
const render = {
  showProductDetails: (product) => {
    state.currentProduct = product;
    
    // Update product details
    DOM.productTitle.textContent = product.name;
    DOM.productPrice.textContent = helpers.formatPrice(product.price);
    DOM.productOldPrice.textContent = product.oldPrice ? helpers.formatPrice(product.oldPrice) : '';
    DOM.productDescription.textContent = product.desc;
    
    // Set badge or hide if not available
    if (product.badge) {
      DOM.productBadge.textContent = product.badge;
      DOM.productBadge.style.display = 'inline-block';
    } else {
      DOM.productBadge.style.display = 'none';
    }
    
    // Set main image
    DOM.mainProductImage.src = product.img;
    DOM.mainProductImage.alt = product.name;
    
    // Set thumbnails
    DOM.productThumbnails.innerHTML = '';
    const images = product.images || [product.img];
    images.forEach((img, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = img;
      thumbnail.alt = `${product.name} - صورة ${index + 1}`;
      thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.loading = 'lazy';
      thumbnail.addEventListener('click', () => {
        // Update main image
        DOM.mainProductImage.src = img;
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
      });
      DOM.productThumbnails.appendChild(thumbnail);
    });
    
    // Reset quantity
    state.currentQty = 1;
    DOM.productQty.textContent = state.currentQty;
    
    // Check if product is in cart
    const inCart = helpers.isProductInCart(product.id);
    render.updateCartStatus(inCart);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  
  updateCartStatus: (inCart) => {
    if (inCart) {
      DOM.cartStatus.className = 'cart-status in-cart';
      DOM.cartStatusText.textContent = 'المنتج موجود في السلة';
      DOM.addToCartBtn.style.display = 'none';
      DOM.sendOrderBtn.style.display = 'flex';
    } else {
      DOM.cartStatus.className = 'cart-status not-in-cart';
      DOM.cartStatusText.textContent = 'المنتج غير موجود في السلة';
      DOM.addToCartBtn.style.display = 'flex';
      DOM.sendOrderBtn.style.display = 'none';
    }
  },
  
  updateCartCount: () => {
    const count = state.currentOrder.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = count;
    DOM.cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  }
};

// ==== إدارة الطلبات ====
const order = {
  addToCart: (product, quantity) => {
    // Check if product already exists in order
    const existingItem = state.currentOrder.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      state.currentOrder.push({
        id: product.id,
        qty: quantity,
        name: product.name,
        price: product.price,
        img: product.img
      });
    }
    
    // Save to localStorage
    storage.saveOrder();
    
    // Update UI
    render.updateCartCount();
    
    // Show success message
    helpers.showToast('تمت إضافة المنتج إلى السلة');
  },
  
  sendOrder: () => {
    // Validate customer information
    if (!DOM.custName.value.trim()) {
      helpers.showToast('الرجاء إدخال الإسم الكامل', 'error');
      return;
    }
    
    if (!DOM.custPhone.value.trim()) {
      helpers.showToast('الرجاء إدخال رقم الهاتف', 'error');
      return;
    }
    
    if (!helpers.validatePhone(DOM.custPhone.value.trim())) {
      helpers.showToast('رقم الهاتف غير صحيح (مثال: 06xxxxxxxx)', 'error');
      return;
    }
    
    if (!DOM.custCity.value.trim()) {
      helpers.showToast('الرجاء اختيار المدينة', 'error');
      return;
    }
    
    if (!DOM.custAddress.value.trim()) {
      helpers.showToast('الرجاء إدخال العنوان', 'error');
      return;
    }
    
    // Get the product from cart
    const productInCart = state.currentOrder.find(item => item.id === state.currentProduct.id);
    if (!productInCart) {
      helpers.showToast('المنتج غير موجود في السلة', 'error');
      return;
    }
    
    // Prepare order data
    const orderData = {
      name: DOM.custName.value.trim(),
      phone: DOM.custPhone.value.trim(),
      city: DOM.custCity.value.trim(),
      address: DOM.custAddress.value.trim(),
      note: DOM.custNote.value.trim(),
      items: [productInCart],
      total: helpers.formatPrice(productInCart.price * productInCart.qty),
      date: new Date().toISOString()
    };
    
    // Show loading state
    DOM.sendOrderBtn.classList.add('loading');
    DOM.sendOrderBtn.disabled = true;
    
    // Replace with your Google Apps Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbx7WQ0G5yMt6IpKOuTn3Hs2oWarX-CRPnzAqmR1X7buLfECtN7doJ1uRGFcTtkPMcU/exec';
    
    // Send data to Google Sheets
    fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    })
    .then(() => {
      helpers.showToast('تم إرسال الطلب بنجاح! سنتواصل معك قريباً لتأكيد التفاصيل.');
      
      // Remove product from cart
      state.currentOrder = state.currentOrder.filter(item => item.id !== state.currentProduct.id);
      storage.saveOrder();
      
      // Update UI
      render.updateCartStatus(false);
      render.updateCartCount();
      
      // Clear form
      DOM.custName.value = '';
      DOM.custPhone.value = '';
      DOM.custCity.value = '';
      DOM.custAddress.value = '';
      DOM.custNote.value = '';
    })
    .catch(error => {
      helpers.showToast('حصل خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.', 'error');
      console.error('Error:', error);
    })
    .finally(() => {
      DOM.sendOrderBtn.classList.remove('loading');
      DOM.sendOrderBtn.disabled = false;
    });
  },
  
  sendOrderWhatsApp: () => {
    // Validate customer information
    if (!DOM.custName.value.trim()) {
      helpers.showToast('الرجاء إدخال الإسم الكامل', 'error');
      return;
    }
    
    if (!DOM.custPhone.value.trim()) {
      helpers.showToast('الرجاء إدخال رقم الهاتف', 'error');
      return;
    }
    
    if (!helpers.validatePhone(DOM.custPhone.value.trim())) {
      helpers.showToast('رقم الهاتف غير صحيح (مثال: 06xxxxxxxx)', 'error');
      return;
    }
    
    if (!DOM.custCity.value.trim()) {
      helpers.showToast('الرجاء اختيار المدينة', 'error');
      return;
    }
    
    if (!DOM.custAddress.value.trim()) {
      helpers.showToast('الرجاء إدخال العنوان', 'error');
      return;
    }
    
    // Get the product from cart
    const productInCart = state.currentOrder.find(item => item.id === state.currentProduct.id);
    if (!productInCart) {
      helpers.showToast('المنتج غير موجود في السلة', 'error');
      return;
    }
    
    // Prepare the message text
    const message = `طلب جديد من متجر هلا ياسر:\n\n` +
      `المنتج: ${productInCart.name}\n` +
      `الكمية: ${productInCart.qty}\n` +
      `السعر: ${helpers.formatPrice(productInCart.price)}\n` +
      `المجموع: ${helpers.formatPrice(productInCart.qty * productInCart.price)}\n\n` +
      `بيانات العميل:\n` +
      `الإسم: ${DOM.custName.value.trim()}\n` +
      `الهاتف: ${DOM.custPhone.value.trim()}\n` +
      `المدينة: ${DOM.custCity.value.trim()}\n` +
      `العنوان: ${DOM.custAddress.value.trim()}\n` +
      `ملاحظات: ${DOM.custNote.value.trim() || '-'}\n`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp phone number (replace with the actual number)
    const phoneNumber = '212772612720'; // Without '+' or '00'
    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, '_blank');
  }
};

// ==== إدارة الأحداث ====
const events = {
  init: () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Find product
    const product = products.find(p => p.id === productId);
    
    if (product) {
      render.showProductDetails(product);
    } else {
      // Redirect to home if product not found
      window.location.href = 'index.html';
    }
    
    // Load cart from localStorage
    render.updateCartCount();
    
    // Navigation
    DOM.backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    
    // Product details
    DOM.increaseQty.addEventListener('click', () => {
      state.currentQty++;
      DOM.productQty.textContent = state.currentQty;
    });
    
    DOM.decreaseQty.addEventListener('click', () => {
      if (state.currentQty > 1) {
        state.currentQty--;
        DOM.productQty.textContent = state.currentQty;
      }
    });
    
    DOM.addToCartBtn.addEventListener('click', () => {
      if (!state.currentProduct) return;
      order.addToCart(state.currentProduct, state.currentQty);
      render.updateCartStatus(true);
    });
    
    DOM.sendOrderBtn.addEventListener('click', order.sendOrder);
    DOM.sendOrderWhatsAppBtn.addEventListener('click', order.sendOrderWhatsApp);
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', events.init);
