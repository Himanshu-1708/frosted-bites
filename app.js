const STORAGE_KEYS = { users: "frosted_users", currentUser: "frosted_current_user", menu: "frosted_menu", cart: "frosted_cart", orders: "frosted_orders" };
const API = { auth: "/api/auth", menu: "/api/menu", orders: "/api/orders", admin: "/api/admin" };

const defaultMenu = [
  { id: "dish-1", name: "Black Truffle Burrata Tartine", category: "Sandwich", price: 545, rating: 4.9, description: "Artisan sourdough layered with burrata, truffle cream, basil oil, and peppered greens.", restaurant: "Maison Crave", address: "Bandra West, Mumbai", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-2", name: "Ember Smoke Luxe Burger", category: "Burger", price: 499, rating: 4.8, description: "Flame-grilled patty, caramelized onions, smoked cheddar, and house aioli on a brioche bun.", restaurant: "Coal & Crumb", address: "Indiranagar, Bengaluru", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-3", name: "Velvet Fire Pizza", category: "Pizza", price: 625, rating: 4.9, description: "Wood-fired pizza with roasted peppers, buffalo mozzarella, confit garlic, and chili honey.", restaurant: "Pomodoro Atelier", address: "GK II, Delhi", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-4", name: "Citrus Tonic Cooler", category: "Drinks", price: 215, rating: 4.6, description: "Sparkling citrus cooler with basil seeds, yuzu syrup, and fresh mint over ice.", restaurant: "Velvet Sip", address: "Jubilee Hills, Hyderabad", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80", bestSeller: false },
  { id: "dish-5", name: "Midnight Cocoa Dome", category: "Dessert", price: 325, rating: 4.7, description: "Glossy dark chocolate mousse dome with praline crunch and warm ganache center.", restaurant: "Noir Patisserie", address: "Koregaon Park, Pune", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80", bestSeller: false },
  { id: "dish-6", name: "Smoked Herb Chicken Bowl", category: "All Day", price: 575, rating: 4.8, description: "Herb chicken, charred vegetables, saffron rice, and creamy pepper drizzle.", restaurant: "Table 82", address: "Anna Nagar, Chennai", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-7", name: "Royal Paneer Tikka Platter", category: "Indian", price: 459, rating: 4.8, description: "Chargrilled paneer tikka served with mint chutney, onion salad, and saffron-spiced glaze.", restaurant: "Zafran Courtyard", address: "Andheri East, Mumbai", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-8", name: "Lucknowi Galouti Sliders", category: "Indian", price: 525, rating: 4.7, description: "Soft saffron buns filled with melt-in-the-mouth galouti kebabs and smoked onion relish.", restaurant: "Nawab Street Social", address: "Hazratganj, Lucknow", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-9", name: "Butter Chicken Kulcha Melt", category: "Indian", price: 485, rating: 4.9, description: "Creamy butter chicken tucked inside a flaky stuffed kulcha with charred capsicum and herbs.", restaurant: "Punjab Press Kitchen", address: "Rajouri Garden, Delhi", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-10", name: "Hyderabadi Dum Biryani", category: "Indian", price: 539, rating: 4.9, description: "Long-grain fragrant biryani layered with marinated chicken, caramelized onions, and raita.", restaurant: "Deccan Copper Pot", address: "Banjara Hills, Hyderabad", image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=900&q=80", bestSeller: true },
  { id: "dish-11", name: "Masala Chai Tres Leches", category: "Dessert", price: 295, rating: 4.6, description: "A soft fusion dessert infused with cardamom chai, cream, and toasted pistachios.", restaurant: "Sugar Bazaar", address: "Powai, Mumbai", image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=900&q=80", bestSeller: false },
  { id: "dish-12", name: "Rose Falooda Fizz", category: "Drinks", price: 245, rating: 4.7, description: "A chilled rose milk cooler finished with basil seeds, vermicelli, and vanilla espuma.", restaurant: "Sherbet Stories", address: "T. Nagar, Chennai", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80", bestSeller: false }
];

const readStore = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getCurrentUser = () => readStore(STORAGE_KEYS.currentUser, null);
const setCurrentUser = user => writeStore(STORAGE_KEYS.currentUser, user);
const getMenu = () => readStore(STORAGE_KEYS.menu, defaultMenu);
const setMenu = items => writeStore(STORAGE_KEYS.menu, items);
const getCart = () => readStore(STORAGE_KEYS.cart, []);
const setCart = items => writeStore(STORAGE_KEYS.cart, items);
const getOrders = () => readStore(STORAGE_KEYS.orders, []);
const setOrders = items => writeStore(STORAGE_KEYS.orders, items);
const formatCurrency = value => `Rs. ${Number(value).toFixed(0)}`;
const getInitials = username => (username || "U").slice(0, 2).toUpperCase();
const statusClass = status => status === "Dispatched" ? "status-dispatched" : status === "Delivered" ? "status-delivered" : "status-processing";

const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }
  return data;
};

const syncMenuFromApi = async () => {
  const items = await apiFetch(`${API.menu}/items`);
  setMenu(items);
  return items;
};

const syncOrdersFromApi = async userEmail => {
  const query = userEmail ? `?userEmail=${encodeURIComponent(userEmail)}` : "";
  const items = await apiFetch(`${API.orders}/orders${query}`);
  setOrders(items);
  return items;
};

const ensureDefaults = () => {
  if (!readStore(STORAGE_KEYS.menu, null)) writeStore(STORAGE_KEYS.menu, defaultMenu);
  if (!readStore(STORAGE_KEYS.users, null)) writeStore(STORAGE_KEYS.users, [{ username: "admin", email: "admin@frostedbites.com", password: "admin123", role: "admin" }]);
  if (!readStore(STORAGE_KEYS.cart, null)) writeStore(STORAGE_KEYS.cart, []);
  if (!readStore(STORAGE_KEYS.orders, null)) writeStore(STORAGE_KEYS.orders, []);
};

const updateHeaderState = () => {
  const user = getCurrentUser();
  const cartCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = cartCount; });
  document.querySelectorAll("[data-auth-button]").forEach(link => {
    if (!user) { link.textContent = "Sign In"; link.href = "auth.html"; return; }
    link.textContent = user.role === "admin" ? "Admin Panel" : "Profile";
    link.href = user.role === "admin" ? "admin.html" : "profile.html";
  });
  document.querySelectorAll("[data-profile-link]").forEach(link => {
    if (!user) { link.classList.add("hidden"); return; }
    link.classList.remove("hidden");
    link.textContent = getInitials(user.username);
    link.href = user.role === "admin" ? "admin.html" : "profile.html";
  });
};

