const WHATSAPP_NUMBER = "5561998612910";
const { fetchProducts } = await import('./sanity.js');

const icons = {
  bra: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 30 C20 22 30 18 35 25 L50 42 L65 25 C70 18 80 22 80 30 C80 42 68 52 50 58 C32 52 20 42 20 30 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  shorts: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 20 H72 L74 55 L58 85 L52 55 L48 55 L42 85 L26 55 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  tank: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 20 L28 30 L38 34 L38 85 L62 85 L62 34 L72 30 L68 20 Q50 28 32 20 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  hoodie: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 12 C40 12 34 20 34 26 L18 34 L26 46 L34 42 L34 88 L66 88 L66 42 L74 46 L82 34 L66 26 C66 20 60 12 50 12 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  set: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 20 C22 14 30 12 33 17 L42 28 L50 17 C53 12 61 14 61 20 C61 30 50 36 42 40 C34 36 22 30 22 20 Z" stroke="CLR" stroke-width="2.2"/><path d="M40 48 H84 L86 78 L78 96 L73 78 L71 78 L65 96 L56 78 Z" stroke="CLR" stroke-width="2.2" stroke-linejoin="round" transform="translate(-14,0)"/></svg>`,
  blusa: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 20 L26 28 L34 36 L36 34 L36 84 L64 84 L64 34 L66 36 L74 28 L65 20 Q50 30 35 20 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  macacao: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 14 L26 24 L34 30 L37 44 L33 55 L37 90 L48 90 L50 60 L52 90 L63 90 L67 55 L63 44 L66 30 L74 24 L67 14 Q50 24 33 14 Z" stroke="CLR" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
  calcinha: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 32 Q50 22 72 32 L66 56 Q50 78 50 78 Q50 78 34 56 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
  meia: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 14 H58 V54 Q58 60 64 62 L77 68 Q82 71 82 77 Q82 83 74 83 H46 Q40 83 40 75 V14 Z" stroke="CLR" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
};



function iconSVG(name, color) {
  return icons[name].replaceAll("CLR", color);
}

const monoLetter = {
  bra: "T",
  shorts: "S",
  tank: "R",
  hoodie: "J",
  set: "C",
  blusa: "B",
  macacao: "M",
  calcinha: "C",
  meia: "M",
};

function formatPrice(price) {
  if (!price) return "R$ 0,00";
  return price.startsWith("R$") ? price : `R$ ${price}`;
}

let products = [];
let currentPage = 1;
const perPage = 9;
const grid = document.getElementById("productGrid");
const paginationContainer = document.createElement("div");
paginationContainer.className = "pagination";
grid.parentNode.insertBefore(paginationContainer, grid.nextSibling);

function photoForColor(p, colorName) {
  if (!p.images || p.images.length === 0) return null;
  const found = p.images.find((img) => img.colorName === colorName);
  return found ? found.imageUrl : null;
}

function firstPhoto(p) {
  if (!p.images || p.images.length === 0) return null;
  return p.images[0].imageUrl || null;
}

function getFilteredProducts() {
  const btn = document.querySelector(".filter-btn.active");
  const f = btn ? btn.dataset.filter : "all";
  return f === "all" ? products : products.filter((p) => p.cat === f);
}

function renderGrid() {
  const filtered = getFilteredProducts();
  currentPage = Math.max(1, Math.min(currentPage, Math.ceil(filtered.length / perPage) || 1));
  const start = (currentPage - 1) * perPage;
  const pageProducts = filtered.slice(start, start + perPage);

  grid.innerHTML = "";
  if (pageProducts.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #666;">Nenhum produto encontrado.</p>`;
    renderPagination(filtered.length);
    return;
  }

  pageProducts.forEach((p, i) => {
    const photo = firstPhoto(p);
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.cat = p.cat;
    card.dataset.index = products.indexOf(p);
      card.innerHTML = `
        <div class="card-media">
          ${
            photo
              ? `<img class="card-photo" src="${photo}" alt="${p.name}" />`
              : `<div class="bg-mono">${monoLetter[p.icon] || 'P'}</div>${p.icon ? iconSVG(p.icon, "#FF4F9A") : iconSVG('set', "#FF4F9A")}`
          }
          <div class="card-view">Ver detalhes</div>
        </div>
        <div class="card-info">
          <div>
            <h3>${p.name}</h3>
            <span class="cat">${p.type}</span>
          </div>
          <div class="price">${formatPrice(p.price)}</div>
        </div>
      `;
    card.addEventListener("click", () => openModal(products.indexOf(p)));
    grid.appendChild(card);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / perPage) || 1;
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  paginationContainer.style.display = "flex";
  paginationContainer.style.justifyContent = "center";
  paginationContainer.style.gap = "8px";
  paginationContainer.style.marginTop = "40px";
  paginationContainer.style.flexWrap = "wrap";

  const createBtn = (text, active, disabled, handler) => {
    const b = document.createElement("button");
    b.textContent = text;
    b.disabled = disabled;
    b.className = "filter-btn";
    if (active) b.classList.add("active");
    b.addEventListener("click", handler);
    return b;
  };

  paginationContainer.appendChild(createBtn("Anterior", false, currentPage === 1, () => {
    currentPage--;
    renderGrid();
  }));

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.appendChild(createBtn(String(i), i === currentPage, false, () => {
      currentPage = i;
      renderGrid();
    }));
  }

  paginationContainer.appendChild(createBtn("Próximo", false, currentPage === totalPages, () => {
    currentPage++;
    renderGrid();
  }));
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentPage = 1;
  renderGrid();
});

