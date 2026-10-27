/* =========================================================
   ZUNARI — MENU, NAVIGATION, BAG & ORDER REQUEST
   Plain JavaScript; no libraries required.
   ========================================================= */
"use strict";

document.documentElement.classList.add("js-ready");

const WHATSAPP_NUMBER = "254707976348"; // ZUNARI order line: 0707976348
const CART_STORAGE_KEY = "zunari-cart-v1";
const CURRENCY = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

const products = [
  // 12 BURGERS
  { id:"big-bite", name:"The Zunari Big Bite", category:"Burgers", price:650, image:"the-zunari-big-bite.jfif", badge:"BESTSELLER", description:"Double smash patties, melted cheese and our signature sauce." },
  { id:"classic-smash", name:"Classic Smash", category:"Burgers", price:450, image:"classic-smash.jfif", badge:"CLASSIC", description:"A juicy smashed patty, crisp lettuce and house dressing." },
  { id:"smoky-bbq", name:"Smoky BBQ Stack", category:"Burgers", price:700, image:"smoky-bbq-stack.jfif", badge:"SMOKY", description:"Smoky barbecue glaze, cheese and a toasted brioche bun." },
  { id:"double-trouble", name:"Double Trouble", category:"Burgers", price:750, image:"double-trouble.jfif", badge:"DOUBLE UP", description:"Two hearty patties stacked with gooey cheese." },
  { id:"crispy-chicken-burger", name:"Crispy Chicken Burger", category:"Burgers", price:520, image:"crispy-chicken-burger.jfif", badge:"CRUNCHY", description:"Golden crispy chicken, fresh greens and creamy sauce." },
  { id:"spicy-fire", name:"Spicy Fire Burger", category:"Burgers", price:550, image:"spicy-fire-burger.jfif", badge:"A LITTLE HEAT", description:"A bold spicy kick balanced with a cool house sauce." },
  { id:"mushroom-melt", name:"Mushroom Melt", category:"Burgers", price:580, image:"mushroom-melt.jfif", badge:"RICH & SAVOURY", description:"Sautéed mushrooms, melted cheese and a juicy patty." },
  { id:"veggie-burger", name:"Garden Veggie Burger", category:"Burgers", price:420, image:"classic-veggie-burger.jfif", badge:"VEGGIE", description:"A satisfying veggie patty with crisp greens and sauce." },
  { id:"zunari-supreme", name:"Zunari Supreme", category:"Burgers", price:800, image:"zunari-supreme.jfif", badge:"HOUSE FAVOURITE", description:"A generous, flavour-packed burger made for big cravings." },
  { id:"golden-crunch", name:"Golden Crunch Chicken", category:"Burgers", price:480, image:"chicken-deluxe.jfif", badge:"CRISPY", description:"Crunchy chicken, fresh lettuce and a soft toasted bun." },
  { id:"cheese-stack", name:"Triple Cheese Stack", category:"Burgers", price:680, image:"the-zunari-big-bite.jfif", badge:"EXTRA CHEESE", description:"A melty, cheesy stack with a toasted golden bun." },
  { id:"zunari-signature-burger", name:"Zunari Signature", category:"Burgers", price:720, image:"zunari-signature.jfif", badge:"SIGNATURE", description:"Our signature-style burger with rich, balanced flavours." },

  // 10 PIZZAS
  { id:"pepperoni", name:"Pepperoni Feast", category:"Pizza", price:1100, image:"pepperoni-feast.jfif", badge:"PIZZA FAVOURITE", description:"Pepperoni, rich tomato sauce and stretchy mozzarella." },
  { id:"bbq-chicken-pizza", name:"BBQ Chicken Pizza", category:"Pizza", price:1250, image:"bbq-chicken-pizza.jfif", badge:"SMOKY", description:"Barbecue chicken, melted cheese and a golden crust." },
  { id:"four-cheese", name:"Four Cheese", category:"Pizza", price:1200, image:"four-cheese-pizza.jfif", badge:"CHEESE LOVERS", description:"A rich blend of cheeses on a crisp, golden base." },
  { id:"margherita", name:"Margherita Classic", category:"Pizza", price:850, image:"margherita-classic.jfif", badge:"TIMELESS", description:"Tomato, mozzarella and fragrant herbs." },
  { id:"meat-lovers", name:"Meat Lovers", category:"Pizza", price:1350, image:"meat-lovers.jfif", badge:"LOADED", description:"A hearty selection of meaty toppings and melted cheese." },
  { id:"hawaiian", name:"Hawaiian Delight", category:"Pizza", price:1050, image:"hawaiian-delight.jfif", badge:"SWEET & SAVOURY", description:"Juicy pineapple, savoury toppings and mozzarella." },
  { id:"garden-veggie", name:"Garden Veggie Pizza", category:"Pizza", price:950, image:"garden-veggie-pizza.jfif", badge:"GARDEN FRESH", description:"Colourful vegetables, herbs and a crisp crust." },
  { id:"spicy-chicken-pizza", name:"Spicy Chicken Pizza", category:"Pizza", price:1200, image:"spicy-chicken-pizza.jfif", badge:"SPICY", description:"Seasoned chicken, a gentle chilli kick and cheese." },
  { id:"mushroom-pizza", name:"Mushroom Melt Pizza", category:"Pizza", price:1050, image:"mushroom-melt-pizza.jfif", badge:"EARTHY & RICH", description:"Mushrooms, mozzarella and a savoury tomato base." },
  { id:"cheese-lover", name:"Cheese Lover", category:"Pizza", price:1000, image:"cheese-lover.jfif", badge:"MELTY", description:"Golden bubbling cheese in every delicious slice." },

  // 10 CHICKEN
  { id:"classic-fried-chicken", name:"Classic Fried Chicken", category:"Chicken", price:480, image:"classic-fried-chicken.jfif", badge:"CRISPY CLASSIC", description:"Golden seasoned coating with juicy chicken inside." },
  { id:"hot-wings", name:"Hot Wings", category:"Chicken", price:450, image:"hot-wings.jfif", badge:"HOT", description:"Sticky, spicy wings for serious flavour seekers." },
  { id:"bbq-wings", name:"BBQ Chicken Wings", category:"Chicken", price:500, image:"bbq-chicken-wings.jfif", badge:"BBQ GLAZED", description:"Tender wings coated in smoky-sweet barbecue sauce." },
  { id:"garlic-wings", name:"Garlic Parmesan Wings", category:"Chicken", price:520, image:"garlic-parmesan-wings.jfif", badge:"GARLIC GOODNESS", description:"Garlicky wings finished with savoury parmesan flavour." },
  { id:"chicken-tenders", name:"Chicken Tenders", category:"Chicken", price:420, image:"chicken-tenders.jfif", badge:"DIP & CRUNCH", description:"Tender strips in a golden, crunchy coating." },
  { id:"chicken-nuggets", name:"Chicken Nuggets", category:"Chicken", price:350, image:"chicken-nuggets.jfif", badge:"SHAREABLE", description:"Bite-size crispy chicken, perfect for dipping." },
  { id:"grilled-chicken", name:"Grilled Chicken", category:"Chicken", price:650, image:"grilled-chicken.jfif", badge:"GRILLED", description:"Seasoned chicken grilled for a smoky, savoury finish." },
  { id:"chicken-bucket", name:"Chicken Bucket", category:"Chicken", price:1450, image:"chicken-bucket.jfif", badge:"FOR THE CREW", description:"A generous bucket made for sharing around the table." },
  { id:"chicken-wrap", name:"Chicken Wrap", category:"Chicken", price:450, image:"chicken-wrap.jfif", badge:"ON THE GO", description:"Seasoned chicken and fresh fillings wrapped to go." },
  { id:"chicken-combo", name:"Zunari Chicken Combo", category:"Chicken", price:850, image:"zunari-chicken-combo.jfif", badge:"COMBO", description:"A satisfying chicken combo with craveable sides." },

  // 10 SIDES
  { id:"golden-fries", name:"Golden French Fries", category:"Sides", price:220, image:"golden-french-fries.jfif", badge:"GOLDEN", description:"Hot, golden fries with a lightly seasoned finish." },
  { id:"loaded-fries", name:"Loaded Cheese Fries", category:"Sides", price:350, image:"loaded-cheese-fries.jfif", badge:"LOADED", description:"Crispy fries covered in a rich cheese topping." },
  { id:"potato-wedges", name:"Potato Wedges", category:"Sides", price:250, image:"potato-wedges.jfif", badge:"SEASONED", description:"Chunky potato wedges with a crisp outside." },
  { id:"onion-rings", name:"Crispy Onion Rings", category:"Sides", price:230, image:"onion-rings.jfif", badge:"CRUNCHY", description:"Sweet onion rings wrapped in a golden crunch." },
  { id:"mozzarella-sticks", name:"Mozzarella Sticks", category:"Sides", price:320, image:"mozzarella-sticks.jfif", badge:"CHEESY", description:"Crisp outside, gooey mozzarella centre." },
  { id:"garlic-bread", name:"Garlic Bread", category:"Sides", price:200, image:"garlic-bread.jfif", badge:"GARLIC BUTTER", description:"Warm, toasted bread with a savoury garlic finish." },
  { id:"coleslaw", name:"Creamy Coleslaw", category:"Sides", price:180, image:"coleslaw.jfif", badge:"FRESH SIDE", description:"A cool, creamy and crunchy side to balance the heat." },
  { id:"garden-salad", name:"Fresh Garden Salad", category:"Sides", price:280, image:"fresh-garden-salad.jfif", badge:"FRESH", description:"A crisp mix of garden vegetables." },
  { id:"snack-platter", name:"Snack Platter", category:"Sides", price:650, image:"snack-platter.jfif", badge:"TO SHARE", description:"A mix of savoury bites for a little bit of everything." },
  { id:"fries-combo", name:"Fries & Dip", category:"Sides", price:300, image:"golden-french-fries.jfif", badge:"DIP TIME", description:"Golden fries served with a tasty dipping sauce." },

  // 8 DRINKS
  { id:"fresh-lemonade", name:"Fresh Lemonade", category:"Drinks", price:180, image:"fresh-lemonade.jfif", badge:"REFRESHING", description:"Bright, citrusy and made for a refreshing break." },
  { id:"orange-juice", name:"Fresh Orange Juice", category:"Drinks", price:220, image:"fresh-orange-juice.jfif", badge:"CITRUS FRESH", description:"A sunny, fruity sip to go with your favourite bite." },
  { id:"chocolate-shake", name:"Chocolate Milkshake", category:"Drinks", price:300, image:"chocolate-milkshake.jfif", badge:"CREAMY", description:"A rich, chilled chocolate treat." },
  { id:"strawberry-shake", name:"Strawberry Milkshake", category:"Drinks", price:300, image:"strawberry-milkshake.jfif", badge:"BERRY GOOD", description:"A sweet, creamy strawberry classic." },
  { id:"vanilla-shake", name:"Vanilla Milkshake", category:"Drinks", price:280, image:"vanilla-milkshake.jfif", badge:"CLASSIC", description:"Smooth vanilla flavour in a chilled shake." },
  { id:"tropical-smoothie", name:"Tropical Smoothie", category:"Drinks", price:320, image:"tropical-smoothie.jfif", badge:"TROPICAL", description:"A fruity blend with bright tropical flavour." },
  { id:"iced-coffee", name:"Iced Coffee", category:"Drinks", price:250, image:"iced-coffee.jfif", badge:"COFFEE BREAK", description:"Chilled coffee with a smooth, bold finish." },
  { id:"iced-tea", name:"Iced Tea", category:"Drinks", price:200, image:"iced-tea.jfif", badge:"COOL DOWN", description:"A chilled tea refreshment, served over ice." }
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const formatMoney = (amount) => `KSh ${CURRENCY.format(amount)}`;

const menuGrid = $("#menuGrid");
const filterList = $("#filterList");
const menuCount = $("#menuCount");
const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const cartHeadingCount = $("#cartHeadingCount");
const cartSubtotal = $("#cartSubtotal");
const checkoutOverlay = $("#checkoutOverlay");
const checkoutTotal = $("#checkoutTotal");
const orderType = $("#orderType");
const deliveryFields = $("#deliveryFields");
const customerAddress = $("#customerAddress");
const toast = $("#toast");

let activeCategory = "All";
let toastTimer;
let lastFocusedElement = null;
let cart = loadCart();

function imagePath(fileName) {
  return `pictures/${fileName}`;
}

function safeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved
      .filter((entry) => products.some((product) => product.id === entry.id) && Number.isInteger(entry.quantity) && entry.quantity > 0)
      .map((entry) => ({ id: entry.id, quantity: Math.min(entry.quantity, 99) }));
  } catch (error) {
    console.warn("ZUNARI bag could not be restored from this browser.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("ZUNARI bag could not be saved in this browser.", error);
  }
}