const addToCart = dishId => {
  const dish = getMenu().find(item => item.id === dishId);
  if (!dish) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === dishId);
  if (existing) existing.quantity += 1;
  else cart.push({ ...dish, quantity: 1 });
  setCart(cart);
  updateHeaderState();
};

const renderDishCard = dish => `
  <article class="menu-card reveal visible">
    <div class="menu-card-media"><img src="${dish.image}" alt="${dish.name}"></div>
    <div class="menu-card-content">
      <div class="meta-row"><span>${dish.category}</span><span>Rating ${dish.rating} / 5</span></div>
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <p>${dish.restaurant} | ${dish.address}</p>
      <div class="card-actions">
        <div class="price-tag">${formatCurrency(dish.price)}</div>
        <button class="neo-btn add-cart-btn" type="button" data-dish-id="${dish.id}">Add to Cart</button>
      </div>
    </div>
  </article>
`;

const renderBestSellers = () => {
  const container = document.querySelector("[data-best-sellers]");
  if (!container) return;
  container.innerHTML = getMenu().filter(item => item.bestSeller).slice(0, 4).map(renderDishCard).join("");
};

const renderMenuPage = () => {
  const filterBar = document.querySelector("[data-filter-bar]");
  const menuGrid = document.querySelector("[data-menu-grid]");
  if (!filterBar || !menuGrid) return;
  const menu = getMenu();
  const categories = ["All", ...new Set(menu.map(item => item.category))];
  let active = "All";
  const draw = () => {
    filterBar.innerHTML = categories.map(category => `<button type="button" class="filter-chip ${category === active ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
    const filtered = active === "All" ? menu : menu.filter(item => item.category === active);
    menuGrid.innerHTML = filtered.map(renderDishCard).join("");
  };
  draw();
  filterBar.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    active = button.dataset.category;
    draw();
  });
};

const removeFromCart = dishId => {
  setCart(getCart().filter(item => item.id !== dishId));
  renderCartPage();
  updateHeaderState();
};

const renderCartPage = () => {
  const list = document.querySelector("[data-cart-list]");
  const summary = document.querySelector("[data-cart-summary]");
  if (!list || !summary) return;
  const cart = getCart();

  if (!cart.length) {
    list.innerHTML = `<div class="glass-panel"><h3>Your cart is empty</h3><p>Add dishes from the menu to continue to our premium checkout flow.</p><a class="neo-btn" href="menu.html">Browse Menu</a></div>`;
    summary.innerHTML = `<h3>Order Summary</h3><p>No items selected yet.</p>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 59;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  list.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.restaurant}</p>
        <p>Quantity: ${item.quantity}</p>
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
      </div>
      <button class="neo-btn secondary" type="button" data-remove-id="${item.id}">Remove</button>
    </article>
  `).join("");

  summary.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row"><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
    <div class="summary-row"><span>Delivery</span><strong>${formatCurrency(delivery)}</strong></div>
    <div class="summary-row"><span>Taxes</span><strong>${formatCurrency(taxes)}</strong></div>
    <div class="summary-row"><span>Total</span><strong>${formatCurrency(total)}</strong></div>
    <a class="neo-btn" href="payment.html">Proceed to Payment</a>
  `;

  list.querySelectorAll("[data-remove-id]").forEach(button => {
    button.addEventListener("click", () => removeFromCart(button.dataset.removeId));
  });
};

const renderPaymentPage = () => {
  const summary = document.querySelector("[data-payment-summary]");
  const form = document.querySelector("[data-payment-form]");
  const message = document.querySelector("[data-payment-message]");
  if (!summary || !form) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cart.length ? 59 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  summary.innerHTML = `
    <h3>Payment Summary</h3>
    ${cart.map(item => `<div class="summary-row"><span>${item.name} x ${item.quantity}</span><strong>${formatCurrency(item.price * item.quantity)}</strong></div>`).join("")}
    <div class="summary-row"><span>Total Payable</span><strong>${formatCurrency(total)}</strong></div>
    <p>Accepted: Credit Card, Debit Card, and premium wallet checkout.</p>
  `;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user || user.role !== "customer") {
      message.textContent = "Please sign in as a customer before completing payment.";
      return;
    }
    if (!cart.length) {
      message.textContent = "Your cart is empty. Add items before attempting payment.";
      return;
    }

    try {
      await apiFetch(`${API.orders}/orders`, {
        method: "POST",
        body: JSON.stringify({
          id: `order-${Date.now()}`,
          userEmail: user.email,
          username: user.username,
          status: "Food Processing",
          total,
          createdAt: new Date().toLocaleString(),
          items: cart.map(item => ({ name: item.name, quantity: item.quantity }))
        })
      });
      await syncOrdersFromApi(user.email);
      setCart([]);
      updateHeaderState();
      message.textContent = "Payment successful. Your order has been placed and is now in Food Processing.";
      setTimeout(() => { window.location.href = "profile.html"; }, 1200);
    } catch (error) {
      message.textContent = error.message;
    }
  });
};

