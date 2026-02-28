import './style.css';
import { CartManager, InvoiceGenerator, WhatsAppIntegration } from './utils';
import type { MenuItem, CartItem } from './types';

const MENU_STORAGE_KEY = 'mumbai_jaan_menu';

let menuItems: MenuItem[] = [
  // Biryani
  {
    id: '1',
    name: 'Hyderabadi Biryani',
    price: 299,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Authentic Hyderabadi biryani with fragrant basmati rice',
  },
  {
    id: '2',
    name: 'Lucknowi Biryani',
    price: 329,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Royal Lucknowi style with marinated meat',
  },
  {
    id: '3',
    name: 'Kacchi Biryani',
    price: 349,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/1213317/pexels-photo-1213317.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Traditional raw meat biryani cooked in sealed pot',
  },
  {
    id: '4',
    name: 'Paneer Biryani',
    price: 249,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/3819547/pexels-photo-3819547.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Vegetarian delight with cottage cheese',
  },
  // Appetizers
  {
    id: '5',
    name: 'Seekh Kabab',
    price: 199,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/5737453/pexels-photo-5737453.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Grilled minced meat skewers with spices',
  },
  {
    id: '6',
    name: 'Shami Kabab',
    price: 189,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Crispy patties of minced meat and lentils',
  },
  {
    id: '7',
    name: 'Samosa',
    price: 79,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Golden fried pastry with spiced filling',
  },
  // Desserts
  {
    id: '8',
    name: 'Kheer',
    price: 99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Rice pudding with cardamom and nuts',
  },
  {
    id: '9',
    name: 'Shahi Tukda',
    price: 129,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Bread cream dessert with dry fruits',
  },
  // Beverages
  {
    id: '10',
    name: 'Masala Chai',
    price: 39,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Aromatic Indian spiced tea',
  },
  {
    id: '11',
    name: 'Mango Lassi',
    price: 59,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/3407857/pexels-photo-3407857.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Refreshing yogurt drink with mango',
  },
];

let filteredItems = menuItems;

// Load custom menu items from admin
function loadCustomMenuItems(): void {
  try {
    const customItems = localStorage.getItem(MENU_STORAGE_KEY);
    if (customItems) {
      const parsed = JSON.parse(customItems);
      menuItems = [...menuItems, ...parsed];
      filteredItems = menuItems;
    }
  } catch (e) {
    console.error('Error loading custom menu items');
  }
}

function initMenuPage(): void {
  loadCustomMenuItems();
  renderNavbar();
  renderMenuContainer();
  renderFloatingCart();
  setupSearchAndFilter();
  setupCartEvents();
}

function renderNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <nav class="bg-dark text-light shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary">🍛</span>
            <a href="/" class="text-xl font-bold text-light hover:text-primary transition">
              Mumbai Jan Biryani
            </a>
          </div>
          <div class="flex items-center space-x-6">
            <a href="/" class="text-light hover:text-primary transition font-medium">Home</a>
            <a href="/menu" class="text-primary font-bold">Menu</a>
            <a href="/dashboard" class="text-light hover:text-primary transition font-medium">Admin</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderMenuContainer(): void {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  menuContainer.innerHTML = `
    <section class="bg-dark min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-bold text-light mb-4">Our Menu</h1>
          <p class="text-gray-400">Explore our delicious selection of traditional biryani and authentic dishes</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Filters Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-light mb-4">Filters</h2>
              
              <!-- Search -->
              <div class="mb-6">
                <label class="text-gray-300 font-medium block mb-2">Search</label>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search items..."
                  class="w-full px-4 py-2 rounded bg-dark text-light border border-gray-700 focus:border-primary outline-none"
                />
              </div>

              <!-- Category Filter -->
              <div>
                <label class="text-gray-300 font-medium block mb-3">Category</label>
                <div class="space-y-2">
                  <label class="flex items-center text-gray-300 cursor-pointer hover:text-primary transition">
                    <input type="checkbox" value="all" class="category-filter mr-3" checked />
                    All Categories
                  </label>
                  <label class="flex items-center text-gray-300 cursor-pointer hover:text-primary transition">
                    <input type="checkbox" value="Biryani" class="category-filter mr-3" />
                    Biryani
                  </label>
                  <label class="flex items-center text-gray-300 cursor-pointer hover:text-primary transition">
                    <input type="checkbox" value="Appetizers" class="category-filter mr-3" />
                    Appetizers
                  </label>
                  <label class="flex items-center text-gray-300 cursor-pointer hover:text-primary transition">
                    <input type="checkbox" value="Desserts" class="category-filter mr-3" />
                    Desserts
                  </label>
                  <label class="flex items-center text-gray-300 cursor-pointer hover:text-primary transition">
                    <input type="checkbox" value="Beverages" class="category-filter mr-3" />
                    Beverages
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Menu Items Grid -->
          <div class="lg:col-span-3" id="menu-grid">
            <!-- Items will be rendered here -->
          </div>
        </div>
      </div>
    </section>
  `;

  renderMenuItems(menuItems);
}

