import './style.css';
import type { MenuItem } from './types';

const featuredItems: MenuItem[] = [
  {
    id: '1',
    name: 'Hyderabadi Royal Biryani',
    price: 299,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Authentic Hyderabadi biryani perfected over generations with fragrant basmati rice and tender meat',
  },
  {
    id: '2',
    name: 'Lucknowi Premium Biryani',
    price: 329,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Royal Lucknowi style biryani with marinated meat, fragrant spices, and premium basmati rice',
  },
  {
    id: '3',
    name: 'Vegetarian Paneer Biryani',
    price: 249,
    category: 'Biryani',
    image: 'https://images.pexels.com/photos/3819547/pexels-photo-3819547.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Vegetarian delight with cottage cheese, aromatic rice, and traditional spices',
  },
];

function initHomePage(): void {
  renderNavbar();
  renderHeroSection();
  renderAboutSection();
  renderFeaturedItems();
  renderCTASection();
  renderFooter();
}

function renderNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.innerHTML = `
    <nav class="bg-dark text-light shadow-2xl sticky top-0 z-50 border-b border-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3 group">
            <span class="text-3xl font-bold text-primary group-hover:scale-110 transition">🍛</span>
            <div>
              <a href="/" class="text-xl font-bold text-light hover:text-primary transition block">
                Mumbai Jan Biryani
              </a>
              <p class="text-xs text-gray-400">Premium Mughlai Cuisine</p>
            </div>
          </div>
          <div class="flex items-center space-x-8">
            <a href="/" class="text-light hover:text-primary transition font-medium">Home</a>
            <a href="/menu" class="text-light hover:text-primary transition font-medium">Menu</a>
            <a href="/dashboard" class="text-light hover:text-primary transition font-medium">Admin</a>
            <a href="/menu" class="bg-primary text-dark font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition">
              Order Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderHeroSection(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    <section class="min-h-screen bg-gradient-to-br from-dark via-gray-900 to-dark text-light flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-8 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 relative z-10">
        <div class="mb-8 inline-block">
          <span class="text-8xl animate-bounce">🍛</span>
        </div>
        
        <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Experience <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Royal Biryani</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto font-light">
          Authentic Mughlai cuisine crafted with premium ingredients and traditional recipes passed down through generations
        </p>
        
        <div class="flex justify-center gap-2 mb-8 text-primary text-sm">
          <span>⭐⭐⭐⭐⭐</span> <span class="text-gray-300">Hand-crafted with Love</span>
        </div>
        
        <div class="flex justify-center gap-4 flex-wrap">
          <a href="/menu" class="bg-gradient-to-r from-primary to-yellow-500 text-dark font-bold py-4 px-8 rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition transform hover:scale-105">
            🛒 Order Now
          </a>
          <button id="exploreBtn" class="border-2 border-primary text-primary font-bold py-4 px-8 rounded-lg hover:bg-primary hover:text-dark transition">
            Explore Menu
          </button>
        </div>
        
        <div class="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">🔥</p>
            <p class="text-gray-300 text-sm mt-2">Premium Quality</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">⚡</p>
            <p class="text-gray-300 text-sm mt-2">Fast Delivery</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">❤️</p>
            <p class="text-gray-300 text-sm mt-2">Made with Love</p>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('exploreBtn')?.addEventListener('click', () => {
    const featured = document.getElementById('featured');
    featured?.scrollIntoView({ behavior: 'smooth' });
  });
}

function renderAboutSection(): void {
  const about = document.createElement('section');
  about.className = 'py-16 bg-gray-900 border-t border-b border-gray-800';
  about.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-5xl mb-4">✨</div>
          <h3 class="text-xl font-bold text-light mb-2">Premium Ingredients</h3>
          <p class="text-gray-400">Only finest basmati rice, fresh spices, and quality meat</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">👨‍🍳</div>
          <h3 class="text-xl font-bold text-light mb-2">Expert Chefs</h3>
          <p class="text-gray-400">Recipes perfected over decades by traditional cooks</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">🌟</div>
          <h3 class="text-xl font-bold text-light mb-2">Authentic Taste</h3>
          <p class="text-gray-400">Traditional Mughlai cuisine from royal kitchens</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById('featured')?.parentNode?.insertBefore(about, document.getElementById('featured'));
}

function renderFeaturedItems(): void {
  const featured = document.getElementById('featured');
  if (!featured) return;

  featured.innerHTML = `
    <section class="py-16 bg-dark">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-light mb-4">
            <span class="text-primary">Featured</span> Specialties
          </h2>
          <p class="text-gray-400 text-lg">Try our most popular biryani varieties</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${featuredItems
            .map(
              item => `
            <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-primary/50 transition transform hover:scale-105 group">
              <div class="relative overflow-hidden h-64 bg-gray-700 flex items-center justify-center">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=&quot;absolute inset-0 flex flex-col items-center justify-center bg-gray-700&quot;><span class=&quot;text-5xl&quot;>🍛</span></div>'" />
                <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                <span class="absolute top-4 right-4 bg-primary text-dark font-bold px-4 py-1 rounded-full text-sm">
                  ${item.category}
                </span>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold text-light mb-3 group-hover:text-primary transition">
                  ${item.name}
                </h3>
                <p class="text-gray-300 mb-4">${item.description}</p>
                <div class="flex justify-between items-center">
                  <span class="text-3xl font-bold text-primary">₹${item.price}</span>
                  <a href="/menu" class="bg-primary text-dark font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition">
                    Order
                  </a>
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="text-center mt-12">
          <a href="/menu" class="inline-block bg-gradient-to-r from-primary to-yellow-500 text-dark font-bold py-4 px-12 rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition transform hover:scale-105">
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderCTASection(): void {
  const cta = document.createElement('section');
  cta.className = 'py-16 bg-gradient-to-r from-primary/20 to-yellow-500/20 border-y border-primary/30';
  cta.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-bold text-light mb-4">Ready to Taste Excellence?</h2>
      <p class="text-gray-300 mb-8 text-lg">Order now and enjoy authentic biryani delivered to your doorstep</p>
      <a href="/menu" class="inline-block bg-primary text-dark font-bold py-4 px-12 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105">
        Order Now - Fresh & Hot 🔥
      </a>
    </div>
  `;
  document.getElementById('footer')?.parentNode?.insertBefore(cta, document.getElementById('footer'));
}

function renderFooter(): void {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="bg-gray-900 border-t border-gray-800 text-gray-400 py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-light font-bold mb-4">Mumbai Jan Biryani</h3>
            <p class="text-sm">Premium Mughlai cuisine since day one. Crafted with love and authentic recipes.</p>
          </div>
          <div>
            <h3 class="text-light font-bold mb-4">Quick Links</h3>
            <ul class="text-sm space-y-2">
              <li><a href="/" class="hover:text-primary transition">Home</a></li>
              <li><a href="/menu" class="hover:text-primary transition">Menu</a></li>
              <li><a href="/dashboard" class="hover:text-primary transition">Admin</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-light font-bold mb-4">Categories</h3>
            <ul class="text-sm space-y-2">
              <li><a href="/menu" class="hover:text-primary transition">Biryani</a></li>
              <li><a href="/menu" class="hover:text-primary transition">Appetizers</a></li>
              <li><a href="/menu" class="hover:text-primary transition">Desserts</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-light font-bold mb-4">Contact</h3>
            <ul class="text-sm space-y-2">
              <li>📞 +91 98765 43210</li>
              <li>📧 hello@mumbaiJaan.com</li>
              <li>📍 Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 Mumbai Jan Biryani. All rights reserved. 🍛</p>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', initHomePage);
