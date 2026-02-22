import './style.css';
const featuredItems = [
    {
        id: '1',
        name: 'Hyderabadi Biryani',
        price: 299,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1618164436241-4473940571ce?w=500&h=500&fit=crop',
        description: 'Authentic Hyderabadi biryani with fragrant basmati rice and tender meat',
    },
    {
        id: '2',
        name: 'Lucknowi Biryani',
        price: 329,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=500&h=500&fit=crop',
        description: 'Royal Lucknowi style biryani with marinated meat and fragrant spices',
    },
    {
        id: '3',
        name: 'Paneer Biryani',
        price: 249,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop',
        description: 'Vegetarian delight with cottage cheese and aromatic rice',
    },
];
function initHomePage() {
    renderNavbar();
    renderHeroSection();
    renderFeaturedItems();
    renderFooter();
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
            <a href="/dashboard" class="text-light hover:text-primary transition font-medium">Admin</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}
function renderHeroSection() {
    const hero = document.getElementById('hero');
    if (!hero)
        return;
    hero.innerHTML = `
    <section class="min-h-screen bg-gradient-to-r from-dark via-gray-900 to-dark text-light flex items-center justify-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div class="mb-8">
          <span class="text-6xl animate-bounce">🍛</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span class="text-primary">Mumbai Jan Biryani</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">
          Experience the authentic taste of royal Mughlai cuisine, crafted with premium ingredients and traditional recipes.
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <a href="/menu" class="bg-primary text-dark font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105">
            Order Now
          </a>
          <button id="exploreBtn" class="border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary hover:text-dark transition">
            Explore Menu
          </button>
        </div>
      </div>
    </section>
  `;
    document.getElementById('exploreBtn')?.addEventListener('click', () => {
        const featured = document.getElementById('featured');
        featured?.scrollIntoView({ behavior: 'smooth' });
    });
}
function renderFeaturedItems() {
    const featured = document.getElementById('featured');
    if (!featured)
        return;
    const itemsHtml = featuredItems
        .map(item => `
    <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/50 transition transform hover:scale-105">
      <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-bold text-light mb-2">${item.name}</h3>
        <p class="text-gray-300 text-sm mb-4">${item.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">₹${item.price}</span>
          <a href="/menu" class="bg-primary text-dark font-bold py-2 px-4 rounded hover:bg-yellow-500 transition">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  `)
        .join('');
    featured.innerHTML = `
    <section class="bg-dark py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center text-light mb-4">Featured Biryani</h2>
        <p class="text-center text-gray-400 mb-12">Try our most popular dishes</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}
function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer)
        return;
    footer.innerHTML = `
    <footer class="bg-gray-900 text-light py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-lg font-bold text-primary mb-4">About Us</h3>
            <p class="text-gray-400">Premium biryani restaurant serving authentic Mughlai cuisine with traditional recipes.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-primary mb-4">Quick Links</h3>
            <ul class="text-gray-400 space-y-2">
              <li><a href="/" class="hover:text-primary transition">Home</a></li>
              <li><a href="/menu" class="hover:text-primary transition">Menu</a></li>
              <li><a href="/dashboard" class="hover:text-primary transition">Admin</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold text-primary mb-4">Contact</h3>
            <p class="text-gray-400">📍 Mumbai, India</p>
            <p class="text-gray-400">📞 +91 77188 38619</p>
            <p class="text-gray-400">✉️ order@mumbaijaan.com</p>
          </div>
        </div>
        <hr class="border-gray-800 mb-8">
        <p class="text-center text-gray-400">&copy; 2025 Mumbai Jan Biryani. All rights reserved.</p>
      </div>
    </footer>
  `;
}
document.addEventListener('DOMContentLoaded', initHomePage);
