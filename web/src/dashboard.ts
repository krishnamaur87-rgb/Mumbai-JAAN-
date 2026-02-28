import './style.css';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

const ORDERS_STORAGE_KEY = 'mumbai_jaan_orders';
const ADMIN_SESSION_KEY = 'admin_session';
const MENU_STORAGE_KEY = 'mumbai_jaan_menu';

interface MenuItemData {
  id: string;
  name: string;
  price: number;
  category: 'Biryani' | 'Appetizers' | 'Desserts' | 'Beverages';
  image: string;
  description: string;
}

function initDashboard(): void {
  const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
  if (adminSession) {
    renderDashboard();
  } else {
    renderLoginForm();
  }
}

function renderNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
  const logoutBtn = adminSession
    ? `<button id="logout-btn" class="text-light hover:text-primary transition font-medium bg-red-600 px-4 py-2 rounded">Logout</button>`
    : '';

  navbar.innerHTML = `
    <nav class="bg-dark text-light shadow-lg sticky top-0 z-50">
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
            <a href="/menu" class="text-light hover:text-primary transition font-medium">Menu</a>
            <a href="/dashboard" class="text-primary font-bold">Admin</a>
            ${logoutBtn}
          </div>
        </div>
      </div>
    </nav>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    location.reload();
  });
}

function renderLoginForm(): void {
  renderNavbar();
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  container.innerHTML = `
    <section class="bg-dark min-h-screen py-12 flex items-center">
      <div class="max-w-md w-full mx-auto px-4">
        <div class="bg-gray-900 rounded-lg shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-light mb-2">Admin Portal</h1>
            <p class="text-gray-400">Phase 2 - Order & Menu Management</p>
          </div>

          <form id="login-form" class="space-y-6">
            <div>
              <label class="block text-light font-medium mb-2">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                class="w-full px-4 py-2 rounded bg-dark text-light border border-gray-700 focus:border-primary outline-none transition"
              />
            </div>

            <div>
              <label class="block text-light font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                class="w-full px-4 py-2 rounded bg-dark text-light border border-gray-700 focus:border-primary outline-none transition"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-primary text-dark font-bold py-2 rounded hover:bg-yellow-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  `;

  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
}

function handleLogin(e: Event): void {
  e.preventDefault();
  const username = (document.getElementById('username') as HTMLInputElement)?.value;
  const password = (document.getElementById('password') as HTMLInputElement)?.value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ username, loginTime: new Date() }));
    location.reload();
  } else {
    alert('Invalid credentials!');
  }
}

function renderDashboard(): void {
  renderNavbar();
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  const orders = getOrders();
  const currentTab = (container as any).currentTab || 'overview';

  container.innerHTML = `
    <section class="bg-dark min-h-screen py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Header -->
        <div class="mb-8 flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-light mb-2">Dashboard</h1>
            <p class="text-gray-400">Manage orders, menu, and analytics</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-8 border-b border-gray-700">
          <button id="tab-overview" class="px-6 py-3 font-bold transition border-b-2 ${currentTab === 'overview' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-primary'}">
            📊 Overview
          </button>
          <button id="tab-orders" class="px-6 py-3 font-bold transition border-b-2 ${currentTab === 'orders' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-primary'}">
            📦 Orders
          </button>
          <button id="tab-menu" class="px-6 py-3 font-bold transition border-b-2 ${currentTab === 'menu' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-primary'}">
            🍽️ Menu Items
          </button>
        </div>

        <!-- Tab Content -->
        <div id="tab-content"></div>
      </div>
    </section>
  `;

  // Tab switching
  document.getElementById('tab-overview')?.addEventListener('click', () => {
    (container as any).currentTab = 'overview';
    renderDashboard();
  });
  document.getElementById('tab-orders')?.addEventListener('click', () => {
    (container as any).currentTab = 'orders';
    renderDashboard();
  });
  document.getElementById('tab-menu')?.addEventListener('click', () => {
    (container as any).currentTab = 'menu';
    renderDashboard();
  });

  const tabContent = document.getElementById('tab-content');
  if (!tabContent) return;

  if (currentTab === 'overview') {
    renderOverviewTab(orders, tabContent);
  } else if (currentTab === 'orders') {
    renderOrdersTab(orders, tabContent);
  } else if (currentTab === 'menu') {
    renderMenuTab(tabContent);
  }
}