const setupAuthPage = () => {
  const tabs = document.querySelectorAll("[data-auth-tab]");
  const forms = document.querySelectorAll("[data-auth-form]");
  const message = document.querySelector("[data-auth-message]");
  if (!tabs.length || !forms.length || !message) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.toggle("active", item === tab));
      forms.forEach(form => form.classList.toggle("hidden", form.dataset.authForm !== tab.dataset.authTab));
    });
  });

  forms.forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = {
        role: formData.get("role"),
        username: String(formData.get("username")).trim(),
        email: String(formData.get("email")).trim().toLowerCase(),
        password: String(formData.get("password")).trim()
      };

      try {
        const endpoint = form.dataset.authForm === "signup" ? "register" : "login";
        const result = await apiFetch(`${API.auth}/${endpoint}`, {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setCurrentUser(result.user);
        message.textContent = form.dataset.authForm === "signup"
          ? "Account created successfully. Redirecting you now."
          : "Welcome back. Redirecting you now.";

        setTimeout(() => {
          const user = getCurrentUser();
          window.location.href = user.role === "admin" ? "admin.html" : "index.html";
        }, 900);
      } catch (error) {
        message.textContent = error.message;
      }
    });
  });
};

const renderProfilePage = async () => {
  const card = document.querySelector("[data-profile-card]");
  const list = document.querySelector("[data-order-list]");
  if (!card || !list) return;
  const user = getCurrentUser();

  if (!user || user.role !== "customer") {
    card.innerHTML = `<h3>Customer access required</h3><p>Sign in as a customer to view your profile and live order status.</p><a class="neo-btn" href="auth.html">Sign In</a>`;
    list.innerHTML = "";
    return;
  }

  let orders = [];
  try {
    orders = await syncOrdersFromApi(user.email);
  } catch {
    orders = [];
  }
  card.innerHTML = `
    <div class="profile-avatar">${getInitials(user.username)}</div>
    <span class="eyebrow">Profile</span>
    <h2>${user.username}</h2>
    <p>${user.email}</p>
    <p>Role: Customer</p>
    <a class="neo-btn secondary" href="menu.html">Order More</a>
  `;

  if (!orders.length) {
    list.innerHTML = `<p>No orders yet. Once you complete payment, your live tracking updates will appear here.</p>`;
    return;
  }

  list.innerHTML = orders.map(order => `
    <article class="order-card">
      <div class="menu-card-content">
        <div class="order-head">
          <div><h3>${order.id}</h3><p>${order.createdAt}</p></div>
          <span class="status-pill ${statusClass(order.status)}">${order.status}</span>
        </div>
        <div class="order-items"><p>${order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}</p><strong>${formatCurrency(order.total)}</strong></div>
      </div>
    </article>
  `).join("");
};