function getCartDetails() {
  return cart.map((entry) => {
    const product = products.find((item) => item.id === entry.id);
    return product ? { ...product, quantity: entry.quantity, lineTotal: product.price * entry.quantity } : null;
  }).filter(Boolean);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getSubtotal() {
  return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

function renderMenu(category = activeCategory) {
  activeCategory = category;
  const visibleProducts = category === "All" ? products : products.filter((product) => product.category === category);
  menuCount.textContent = `${String(visibleProducts.length).padStart(2, "0")} ITEMS`;

  $$(".filter-btn", filterList).forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!visibleProducts.length) {
    menuGrid.innerHTML = '<p class="menu-empty">No items in this category yet. Check back soon.</p>';
    return;
  }

  menuGrid.innerHTML = visibleProducts.map((product, index) => `
    <article class="product-card" style="animation-delay:${Math.min(index * 35, 280)}ms">
      <div class="product-photo">
        <img src="${imagePath(product.image)}" alt="${safeText(product.name)}" loading="${index < 6 ? "eager" : "lazy"}" width="700" height="620" decoding="async">
        ${product.badge ? `<span class="product-badge">${safeText(product.badge)}</span>` : ""}
        <span class="product-index">${String(products.indexOf(product) + 1).padStart(2, "0")} / 50</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${safeText(product.category)}</span><span>ZUNARI SELECT</span></div>
        <h3 class="product-title">${safeText(product.name)}</h3>
        <p class="product-description">${safeText(product.description)}</p>
        <div class="product-bottom">
          <span class="product-price">${formatMoney(product.price)}</span>
          <button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${safeText(product.name)} to bag">ADD TO BAG <span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  `).join("");

  // Give menu images a clear fallback if a file is missing or renamed.
  $$("img", menuGrid).forEach((image) => {
    image.addEventListener("error", () => {
      image.closest(".product-photo").classList.add("image-missing");
      image.alt = `${image.alt} — image unavailable`;
      image.removeAttribute("src");
    }, { once: true });
  });
}

function renderCart() {
  const details = getCartDetails();
  const count = getCartCount();
  cartCount.textContent = count > 99 ? "99+" : String(count);
  cartHeadingCount.textContent = `(${count})`;
  cartSubtotal.textContent = formatMoney(getSubtotal());
  checkoutTotal.textContent = formatMoney(getSubtotal());

  if (!details.length) {
    cartItems.innerHTML = `<div class="empty-cart"><span>✳</span><h3>Your bag is waiting.</h3><p>Add something delicious from the menu.</p><button class="button button-dark" type="button" data-close-cart>BACK TO MENU</button></div>`;
    $("#checkoutBtn").disabled = true;
    return;
  }

  $("#checkoutBtn").disabled = false;
  cartItems.innerHTML = details.map((item) => `
    <article class="cart-item">
      <img src="${imagePath(item.image)}" alt="" loading="lazy" width="82" height="82">
      <div>
        <h3>${safeText(item.name)}</h3>
        <div class="cart-item-price">${formatMoney(item.price)} each</div>
        <div class="quantity-controls" aria-label="Quantity for ${safeText(item.name)}">
          <button type="button" data-quantity="${item.id}" data-change="-1" aria-label="Remove one ${safeText(item.name)}">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="${item.id}" data-change="1" aria-label="Add one ${safeText(item.name)}">+</button>
        </div>
      </div>
      <strong class="cart-item-total">${formatMoney(item.lineTotal)}</strong>
    </article>
  `).join("");
  $$("img", cartItems).forEach((image) => image.addEventListener("error", () => image.remove(), { once: true }));
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    if (existing.quantity >= 99) {
      showToast("You've reached the maximum quantity for this item.");
      return;
    }
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} added to your bag.`);
}

function changeQuantity(id, change) {
  const entry = cart.find((item) => item.id === id);
  if (!entry) return;
  entry.quantity += change;
  if (entry.quantity <= 0) cart = cart.filter((item) => item.id !== id);
  if (entry.quantity > 99) entry.quantity = 99;
  saveCart();
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function openCart() {
  closeMobileNav();
  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartDrawer.removeAttribute("inert");
  document.body.classList.add("no-scroll");
  $("#cartClose").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.setAttribute("inert", "");
  if (!checkoutOverlay.classList.contains("is-open")) document.body.classList.remove("no-scroll");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}

function openCheckout() {
  if (!cart.length) {
    showToast("Your bag is empty. Add something delicious first.");
    return;
  }
  closeCart();
  lastFocusedElement = document.activeElement;
  checkoutOverlay.classList.add("is-open");
  checkoutOverlay.setAttribute("aria-hidden", "false");
  checkoutOverlay.removeAttribute("inert");
  document.body.classList.add("no-scroll");
  syncDeliveryField();
  $("#customerName").focus();
}

function closeCheckout() {
  checkoutOverlay.classList.remove("is-open");
  checkoutOverlay.setAttribute("aria-hidden", "true");
  checkoutOverlay.setAttribute("inert", "");
  document.body.classList.remove("no-scroll");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}

function syncDeliveryField() {
  const needsAddress = orderType.value === "Delivery";
  deliveryFields.hidden = !needsAddress;
  customerAddress.required = needsAddress;
  if (!needsAddress) customerAddress.value = "";
}

function submitOrder(event) {
  event.preventDefault();
  if (!cart.length) {
    closeCheckout();
    showToast("Your bag is empty. Add something delicious first.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const name = String(form.get("customerName") || "").trim();
  const phone = String(form.get("customerPhone") || "").trim();
  const type = String(form.get("orderType") || "");
  const address = String(form.get("customerAddress") || "").trim();
  const notes = String(form.get("orderNotes") || "").trim();
  const payment = String(form.get("paymentMethod") || "");

  if (!name || !phone || (type === "Delivery" && !address)) {
    showToast("Please complete the required order details.");
    return;
  }

  const lines = getCartDetails().map((item) => `• ${item.name} × ${item.quantity} — ${formatMoney(item.lineTotal)}`);
  const message = [
    "Hello ZUNARI! I'd like to request an order.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Order type: ${type}`,
    ...(type === "Delivery" ? [`Delivery address: ${address}`] : []),
    `Preferred payment: ${payment}`,
    "",
    "ORDER:",
    ...lines,
    "",
    `Subtotal: ${formatMoney(getSubtotal())}`,
    "Delivery fee: Please confirm if applicable.",
    ...(notes ? ["", `Special instructions: ${notes}`] : []),
    "",
    "Please confirm availability and the final total. I understand this request is not confirmed until accepted."
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(whatsappUrl, "_blank");
  if (!newWindow) {
    // Opening WhatsApp is still a user-initiated action; show a copyable fallback.
    showToast("Your browser blocked the WhatsApp window. Allow pop-ups and submit again.");
    return;
  }
  if (newWindow) newWindow.opener = null;
  showToast("Order request prepared in WhatsApp. Send it there to contact ZUNARI.");
  closeCheckout();
}

