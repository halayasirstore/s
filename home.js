// ==== بيانات المنتجات ====
let products = [
   {
    "id": 1,
    "name": "صندلة Hermes Premium",
    "price": 195,
    "oldPrice": 219,
    "category": "أحذية",
    "img": "https://i.imgur.com/Xxrciy9.jpeg",
    "images": [
      "https://i.imgur.com/Xxrciy9.jpeg",
      "https://i.imgur.com/JGvrR2X.jpeg",
      "https://i.imgur.com/9Rz55Ck.jpeg"
    ],
    "badge": "الأكثر مبيعاً",
    "desc": "راحة وأناقة في نفس الوقت، خامة ممتازة ومناسبة للمشي اليومي. هذه الصندلة مصنوعة من مواد عالية الجودة توفر الراحة طوال اليوم. تحتوي على نعل داخلي مريح يدعم قوس القدم."
  }
];

// ==== عناصر DOM ====
const DOM = {
  grid: document.getElementById('productsGrid'),
  searchInput: document.getElementById('searchInput'),
  filterPills: document.querySelectorAll('.pill'),
  cartCount: document.getElementById('cartCount'),
  productListing: document.getElementById('productListing'),
  adminPanel: document.getElementById('adminPanel'),
  adminProductsList: document.getElementById('adminProductsList'),
  adminTabs: document.querySelectorAll('.admin-tab'),
  adminContents: document.querySelectorAll('.admin-content'),
  logoutBtn: document.getElementById('logoutBtn'),
  adminName: document.getElementById('adminName'),
  adminCategory: document.getElementById('adminCategory'),
  adminPrice: document.getElementById('adminPrice'),
  adminOldPrice: document.getElementById('adminOldPrice'),
  adminBadge: document.getElementById('adminBadge'),
  adminImageUpload: document.getElementById('adminImageUpload'),
  adminImageUrl: document.getElementById('adminImageUrl'),
  addImageUrlBtn: document.getElementById('addImageUrlBtn'),
  adminDesc: document.getElementById('adminDesc'),
  saveProductBtn: document.getElementById('saveProductBtn'),
  addProductBtn: document.getElementById('addProductBtn'),
  storeInfo: document.getElementById('storeInfo'),
  formTitle: document.getElementById('formTitle'),
  cancelEditBtn: document.getElementById('cancelEditBtn'),
  imagePreview: document.getElementById('imagePreview'),
  productImagesManager: document.getElementById('productImagesManager'),
  adminSearchInput: document.getElementById('adminSearchInput'),
  addNewProduct: document.getElementById('addNewProduct'),
  totalProducts: document.getElementById('totalProducts'),
  todayOrders: document.getElementById('todayOrders'),
  revenue: document.getElementById('revenue'),
  visitors: document.getElementById('visitors'),
  exportProducts: document.getElementById('exportProducts'),
  importProducts: document.getElementById('importProducts'),
  backupData: document.getElementById('backupData'),
  loginModal: document.getElementById('loginModal'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
  confirmLoginBtn: document.getElementById('confirmLoginBtn'),
  cancelLoginBtn: document.getElementById('cancelLoginBtn')
};

// ==== حالة التطبيق ====
const state = {
  currentOrder: JSON.parse(localStorage.getItem('halayasir-order')) || [],
  currentCat: 'all',
  currentSearch: '',
  adminMode: false,
  editingProduct: null,
  productImages: [],
  // Admin credentials
  adminCredentials: {
    username: 'admin',
    password: 'admin123'
  },
  // Login session
  isLoggedIn: false
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
  readFileAsDataURL: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  },
  // Check if admin mode is requested via URL
  checkAdminMode: () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('admin');
  },
  // Validate admin login
  validateLogin: (username, password) => {
    return username === state.adminCredentials.username && 
           password === state.adminCredentials.password;
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
  },
  saveProducts: () => {
    localStorage.setItem('halayasir-products', JSON.stringify(products));
  },
  loadProducts: () => {
    const savedProducts = localStorage.getItem('halayasir-products');
    if (savedProducts) {
      products = JSON.parse(savedProducts);
    }
  },
  // Save login state
  saveLoginState: (isLoggedIn) => {
    localStorage.setItem('halayasir-admin-login', JSON.stringify({
      isLoggedIn: isLoggedIn,
      timestamp: Date.now()
    }));
  },
  // Load login state
  loadLoginState: () => {
    const loginState = localStorage.getItem('halayasir-admin-login');
    if (loginState) {
      try {
        const parsed = JSON.parse(loginState);
        // Check if login is still valid (within 24 hours)
        const isValid = parsed.isLoggedIn && (Date.now() - parsed.timestamp) < 24 * 60 * 60 * 1000;
        return isValid;
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  // Clear login state
  clearLoginState: () => {
    localStorage.removeItem('halayasir-admin-login');
  }
};

// ==== إدارة DOM ====
const render = {
  products: (filterCat = 'all', search = '') => {
    DOM.grid.innerHTML = '';
    const list = products.filter(p => 
      (filterCat === 'all' || p.category === filterCat) && 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    
    if(list.length === 0) {
      DOM.grid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <p>لا توجد منتجات مطابقة للبحث</p>
          <button class="btn primary" onclick="state.currentCat='all';state.currentSearch='';render.products()">
            عرض جميع المنتجات
          </button>
        </div>`;
      return;
    }
    
    list.forEach(p => DOM.grid.appendChild(render.productCard(p)));
  },
  
  productCard: (p) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="thumb">
        <img alt="${p.name}" src="${p.img}" loading="lazy"/>
        ${p.badge ? `<span class="tag">${p.badge}</span>` : ''}
      </div>
      <div class="content">
        <div class="title">${p.name}</div>
        <div class="price">
          <strong>${helpers.formatPrice(p.price)}</strong>
          ${p.oldPrice ? `<del>${helpers.formatPrice(p.oldPrice)}</del>` : ''}
        </div>
      </div>`;
    
    el.addEventListener('click', () => {
      window.location.href = `product.html?id=${p.id}`;
    });
    return el;
  },
  
  updateCartCount: () => {
    const count = state.currentOrder.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCount.textContent = count;
    DOM.cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  },
  
  // Render admin products table
  adminProducts: (searchTerm = '') => {
    DOM.adminProductsList.innerHTML = '';
    
    const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    filteredProducts.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.img}" alt="${product.name}" class="admin-img" loading="lazy"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${helpers.formatPrice(product.price)}</td>
        <td>${product.oldPrice ? helpers.formatPrice(product.oldPrice) : '-'}</td>
        <td class="admin-actions">
          <button class="btn" data-id="${product.id}" data-act="edit">
            <i class="fas fa-edit"></i>
            تعديل
          </button>
          <button class="btn danger" data-id="${product.id}" data-act="delete">
            <i class="fas fa-trash"></i>
            حذف
          </button>
        </td>
      `;
      DOM.adminProductsList.appendChild(row);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('[data-act="edit"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        admin.editProduct(id);
      });
    });
    
    document.querySelectorAll('[data-act="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        admin.deleteProduct(id);
      });
    });
  },
  
  // Render dashboard stats
  dashboardStats: () => {
    // Simulate stats (in a real app, these would come from a backend)
    DOM.totalProducts.textContent = products.length;
    DOM.todayOrders.textContent = Math.floor(Math.random() * 20) + 5;
    DOM.revenue.textContent = helpers.formatPrice(Math.floor(Math.random() * 50000) + 10000);
    DOM.visitors.textContent = Math.floor(Math.random() * 500) + 100;
  },
  
  // Render product images in the admin form
  productImages: () => {
    DOM.productImagesManager.innerHTML = '';
    
    // Add existing images
    state.productImages.forEach((img, index) => {
      const imageItem = document.createElement('div');
      imageItem.className = 'product-image-item';
      imageItem.innerHTML = `
        <img src="${img}" alt="صورة المنتج ${index + 1}">
        <div class="product-image-remove" data-index="${index}">
          <i class="fas fa-times"></i>
        </div>
      `;
      DOM.productImagesManager.appendChild(imageItem);
    });
    
    // Add "Add image" button
    const addImageBtn = document.createElement('div');
    addImageBtn.className = 'add-image-btn';
    addImageBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addImageBtn.addEventListener('click', () => {
      DOM.adminImageUpload.click();
    });
    DOM.productImagesManager.appendChild(addImageBtn);
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.product-image-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        state.productImages.splice(index, 1);
        render.productImages();
      });
    });
  }
};

// ==== إدارة لوحة التحكم ====
const admin = {
  showLoginModal: () => {
    DOM.loginModal.classList.add('active');
    DOM.username.value = '';
    DOM.password.value = '';
    DOM.username.focus();
  },
  
  hideLoginModal: () => {
    DOM.loginModal.classList.remove('active');
  },
  
  login: () => {
    const username = DOM.username.value.trim();
    const password = DOM.password.value.trim();
    
    if (!username || !password) {
      helpers.showToast('الرجاء إدخال اسم المستخدم وكلمة المرور', 'error');
      return;
    }
    
    if (helpers.validateLogin(username, password)) {
      state.isLoggedIn = true;
      storage.saveLoginState(true);
      admin.hideLoginModal();
      admin.showPanel();
    } else {
      helpers.showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
      DOM.password.value = '';
      DOM.password.focus();
    }
  },
  
  logout: () => {
    state.isLoggedIn = false;
    state.adminMode = false;
    storage.clearLoginState();
    // Go back to store by removing ?admin from URL
    window.location.href = window.location.pathname;
  },
  
  showPanel: () => {
    state.adminMode = true;
    DOM.productListing.style.display = 'none';
    DOM.adminPanel.style.display = 'block';
    DOM.storeInfo.style.display = 'none';
    render.dashboardStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  
  hidePanel: () => {
    state.adminMode = false;
    DOM.adminPanel.style.display = 'none';
    DOM.productListing.style.display = 'block';
    DOM.storeInfo.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  
  editProduct: (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Set editing mode
    state.editingProduct = product;
    state.productImages = [...(product.images || [product.img])];
    
    // Update form title
    DOM.formTitle.textContent = 'تعديل منتج';
    
    // Populate form fields
    DOM.adminName.value = product.name;
    DOM.adminCategory.value = product.category;
    DOM.adminPrice.value = product.price;
    DOM.adminOldPrice.value = product.oldPrice || '';
    DOM.adminBadge.value = product.badge || '';
    DOM.adminDesc.value = product.desc || '';
    
    // Update image preview
    DOM.imagePreview.innerHTML = `<img src="${product.img}" alt="صورة المنتج">`;
    
    // Render product images
    render.productImages();
    
    // Show cancel button
    DOM.cancelEditBtn.style.display = 'inline-flex';
    
    // Switch to add/edit product tab
    DOM.adminTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === 'add') {
        tab.classList.add('active');
      }
    });
    
    DOM.adminContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === 'adminAddProduct') {
        content.classList.add('active');
      }
    });
  },
  
  deleteProduct: (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      products = products.filter(p => p.id !== id);
      storage.saveProducts();
      render.adminProducts();
      render.products();
      helpers.showToast('تم حذف المنتج بنجاح');
    }
  },
  
  saveProduct: () => {
    // Validate inputs
    if (!DOM.adminName.value) {
      helpers.showToast('الرجاء إدخال اسم المنتج', 'error');
      return;
    }
    
    if (!DOM.adminPrice.value) {
      helpers.showToast('الرجاء إدخال سعر المنتج', 'error');
      return;
    }
    
    if (state.productImages.length === 0) {
      helpers.showToast('الرجاء إضافة صورة واحدة على الأقل', 'error');
      return;
    }
    
    const productData = {
      name: DOM.adminName.value,
      category: DOM.adminCategory.value,
      price: parseInt(DOM.adminPrice.value),
      oldPrice: DOM.adminOldPrice.value ? parseInt(DOM.adminOldPrice.value) : null,
      badge: DOM.adminBadge.value || '',
      img: state.productImages[0],
      images: state.productImages,
      desc: DOM.adminDesc.value || 'وصف المنتج غير متوفر حالياً'
    };
    
    if (state.editingProduct) {
      // Update existing product
      const index = products.findIndex(p => p.id === state.editingProduct.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        helpers.showToast('تم تحديث المنتج بنجاح');
      }
    } else {
      // Add new product
      const newProduct = {
        id: helpers.generateId(),
        ...productData
      };
      products.unshift(newProduct);
      helpers.showToast('تمت إضافة المنتج بنجاح');
    }
    
    // Save to localStorage
    storage.saveProducts();
    
    // Update UI
    render.adminProducts();
    render.products();
    
    // Reset form
    admin.resetForm();
  },
  
  resetForm: () => {
    // Reset form fields
    DOM.adminName.value = '';
    DOM.adminCategory.value = 'أحذية';
    DOM.adminPrice.value = '';
    DOM.adminOldPrice.value = '';
    DOM.adminBadge.value = '';
    DOM.adminDesc.value = '';
    DOM.adminImageUrl.value = '';
    
    // Reset image preview
    DOM.imagePreview.innerHTML = `
      <div class="image-preview-placeholder">
        <i class="fas fa-cloud-upload-alt"></i>
        <div>اختر صورة أو اسحبها هنا</div>
      </div>
    `;
    
    // Reset product images
    state.productImages = [];
    render.productImages();
    
    // Reset form title
    DOM.formTitle.textContent = 'إضافة منتج جديد';
    
    // Hide cancel button
    DOM.cancelEditBtn.style.display = 'none';
    
    // Reset editing mode
    state.editingProduct = null;
  },
  
  handleImageUpload: async (files) => {
    for (const file of files) {
      if (!file.type.match('image.*')) {
        helpers.showToast('يرجى اختيار ملف صورة صالح', 'error');
        continue;
      }
      
      try {
        const dataURL = await helpers.readFileAsDataURL(file);
        state.productImages.push(dataURL);
        
        // Update main image preview if it's the first image
        if (state.productImages.length === 1) {
          DOM.imagePreview.innerHTML = `<img src="${dataURL}" alt="صورة المنتج">`;
        }
      } catch (error) {
        helpers.showToast('حدث خطأ أثناء تحميل الصورة', 'error');
        console.error('Error reading file:', error);
      }
    }
    
    // Update product images display
    render.productImages();
  },
  
  addImageUrl: () => {
    const url = DOM.adminImageUrl.value.trim();
    if (!url) {
      helpers.showToast('الرجاء إدخال رابط الصورة', 'error');
      return;
    }
    
    if (!helpers.isValidUrl(url)) {
      helpers.showToast('الرابط غير صحيح', 'error');
      return;
    }
    
    state.productImages.push(url);
    
    // Update main image preview if it's the first image
    if (state.productImages.length === 1) {
      DOM.imagePreview.innerHTML = `<img src="${url}" alt="صورة المنتج">`;
    }
    
    // Clear URL input
    DOM.adminImageUrl.value = '';
    
    // Update product images display
    render.productImages();
    
    helpers.showToast('تمت إضافة الصورة بنجاح');
  },
  
  exportProducts: () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `halayasir-products-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    helpers.showToast('تم تصدير المنتجات بنجاح');
  },
  
  importProducts: () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedProducts = JSON.parse(event.target.result);
          
          if (Array.isArray(importedProducts)) {
            products = importedProducts;
            storage.saveProducts();
            render.adminProducts();
            render.products();
            helpers.showToast('تم استيراد المنتجات بنجاح');
          } else {
            helpers.showToast('ملف غير صالح', 'error');
          }
        } catch (error) {
          helpers.showToast('حدث خطأ أثناء استيراد المنتجات', 'error');
          console.error('Error parsing JSON:', error);
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  },
  
  backupData: () => {
    const data = {
      products: products,
      orders: state.currentOrder,
      date: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `halayasir-backup-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    helpers.showToast('تم إنشاء نسخة احتياطية بنجاح');
  }
};

// ==== إدارة الأحداث ====
const events = {
  init: () => {
    // Check if admin mode is requested via URL
    if (helpers.checkAdminMode()) {
      // Check if already logged in (from previous session)
      if (storage.loadLoginState()) {
        state.isLoggedIn = true;
        admin.showPanel();
      } else {
        // Show login modal if not logged in
        admin.showLoginModal();
      }
    } else {
      // Show store by default
      DOM.productListing.style.display = 'block';
      DOM.adminPanel.style.display = 'none';
      DOM.storeInfo.style.display = 'block';
    }
    
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Load products from localStorage
    storage.loadProducts();
    
    // Load cart from localStorage
    render.updateCartCount();
    
    // Navigation
    DOM.logoutBtn.addEventListener('click', admin.logout);
    
    // Login modal
    DOM.confirmLoginBtn.addEventListener('click', admin.login);
    DOM.cancelLoginBtn.addEventListener('click', () => {
      // If canceling login and admin mode was requested, redirect to home without admin
      if (helpers.checkAdminMode()) {
        window.location.href = window.location.pathname;
      } else {
        admin.hideLoginModal();
      }
    });
    
    // Close modal when clicking outside
    DOM.loginModal.addEventListener('click', (e) => {
      if (e.target === DOM.loginModal) {
        // If closing modal and admin mode was requested, redirect to home without admin
        if (helpers.checkAdminMode()) {
          window.location.href = window.location.pathname;
        } else {
          admin.hideLoginModal();
        }
      }
    });
    
    // Login on Enter key
    DOM.password.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        admin.login();
      }
    });
    
    // Search and filter
    DOM.filterPills.forEach(p => p.addEventListener('click', () => {
      DOM.filterPills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.currentCat = p.dataset.cat;
      render.products(state.currentCat, state.currentSearch);
    }));
    
    DOM.searchInput.addEventListener('input', () => {
      state.currentSearch = DOM.searchInput.value.trim();
      render.products(state.currentCat, state.currentSearch);
    });
    
    // Admin tabs
    DOM.adminTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        DOM.adminTabs.forEach(t => t.classList.remove('active'));
        DOM.adminContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
        
        // Load specific tab content
        if (tabName === 'products') {
          render.adminProducts();
        } else if (tabName === 'dashboard') {
          render.dashboardStats();
        }
      });
    });
    
    // Admin product form
    DOM.saveProductBtn.addEventListener('click', admin.saveProduct);
    DOM.cancelEditBtn.addEventListener('click', admin.resetForm);
    
    // Admin search
    DOM.adminSearchInput.addEventListener('input', () => {
      const searchTerm = DOM.adminSearchInput.value.trim();
      render.adminProducts(searchTerm);
    });
    
    // Add new product button
    DOM.addNewProduct.addEventListener('click', () => {
      // Reset form
      admin.resetForm();
      
      // Switch to add product tab
      DOM.adminTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === 'add') {
          tab.classList.add('active');
        }
      });
      
      DOM.adminContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === 'adminAddProduct') {
          content.classList.add('active');
        }
      });
    });
    
    // Image upload
    DOM.adminImageUpload.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        admin.handleImageUpload(e.target.files);
      }
    });
    
    // Image URL
    DOM.addImageUrlBtn.addEventListener('click', admin.addImageUrl);
    DOM.adminImageUrl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        admin.addImageUrl();
      }
    });
    
    // Dashboard actions
    DOM.exportProducts.addEventListener('click', admin.exportProducts);
    DOM.importProducts.addEventListener('click', admin.importProducts);
    DOM.backupData.addEventListener('click', admin.backupData);
    
    // Initial render
    if (!state.adminMode) {
      render.products();
    }
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', events.init);