function renderMenuItems(items: MenuItem[]): void {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const itemsHtml = items
    .map(
      item => `
    <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/50 transition transform hover:scale-105 menu-item" data-id="${item.id}">
      <div class="w-full h-48 bg-gray-800 relative image-container flex items-center justify-center overflow-hidden">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover image-img" onerror="this.parentElement.innerHTML='<div class=&quot;flex flex-col items-center justify-center w-full h-full bg-gray-700&quot;><span class=&quot;text-4xl&quot;>🍛</span></div>'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
      <div class="p-4">
        <span class="inline-block bg-primary text-dark text-xs font-bold px-2 py-1 rounded mb-2">
          ${item.category}
        </span>
        <h3 class="text-xl font-bold text-light mb-2">${item.name}</h3>
        <p class="text-gray-300 text-sm mb-4">${item.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">₹${item.price}</span>
          <button class="add-to-cart-btn bg-primary text-dark font-bold py-1 px-2 text-sm rounded hover:bg-yellow-500 transition" data-id="${item.id}">
            Add
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  grid.innerHTML = itemsHtml || '<p class="col-span-full text-center text-gray-400">No items found</p>';

  // Attach event listeners
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const itemId = target.getAttribute('data-id');
      const item = menuItems.find(i => i.id === itemId);
      if (item) {
        CartManager.addItem(item);
        updateFloatingCart();
        showNotification(`${item.name} added to cart!`);
      }
    });
  });
}

function setupSearchAndFilter(): void {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const categoryFilters = document.querySelectorAll('.category-filter');

  const applyFilters = () => {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const selectedCategories = Array.from(categoryFilters)
      .filter(cb => (cb as HTMLInputElement).checked)
      .map(cb => (cb as HTMLInputElement).value)
      .filter(v => v !== 'all');

    filteredItems = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      return matchesSearch && matchesCategory;
    });

    renderMenuItems(filteredItems);
  };

  searchInput?.addEventListener('input', applyFilters);
  categoryFilters.forEach(cb => cb.addEventListener('change', applyFilters));
}

function renderFloatingCart(): void {
  const cartContainer = document.getElementById('floating-cart');
  if (!cartContainer) return;

  const cart = CartManager.getCart();
  const isExpanded = (cartContainer as any).expanded || false;

  cartContainer.innerHTML = `
    <div id="cart-wrapper" class="fixed bottom-6 right-6 z-50">
      ${
        isExpanded
          ? `
        <div class="bg-primary text-dark rounded-lg shadow-2xl p-3 max-w-xs max-h-80 overflow-y-auto mb-3">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-base font-bold">🛒 Cart</h2>
            <button id="cart-toggle" class="text-dark font-bold text-lg leading-none hover:text-red-600">×</button>
          </div>
          ${
            cart.items.length > 0
              ? `
            <div class="space-y-2 mb-3">
              ${cart.items
                .map(
                  item => `
                <div class="bg-yellow-600 rounded p-2 text-sm">
                  <p class="font-bold text-dark">${item.name}</p>
                  <div class="flex justify-between items-center mt-1">
                    <p class="text-xs text-gray-800">₹${item.price} x ${item.quantity}</p>
                    <button class="remove-btn text-red-600 font-bold text-xs" data-id="${item.id}">Remove</button>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
            <div class="border-t border-dark pt-2 mb-3">
              <p class="text-sm font-bold text-dark">Total: ₹${cart.total.toFixed(2)}</p>
            </div>
            <button id="checkout-btn" class="w-full bg-dark text-primary font-bold py-2 text-sm rounded hover:bg-gray-900 transition">
              Checkout
            </button>
          `
              : '<p class="text-dark text-center text-xs py-4">Your cart is empty</p>'
          }
        </div>
      `
          : ''
      }
      <button id="cart-toggle-btn" class="bg-primary text-dark rounded-full w-14 h-14 flex items-center justify-center font-bold text-2xl shadow-lg hover:shadow-xl hover:scale-110 transition">
        🛒<span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">${cart.items.length}</span>
      </button>
    </div>
  `;

  setupCartEventListeners();
}

function setupCartEventListeners(): void {
  const cartContainer = document.getElementById('floating-cart') as any;
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartToggle = document.getElementById('cart-toggle');

  // Toggle cart expansion
  cartToggleBtn?.addEventListener('click', () => {
    cartContainer.expanded = !cartContainer.expanded;
    updateFloatingCart();
  });

  cartToggle?.addEventListener('click', () => {
    cartContainer.expanded = false;
    updateFloatingCart();
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const itemId = target.getAttribute('data-id');
      if (itemId) {
        CartManager.removeItem(itemId);
        updateFloatingCart();
      }
    });
  });

  document.getElementById('checkout-btn')?.addEventListener('click', handleCheckout);
}

function setupCartEvents(): void {
  updateFloatingCart();
}

function updateFloatingCart(): void {
  renderFloatingCart();
}

async function handleCheckout(): Promise<void> {
  const cart = CartManager.getCart();

  if (cart.items.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const userName = prompt('Please enter your name:');
  if (!userName) return;

  const orderType = await new Promise<'Dine-in' | 'Delivery'>((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-gray-900 text-light rounded-lg p-8 max-w-md">
        <h3 class="text-2xl font-bold mb-6">Select Order Type</h3>
        <div class="space-y-4">
          <button class="order-type-btn w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-500 transition" data-type="Dine-in">
            🍽️ Dine-in
          </button>
          <button class="order-type-btn w-full border-2 border-primary text-primary font-bold py-3 rounded hover:bg-primary hover:text-dark transition" data-type="Delivery">
            🚚 Delivery
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.querySelectorAll('.order-type-btn').forEach(btn => {
      btn.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const type = target.getAttribute('data-type') as 'Dine-in' | 'Delivery';
        modal.remove();
        resolve(type);
      });
    });
  });

  // Generate order number
  const orderNumber = `MJB-${Date.now()}`;
  const timestamp = new Date().toLocaleString();

  // Generate PDF
  InvoiceGenerator.generatePDF({
    orderNumber,
    userName,
    orderType,
    items: cart.items,
    total: cart.total,
    timestamp,
  });

  // Show success message and WhatsApp redirect
  setTimeout(() => {
    const confirmWhatsApp = confirm(
      'PDF downloaded successfully! Would you like to send your order via WhatsApp?'
    );

    if (confirmWhatsApp) {
      const whatsappLink = WhatsAppIntegration.getWhatsAppLink({
        orderNumber,
        userName,
        orderType,
        items: cart.items,
        total: cart.total,
        timestamp,
      });
      window.open(whatsappLink, '_blank');
    }

    // Clear cart
    CartManager.clearCart();
    updateFloatingCart();
  }, 500);
}

function showNotification(message: string): void {
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 right-6 bg-primary text-dark font-bold px-6 py-3 rounded-lg shadow-lg animate-bounce z-40';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', initMenuPage);