function closeMobileNav() {
  const toggle = $("#mobileToggle");
  const nav = $("#mainNav");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}

function initNavigation() {
  const toggle = $("#mobileToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", willOpen);
  });

  $$(".nav-link", nav).forEach((link) => link.addEventListener("click", closeMobileNav));

  const sections = ["home", "menu", "offers", "gallery", "contact"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      $$(".nav-link", nav).forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", active);
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, .15, .35, .6] });
    sections.forEach((section) => navObserver.observe(section));
  }
}

function initReveal() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function initCursor() {
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let pointerX = -100;
  let pointerY = -100;
  let ringX = -100;
  let ringY = -100;
  let frame = 0;
  dot.style.opacity = "1";
  ring.style.opacity = "1";

  document.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = requestAnimationFrame(updateCursor);
  }, { passive: true });

  function updateCursor() {
    frame = 0;
    dot.style.left = `${pointerX}px`;
    dot.style.top = `${pointerY}px`;
    ringX += (pointerX - ringX) * .2;
    ringY += (pointerY - ringY) * .2;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    if (Math.abs(pointerX - ringX) > .2 || Math.abs(pointerY - ringY) > .2) frame = requestAnimationFrame(updateCursor);
  }

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, input, select, textarea, .product-card")) ring.classList.add("is-hovering");
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, input, select, textarea, .product-card")) ring.classList.remove("is-hovering");
  });
}

