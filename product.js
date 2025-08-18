// ==== بيانات المنتجات ====
let products = [
  {
    id: 1,
    name: "صندلة Izmir Premium",
    price: 159,
    oldPrice: 219,
    category: "أحذية",
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "الأكثر مبيعاً",
    desc: "راحة وأناقة في نفس الوقت، خامة ممتازة ومناسبة للمشي اليومي. هذه الصندلة مصنوعة من مواد عالية الجودة توفر الراحة طوال اليوم. تحتوي على نعل داخلي مريح يدعم قوس القدم."
  },
  {
    id: 2,
    name: "محفظة جلد صغيرة",
    price: 99,
    oldPrice: 129,
    category: "إكسسوارات",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "عرض محدود",
    desc: "محفظة أنيقة متعددة الجيوب، جلد صناعي عالي الجودة. تحتوي على 6 جيوب لبطاقات الائتمان، جيب للنقود، وجيب شفاف للهوية. تصميم أنيق يناسب جميع المناسبات."
  },
  {
    id: 3,
    name: "قميص كاجوال",
    price: 139,
    oldPrice: 179,
    category: "ملابس",
    img: "https://images.unsplash.com/photo-1520975922284-9a0b5e1d9d9b?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520975922284-9a0b5e1d9d9b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956ba0d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956ba0d9?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "جديد",
    desc: "قميص قطن 100%، تصميم عصري ومريح. يتميز بدرزة عالية الجودة وأزرار متينة. مناسب للارتداء اليومي أو المناسبات شبه الرسمية. متوفر بعدة ألوان."
  },
  {
    id: 4,
    name: "حذاء رياضي خفيف",
    price: 199,
    oldPrice: 249,
    category: "أحذية",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "شحن مجاني",
    desc: "خفيف في الرجل ومتين، مناسب للجري والمشي لمسافات طويلة. يحتوي على نعل خارجي مضاد للانزلاق ونعل داخلي ماص للصدمات. شبكة التهوية تحافظ على برودة القدم."
  },
  {
    id: 5,
    name: "حزام جلد كلاسيكي",
    price: 89,
    oldPrice: 119,
    category: "إكسسوارات",
    img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "سعر خاص",
    desc: "حزام عملي بمشبك متين، يناسب أغلب الإطلالات. مصنوع من جلد طبيعي عالي الجودة مع مشبك معدني مقاوم للصدأ. متوفر بعدة ألوان لتناسب مختلف الأذواق."
  },
  {
    id: 6,
    name: "جاكيت خفيف مقاوم للرياح",
    price: 229,
    oldPrice: 299,
    category: "ملابس",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "الأكثر طلباً",
    desc: "يحمي من الهواء مع تهوية ممتازة، خامة مريحة. يحتوي على سحاب أمامي متين وأكمام قابلة للضبط. جيوب متعددة لتخزين الأغراض الشخصية. مثالي للطقس المعتدل."
  },
  {
    id: 7,
    name: "قبعة كتان صيفية",
    price: 59,
    oldPrice: 79,
    category: "إكسسوارات",
    img: "https://images.unsplash.com/photo-1615460549969-36fa19521a0c?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615460549969-36fa19521a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615460549969-36fa19521a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615460549969-36fa19521a0c?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "موصى بها",
    desc: "قبعة خفيفة تحمي من الشمس وتكمل إطلالتك. مصنوعة من خامة الكتان الطبيعي الذي يوفر التهوية الجيدة. حافة عريضة تحمي الوجه من أشعة الشمس المباشرة."
  },
  {
    id: 8,
    name: "شبشب منزلي مبطن",
    price: 69,
    oldPrice: 99,
    category: "أحذية",
    img: "https://images.unsplash.com/photo-1598137235960-c3f0f4b7b1cf?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598137235960-c3f0f4b7b1cf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598137235960-c3f0f4b7b1cf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598137235960-c3f0f4b7b1cf?q=80&w=1200&auto=format&fit=crop"
    ],
    badge: "مريح للغاية",
    desc: "دفء وراحة داخل المنزل، نعل سفلي مانع للإنزلاق. يحتوي على بطانة ناعمة ماصة للرطوبة ونعل خارجي مضاد للانزلاق. مثالي للاستخدام اليومي في المنزل."
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
