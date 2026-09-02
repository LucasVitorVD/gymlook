      (function () {
        const WHATSAPP_NUMBER = "5561998612910";

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

        function photoSrc(p) {
          return p.photo && p.photo.length > 100
            ? `data:image/jpeg;base64,${p.photo}`
            : null;
        }

        const grid = document.getElementById("productGrid");
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

        products.forEach((p, i) => {
          const card = document.createElement("div");
          card.className = "card";
          card.dataset.cat = p.cat;
          card.dataset.index = i;
          const photo = photoSrc(p);
          card.innerHTML = `
      <div class="card-media">
        ${
          photo
            ? `<img class="card-photo" src="${photo}" alt="${p.name}" />`
            : `<div class="bg-mono">${monoLetter[p.icon]}</div>${iconSVG(p.icon, "#FF4F9A")}`
        }
        <div class="card-view">Ver detalhes</div>
      </div>
      <div class="card-info">
        <div>
          <h3>${p.name}</h3>
          <span class="cat">${p.type}</span>
        </div>
        <div class="price">${p.price}</div>
      </div>
    `;
          card.addEventListener("click", () => openModal(i));
          grid.appendChild(card);
        });

        document.getElementById("filters").addEventListener("click", (e) => {
          const btn = e.target.closest(".filter-btn");
          if (!btn) return;
          document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const f = btn.dataset.filter;
          document.querySelectorAll(".card").forEach((c) => {
            c.style.display = f === "all" || c.dataset.cat === f ? "" : "none";
          });
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

        function openModal(i) {
          const p = products[i];
          currentProduct = p;
          const photo = photoSrc(p);
          modalMedia.classList.toggle("has-photo", !!photo);
          modalMedia.innerHTML = photo
            ? `<img class="modal-photo" src="${photo}" alt="${p.name}" />`
            : iconSVG(p.icon, "#FF4F9A");
          modalCat.textContent = p.type;
          modalName.textContent = p.name;
          modalPrice.textContent = p.price;
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
              (c, idx) =>
                `<div class="color-chip${idx === 0 ? " active" : ""}" data-color="${c}"><span class="swatch" style="background:${colorHex[c] || "#cccccc"}"></span><span class="c-label">${c}</span></div>`,
            )
            .join("");

          overlay.classList.add("open");
          document.body.style.overflow = "hidden";
        }
        function closeModal() {
          overlay.classList.remove("open");
          document.body.style.overflow = "";
        }
        document
          .getElementById("modalClose")
          .addEventListener("click", closeModal);
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) closeModal();
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeModal();
        });

        sizeRow.addEventListener("click", (e) => {
          const pill = e.target.closest(".size-pill");
          if (!pill) return;
          sizeRow
            .querySelectorAll(".size-pill")
            .forEach((p) => p.classList.remove("active"));
          pill.classList.add("active");
        });
        colorRow.addEventListener("click", (e) => {
          const chip = e.target.closest(".color-chip");
          if (!chip) return;
          colorRow
            .querySelectorAll(".color-chip")
            .forEach((c) => c.classList.remove("active"));
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
            `Valor unitário: ${currentProduct.price}%0A%0A` +
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
        burger.addEventListener("click", () =>
          mainNav.classList.toggle("open"),
        );
        document
          .querySelectorAll(".nav-link")
          .forEach((l) =>
            l.addEventListener("click", () => mainNav.classList.remove("open")),
          );
      })();