function initBackToTop() {
  const button = $("#backToTop");
  const update = () => button.classList.toggle("is-visible", window.scrollY > 650);
  window.addEventListener("scroll", update, { passive: true });
  update();
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
}

function initEvents() {
  filterList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (button) renderMenu(button.dataset.category);
  });

  menuGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
  });

  cartItems.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity]");
    if (quantityButton) changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
    if (event.target.closest("[data-close-cart]")) closeCart();
  });

  $("#cartTrigger").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", openCheckout);
  $("#checkoutClose").addEventListener("click", closeCheckout);
  checkoutOverlay.addEventListener("click", (event) => {
    if (event.target === checkoutOverlay) closeCheckout();
  });
  $("#orderForm").addEventListener("submit", submitOrder);
  orderType.addEventListener("change", syncDeliveryField);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (checkoutOverlay.classList.contains("is-open")) closeCheckout();
      else if (cartDrawer.classList.contains("is-open")) closeCart();
      closeMobileNav();
    }
  });

  // Close overlays if browser navigates to a hash section.
  window.addEventListener("hashchange", closeMobileNav);
}

function initImageFallbacks() {
  $$("img").forEach((image) => {
    if (image.closest("#menuGrid") || image.closest("#cartItems")) return;
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.alt = image.alt ? `${image.alt} (image unavailable)` : "Image unavailable";
    }, { once: true });
  });
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  renderMenu("All");
  renderCart();
  initNavigation();
  initReveal();
  initCursor();
  initBackToTop();
  initEvents();
  initImageFallbacks();
  syncDeliveryField();
}

document.addEventListener("DOMContentLoaded", init);