const overlay = document.getElementById("modalOverlay");
const modalMedia = document.getElementById("modalMedia");
const modalCat = document.getElementById("modalCat");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const sizeRow = document.getElementById("sizeRow");
const colorRow = document.getElementById("colorRow");
const qtyNum = document.getElementById("qtyNum");
let qty = 1;
let currentProduct = null;
let currentColorIndex = 0;

function updateModalMedia() {
  if (!currentProduct) return;
  const activeColor = currentProduct.colors?.[currentColorIndex] || "";
  const imgUrl = photoForColor(currentProduct, activeColor);
  modalMedia.classList.toggle("has-photo", !!imgUrl);
    modalMedia.innerHTML = imgUrl
      ? `<img class="modal-photo" src="${imgUrl}" alt="${currentProduct.name}" />`
      : currentProduct.icon
        ? iconSVG(currentProduct.icon, "#FF4F9A")
        : iconSVG('set', "#FF4F9A");
}

function openModal(i) {
  const p = products[i];
  currentProduct = p;
  currentColorIndex = 0;
  const photo = firstPhoto(p);
  modalMedia.classList.toggle("has-photo", !!photo);
  modalMedia.innerHTML = photo
    ? `<img class="modal-photo" src="${photo}" alt="${p.name}" />`
    : p.icon
      ? iconSVG(p.icon, "#FF4F9A")
      : iconSVG('set', "#FF4F9A");
  modalCat.textContent = p.type;
  modalName.textContent = p.name;
  modalPrice.textContent = formatPrice(p.price);
  modalDesc.textContent = p.desc;
  qty = 1;
  qtyNum.textContent = qty;

  sizeRow.innerHTML = p.sizes
    .map(
      (s, idx) =>
        `<div class="size-pill${idx === 0 ? " active" : ""}" data-size="${s}">${s}</div>`,
    )
    .join("");

  colorRow.innerHTML = p.colors
    .map(
      (c, idx) => {
        const hex = currentProduct.colorHex?.[c] || "#cccccc";
        return `<div class="color-chip${idx === 0 ? " active" : ""}" data-color="${c}"><span class="swatch" style="background:${hex}"></span><span class="c-label">${c}</span></div>`;
      },
    )
    .join("");

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

sizeRow.addEventListener("click", (e) => {
  const pill = e.target.closest(".size-pill");
  if (!pill) return;
  sizeRow.querySelectorAll(".size-pill").forEach((p) => p.classList.remove("active"));
  pill.classList.add("active");
});
colorRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".color-chip");
  if (!chip) return;
  const colorName = chip.dataset.color;
  const idx = currentProduct.colors.findIndex((c) => c === colorName);
  if (idx !== -1) {
    currentColorIndex = idx;
    updateModalMedia();
  }
  colorRow.querySelectorAll(".color-chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
});
document.getElementById("qtyMinus").addEventListener("click", () => {
  qty = Math.max(1, qty - 1);
  qtyNum.textContent = qty;
});
document.getElementById("qtyPlus").addEventListener("click", () => {
  qty = Math.min(9, qty + 1);
  qtyNum.textContent = qty;
});

const toast = document.getElementById("toast");
document.getElementById("whatsappBtn").addEventListener("click", () => {
  if (!currentProduct) return;
  const size =
    sizeRow.querySelector(".size-pill.active")?.dataset.size || "";
  const color =
    colorRow.querySelector(".color-chip.active")?.dataset.color || "";
  const msg =
    `Olá! Quero fazer um pedido:%0A%0A` +
    `Produto: ${currentProduct.name}%0A` +
    `Cor: ${color}%0A` +
    `Tamanho: ${size}%0A` +
    `Quantidade: ${qty}%0A` +
    `Valor unitário: ${formatPrice(currentProduct.price)}%0A%0A` +
    `(Pedido feito pelo site Gymlook)`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  toast.textContent = "Abrindo WhatsApp ✓";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
  window.open(url, "_blank");
});

const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("solid", window.scrollY > 60);
});

const burger = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");
burger.addEventListener("click", () => mainNav.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach((l) =>
  l.addEventListener("click", () => mainNav.classList.remove("open")),
);

async function init() {
  try {
    products = await fetchProducts();
    console.log("Produtos carregados do Sanity:", products);
  } catch (err) {
    console.error("Erro ao carregar produtos do Sanity:", err);
    products = [];
  }
  renderGrid();
}

init();