const setupAdminPage = async () => {
  const user = getCurrentUser();
  const itemList = document.querySelector("[data-admin-items]");
  const orderList = document.querySelector("[data-admin-orders]");
  const form = document.querySelector("[data-admin-form]");
  const message = document.querySelector("[data-admin-message]");
  if (!itemList || !orderList || !form || !message) return;

  if (!user || user.role !== "admin") {
    itemList.innerHTML = `<p>Admin access required. Sign in with an admin account to manage dishes and orders.</p>`;
    orderList.innerHTML = "";
    form.classList.add("hidden");
    message.textContent = "Use the default admin credentials: username admin, email admin@frostedbites.com, password admin123.";
    return;
  }

  const drawItems = async () => {
    const items = await syncMenuFromApi();
    itemList.innerHTML = items.map(item => `
      <article class="admin-row">
        <img src="${item.image}" alt="${item.name}">
        <div><h3>${item.name}</h3><p>${item.restaurant} | ${item.address}</p><p>${item.category} | ${formatCurrency(item.price)}</p></div>
        <button class="neo-btn secondary" type="button" data-delete-id="${item.id}">Delete</button>
      </article>
    `).join("");
    itemList.querySelectorAll("[data-delete-id]").forEach(button => {
      button.addEventListener("click", async () => {
        await apiFetch(`${API.admin}/menu/${button.dataset.deleteId}`, { method: "DELETE" });
        await drawItems();
      });
    });
  };

  const drawOrders = async () => {
    const orders = await syncOrdersFromApi();
    if (!orders.length) {
      orderList.innerHTML = `<p>No live orders yet. Customer payments will populate this section.</p>`;
      return;
    }
    orderList.innerHTML = orders.map(order => `
      <article class="admin-row">
        <div><h3>${order.id}</h3><p>${order.username} | ${order.userEmail}</p><p>${order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}</p></div>
        <select data-order-id="${order.id}">
          <option value="Food Processing" ${order.status === "Food Processing" ? "selected" : ""}>Food Processing</option>
          <option value="Dispatched" ${order.status === "Dispatched" ? "selected" : ""}>Dispatched</option>
          <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </article>
    `).join("");
    orderList.querySelectorAll("select[data-order-id]").forEach(select => {
      select.addEventListener("change", async () => {
        await apiFetch(`${API.admin}/orders/${select.dataset.orderId}`, {
          method: "PATCH",
          body: JSON.stringify({ status: select.value })
        });
      });
    });
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(form);
    const imageFile = data.get("image");
    const newItem = {
      id: `dish-${Date.now()}`,
      name: String(data.get("name")),
      category: String(data.get("category")),
      price: Number(data.get("price")),
      rating: Number(data.get("rating")),
      description: String(data.get("description")),
      restaurant: String(data.get("restaurant")),
      address: String(data.get("address")),
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      bestSeller: false
    };

    const saveItem = async () => {
      await apiFetch(`${API.admin}/menu`, {
        method: "POST",
        body: JSON.stringify(newItem)
      });
      await drawItems();
      form.reset();
      message.textContent = "Dish added successfully and is now visible on the live menu.";
    };

    if (imageFile && imageFile.size) {
      const reader = new FileReader();
      reader.onload = async () => { newItem.image = reader.result; await saveItem(); };
      reader.readAsDataURL(imageFile);
      return;
    }
    await saveItem();
  });

  try {
    await drawItems();
    await drawOrders();
  } catch {
    itemList.innerHTML = `<p>Admin services are unavailable right now.</p>`;
    orderList.innerHTML = "";
  }
};

const bindAddToCartButtons = () => {
  document.body.addEventListener("click", event => {
    const button = event.target.closest(".add-cart-btn");
    if (!button) return;
    addToCart(button.dataset.dishId);
    button.textContent = "Added";
    setTimeout(() => { button.textContent = "Add to Cart"; }, 900);
  });
};

const setupRevealAnimations = () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", async () => {
  ensureDefaults();
  try {
    await syncMenuFromApi();
  } catch {}
  const user = getCurrentUser();
  if (user && user.role === "customer") {
    try {
      await syncOrdersFromApi(user.email);
    } catch {}
  }
  updateHeaderState();
  bindAddToCartButtons();
  setupRevealAnimations();
  renderBestSellers();
  renderMenuPage();
  renderCartPage();
  renderPaymentPage();
  setupAuthPage();
  renderProfilePage();
  setupAdminPage();
});

window.addEventListener("storage", () => {
  updateHeaderState();
  renderBestSellers();
  renderMenuPage();
  renderCartPage();
  renderProfilePage();
  setupAdminPage();
});