function renderOverviewTab(orders: any[], container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gray-900 rounded-lg p-6 border-l-4 border-primary">
        <p class="text-gray-400 text-sm mb-2">Total Orders</p>
        <p class="text-4xl font-bold text-primary">${orders.length}</p>
      </div>
      <div class="bg-gray-900 rounded-lg p-6 border-l-4 border-yellow-500">
        <p class="text-gray-400 text-sm mb-2">Total Revenue</p>
        <p class="text-4xl font-bold text-yellow-500">₹${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}</p>
      </div>
      <div class="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500">
        <p class="text-gray-400 text-sm mb-2">Avg Order Value</p>
        <p class="text-4xl font-bold text-green-500">₹${orders.length > 0 ? (orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length).toFixed(2) : '0'}</p>
      </div>
    </div>
  `;
}

function renderOrdersTab(orders: any[], container: HTMLElement): void {
  container.innerHTML = `
    <div class="bg-gray-900 rounded-lg overflow-hidden">
      <div class="p-6 border-b border-gray-700">
        <h2 class="text-2xl font-bold text-light">Orders</h2>
      </div>
      
      ${
        orders.length > 0
          ? `
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-800 border-b border-gray-700">
                <th class="px-6 py-4 text-left text-light font-bold">Order #</th>
                <th class="px-6 py-4 text-left text-light font-bold">Customer</th>
                <th class="px-6 py-4 text-left text-light font-bold">Items</th>
                <th class="px-6 py-4 text-left text-light font-bold">Type</th>
                <th class="px-6 py-4 text-left text-light font-bold">Total</th>
                <th class="px-6 py-4 text-left text-light font-bold">Time</th>
              </tr>
            </thead>
            <tbody>
              ${orders
                .reverse()
                .map(
                  (order, idx) => `
                <tr class="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td class="px-6 py-4 text-primary font-bold">${order.orderNumber}</td>
                  <td class="px-6 py-4 text-light">${order.userName}</td>
                  <td class="px-6 py-4 text-gray-300 text-sm">${order.items?.length || 0} items</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded text-sm font-bold ${
                      order.orderType === 'Dine-in'
                        ? 'bg-blue-600 text-white'
                        : 'bg-orange-600 text-white'
                    }">
                      ${order.orderType}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-primary font-bold">₹${(order.total || 0).toFixed(2)}</td>
                  <td class="px-6 py-4 text-gray-400 text-sm">${order.timestamp}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `
          : `
        <div class="p-8 text-center">
          <p class="text-gray-400 text-lg">No orders yet</p>
        </div>
      `
      }
    </div>
  `;
}

function renderMenuTab(container: HTMLElement): void {
  const menuItems = getMenuItems();

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Add New Item Form -->
      <div class="bg-gray-900 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-light mb-4">Add Menu Item</h2>
        <form id="add-item-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" id="item-name" placeholder="Item Name" class="px-4 py-2 rounded bg-dark text-light border border-gray-700" required />
          <input type="number" id="item-price" placeholder="Price (₹)" class="px-4 py-2 rounded bg-dark text-light border border-gray-700" step="0.01" required />
          
          <select id="item-category" class="px-4 py-2 rounded bg-dark text-light border border-gray-700" required>
            <option value="">Select Category</option>
            <option value="Biryani">Biryani</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>
          
          <input type="text" id="item-image" placeholder="Image URL (or auto-generated)" class="px-4 py-2 rounded bg-dark text-light border border-gray-700" />
          
          <textarea id="item-desc" placeholder="Description" class="md:col-span-2 px-4 py-2 rounded bg-dark text-light border border-gray-700" rows="2" required></textarea>
          
          <button type="submit" class="md:col-span-2 bg-primary text-dark font-bold py-2 rounded hover:bg-yellow-500 transition">
            Add Item
          </button>
        </form>
      </div>

      <!-- Menu Items -->
      <div class="bg-gray-900 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-light mb-4">Menu Items (${menuItems.length})</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${menuItems.map(item => `
            <div class="bg-gray-800 rounded p-4 border border-gray-700">
              <div class="w-full h-32 bg-gray-700 rounded mb-3 flex items-center justify-center overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=&quot;flex items-center justify-center w-full h-full&quot;><span class=&quot;text-2xl&quot;>🍛</span></div>'" />
              </div>
              <h3 class="font-bold text-light mb-1">${item.name}</h3>
              <p class="text-sm text-gray-400 mb-2">${item.category}</p>
              <p class="text-primary font-bold mb-2">₹${item.price.toFixed(2)}</p>
              <p class="text-xs text-gray-300 mb-3">${item.description}</p>
              <button onclick="deleteMenuItem('${item.id}')" class="w-full bg-red-600 text-white text-sm font-bold py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  (window as any).deleteMenuItem = (id: string) => {
    if (confirm('Delete this item?')) {
      deleteMenuItem(id);
      renderDashboard();
    }
  };

  document.getElementById('add-item-form')?.addEventListener('submit', handleAddMenuItem);
}

function handleAddMenuItem(e: Event): void {
  e.preventDefault();
  const name = (document.getElementById('item-name') as HTMLInputElement)?.value;
  const price = parseFloat((document.getElementById('item-price') as HTMLInputElement)?.value || '0');
  const category = (document.getElementById('item-category') as HTMLSelectElement)?.value as any;
  const image = (document.getElementById('item-image') as HTMLInputElement)?.value;
  const description = (document.getElementById('item-desc') as HTMLTextAreaElement)?.value;

  if (!name || !category || !description) {
    alert('Fill all required fields');
    return;
  }

  const getAutoImage = (cat: string) => {
    const foodImages = [
      'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/1213317/pexels-photo-1213317.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/3819547/pexels-photo-3819547.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      'https://images.pexels.com/photos/5737453/pexels-photo-5737453.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    ];
    return foodImages[Math.floor(Math.random() * foodImages.length)];
  };

  const newItem: MenuItemData = {
    id: `custom-${Date.now()}`,
    name,
    price,
    category,
    image: image || getAutoImage(category),
    description,
  };

  const items = getMenuItems();
  items.push(newItem);
  saveMenuItems(items);

  alert('Item added successfully!');
  renderDashboard();
}

function getMenuItems(): MenuItemData[] {
  const stored = localStorage.getItem(MENU_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMenuItems(items: MenuItemData[]): void {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
}

function deleteMenuItem(id: string): void {
  let items = getMenuItems();
  items = items.filter(i => i.id !== id);
  saveMenuItems(items);
}

function getOrders(): any[] {
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

document.addEventListener('DOMContentLoaded', initDashboard);

document.addEventListener('DOMContentLoaded', initDashboard);
