// ==== عناصر DOM ====
const DOM = {
  checkoutItems: document.getElementById('checkoutItems'),
  subTotalEl: document.getElementById('subTotal'),
  grandTotalEl: document.getElementById('grandTotal'),
  whatsappBtn: document.getElementById('whatsappOrder'),
  placeOrderBtn: document.getElementById('placeOrder'),
  orderMsg: document.getElementById('orderMsg'),
  nameEl: document.getElementById('name'),
  cityEl: document.getElementById('city'),
  addressEl: document.getElementById('address'),
  phoneEl: document.getElementById('phone'),
  noteEl: document.getElementById('note'),
  cartCount: document.getElementById('cartCount')
};

// ==== حالة التطبيق ====
const state = {
  currentOrder: JSON.parse(localStorage.getItem('halayasir-order')) || []
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
  validatePhone: (phone) => /^0[5-7][0-9]{8}$/.test(phone.trim())
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
  checkout: () => {
    DOM.checkoutItems.innerHTML = '';
    
    if(state.currentOrder.length === 0) {
      DOM.checkoutItems.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-shopping-cart"></i>
          <p>سلة المشتريات فارغة</p>
          <a href="index.html" class="btn primary">
            متابعة التسوق
          </a>
        </div>`;
    } else {
      state.currentOrder.forEach(item => {
        const line = document.createElement('div');
        line.className = 'cart-item';
        line.innerHTML = `
          <img src="${item.img}" alt="${item.name}" width="60" height="60" loading="lazy">
          <div>
            <div style="font-weight:700">${item.name}</div>
            <div class="cart-line">${helpers.formatPrice(item.price)} × ${item.qty}</div>
          </div>
          <strong>${helpers.formatPrice(item.qty * item.price)}</strong>
          <div class="cart-item-actions">
            <button data-id="${item.id}" data-act="remove">
              <i class="fas fa-trash"></i>
              إلغاء
            </button>
          </div>`;
        DOM.checkoutItems.appendChild(line);
      });
    }
    
    // Add event listeners for remove buttons
    document.querySelectorAll('[data-act="remove"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        state.currentOrder = state.currentOrder.filter(item => item.id !== id);
        storage.saveOrder();
        render.checkout();
        render.updateCartCount();
      });
    });
    
    const total = state.currentOrder.reduce((sum, item) => sum + (item.price * item.qty), 0);
    DOM.subTotalEl.textContent = helpers.formatPrice(total);
    DOM.grandTotalEl.textContent = helpers.formatPrice(total);
    
    // Update cart count
    render.updateCartCount();
  },
  
  updateCartCount: () => {
    const count = state.currentOrder.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = count;
    DOM.cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  }
};

// ==== إدارة الطلبات ====
const order = {
  validateForm: () => {
    if(!DOM.nameEl.value.trim()) return 'المرجو إدخال الإسم الكامل';
    if(!DOM.cityEl.value.trim()) return 'المرجو اختيار المدينة';
    if(!DOM.addressEl.value.trim()) return 'المرجو إدخال العنوان';
    if(!helpers.validatePhone(DOM.phoneEl.value.trim())) return 'رقم الهاتف غير صحيح (مثال: 06xxxxxxxx)';
    if(state.currentOrder.length === 0) return 'المرجو إضافة منتجات إلى السلة';
    return '';
  },
  
  getSummaryText: () => {
    const lines = state.currentOrder.map(item => {
      return `• ${item.name} × ${item.qty} = ${helpers.formatPrice(item.qty * item.price)}`;
    }).join('\n');
    
    return `طلب جديد من متجر هلا ياسر:\n\nالمنتجات:\n${lines}\n\nالمجموع: ${DOM.grandTotalEl.textContent}\n\nبيانات العميل:\nالإسم: ${DOM.nameEl.value}\nالهاتف: ${DOM.phoneEl.value}\nالمدينة: ${DOM.cityEl.value}\nالعنوان: ${DOM.addressEl.value}\nملاحظات: ${DOM.noteEl.value || '-'}\n`;
  },
  
  submitOrder: () => {
    const err = order.validateForm();
    if(err) { 
      DOM.orderMsg.textContent = err; 
      DOM.orderMsg.style.color = 'var(--warning)'; 
      return; 
    }
    
    // Show loading state
    DOM.placeOrderBtn.classList.add('loading');
    DOM.placeOrderBtn.disabled = true;
    DOM.orderMsg.textContent = 'جاري معالجة الطلب...';
    DOM.orderMsg.style.color = 'var(--brand)';
    
    // Prepare order data
    const orderData = {
      name: DOM.nameEl.value.trim(),
      phone: DOM.phoneEl.value.trim(),
      city: DOM.cityEl.value.trim(),
      address: DOM.addressEl.value.trim(),
      note: DOM.noteEl.value.trim(),
      items: state.currentOrder.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      total: DOM.grandTotalEl.textContent,
      date: new Date().toISOString()
    };
    
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
      DOM.orderMsg.textContent = 'تم إستلام طلبك بنجاح! سنتواصل معك قريباً لتأكيد التفاصيل. شكراً لثقتك.';
      DOM.orderMsg.style.color = 'var(--success)';
      storage.clearOrder();
      render.checkout();
      render.updateCartCount();
      
      // Clear form
      DOM.nameEl.value = '';
      DOM.cityEl.value = '';
      DOM.addressEl.value = '';
      DOM.phoneEl.value = '';
      DOM.noteEl.value = '';
    })
    .catch(error => {
      DOM.orderMsg.textContent = 'حصل خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.';
      DOM.orderMsg.style.color = 'var(--danger)';
      console.error('Error:', error);
    })
    .finally(() => {
      DOM.placeOrderBtn.classList.remove('loading');
      DOM.placeOrderBtn.disabled = false;
    });
  }
};

// ==== إدارة الأحداث ====
const events = {
  init: () => {
    // Load cart from localStorage
    render.checkout();
    
    // WhatsApp order
    DOM.whatsappBtn.addEventListener('click', () => {
      const err = order.validateForm();
      if(err) { 
        DOM.orderMsg.textContent = err; 
        DOM.orderMsg.style.color = 'var(--warning)'; 
        return; 
      }
      
      const phoneNumber = '212772612720'; // ضع رقم واتساب ديالك هنا بدون +
      const text = encodeURIComponent(order.getSummaryText());
      const url = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(url, '_blank');
    });
    
    // Place order
    DOM.placeOrderBtn.addEventListener('click', order.submitOrder);
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', events.init);