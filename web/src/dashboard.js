import './style.css';
function initDashboard() {
    renderNavbar();
    renderDashboard();
}
function renderNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar)
        return;
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
          </div>
        </div>
      </div>
    </nav>
  `;
}
function renderDashboard() {
    const container = document.getElementById('dashboard-container');
    if (!container)
        return;
    container.innerHTML = `
    <section class="bg-dark min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Login Section -->
        <div id="login-section" class="bg-gray-900 rounded-lg shadow-lg p-8 max-w-md mx-auto my-12">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-light mb-2">Admin Login</h1>
            <p class="text-gray-400">Phase 2 - Coming Soon</p>
          </div>

          <form id="login-form" class="space-y-6">
            <div>
              <label class="block text-light font-medium mb-2">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                class="w-full px-4 py-2 rounded bg-dark text-light border border-gray-700 focus:border-primary outline-none transition"
                disabled
              />
            </div>

            <div>
              <label class="block text-light font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                class="w-full px-4 py-2 rounded bg-dark text-light border border-gray-700 focus:border-primary outline-none transition"
                disabled
              />
            </div>

            <button
              type="submit"
              class="w-full bg-gray-500 text-light font-bold py-2 rounded cursor-not-allowed opacity-50 transition"
              disabled
            >
              Login (Disabled)
            </button>
          </form>

          <div class="mt-8 p-6 bg-gray-800 rounded border border-gray-700">
            <h3 class="text-primary font-bold mb-4">📋 Phase 2 Features</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li>✓ Admin authentication with secure login</li>
              <li>✓ Real-time order management dashboard</li>
              <li>✓ Order status tracking (Pending, Preparing, Ready, Completed)</li>
              <li>✓ Daily sales and revenue analytics</li>
              <li>✓ Menu management (Add/Edit/Delete items)</li>
              <li>✓ Customer order history</li>
              <li>✓ Export reports (Daily/Monthly)</li>
            </ul>
          </div>
        </div>

        <!-- Feature Overview -->
        <div class="mt-16 bg-gray-900 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-light mb-8">Current Backend Features</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="border-l-4 border-primary pl-6">
              <h3 class="text-xl font-bold text-primary mb-3">✅ Completed Features</h3>
              <ul class="text-gray-300 space-y-2">
                <li>🍛 Full Menu System (11 items, 4 categories)</li>
                <li>🛒 Cart Management (Add/Remove/Quantity)</li>
                <li>📄 PDF Invoice Generation</li>
                <li>💬 WhatsApp Integration</li>
                <li>🎨 Responsive Design (Mobile-first)</li>
                <li>🔍 Search & Category Filters</li>
                <li>🌐 Multi-page Navigation</li>
              </ul>
            </div>

            <div class="border-l-4 border-yellow-500 pl-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-3">🚀 Phase 2 (Coming)</h3>
              <ul class="text-gray-300 space-y-2">
                <li>👤 Admin Authentication</li>
                <li>📊 Order Management System</li>
                <li>📈 Analytics Dashboard</li>
                <li>⚙️ Menu Editor</li>
                <li>📱 Real-time Notifications</li>
                <li>💳 Payment Integration</li>
                <li>📧 Email Receipts</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Demo Info -->
        <div class="mt-8 bg-gray-800 rounded-lg shadow-lg p-8 border border-primary">
          <h3 class="text-xl font-bold text-primary mb-4">🎯 How to Test the Application</h3>
          <ol class="text-gray-300 space-y-3 list-decimal list-inside">
            <li>Visit "Menu" to browse our biryani collection</li>
            <li>Use search and filters to find your favorite items</li>
            <li>Add items to cart and adjust quantities</li>
            <li>Click "Checkout" when ready to order</li>
            <li>Enter your name and select order type (Dine-in/Delivery)</li>
            <li>Download your PDF invoice automatically</li>
            <li>Send your order via WhatsApp directly</li>
          </ol>
        </div>

        <!-- Test Credentials Placeholder -->
        <div class="mt-8 bg-red-900/20 border border-red-500/50 rounded-lg p-8">
          <h3 class="text-lg font-bold text-red-400 mb-4">⚠️ Admin Access Disabled</h3>
          <p class="text-gray-300 mb-4">
            The admin dashboard is currently in Phase 2 development. Admin login functionality is disabled to keep the demo secure. The full admin panel with order management will be available in Phase 2.
          </p>
          <p class="text-gray-400 text-sm">
            In a production environment, this would include secure authentication, order management, and analytics.
          </p>
        </div>
      </div>
    </section>
  `;
}
document.addEventListener('DOMContentLoaded', initDashboard);
