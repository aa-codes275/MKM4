/* =========================================================
   MKM — المنطق المشترك (Supabase + واتساب + واجهات)
   ========================================================= */

/* ---------- Supabase ---------- */
const sb = (window.supabase && SUPABASE_URL.indexOf("YOUR-PROJECT-ID") === -1)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function sbReady() { return !!sb; }

/* ---------- أدوات ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const catLabel = (k) => (CATEGORIES.find(c => c.key === k) || {}).label || "منتج";
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="600" height="450" fill="#f3ede3"/><text x="50%" y="50%" font-size="26" fill="#b6a98f" text-anchor="middle" font-family="sans-serif">MKM</text></svg>`
);

function waLink(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

function firstImage(p) {
  if (Array.isArray(p.images) && p.images.length) return p.images[0];
  return p.image_url || PLACEHOLDER;
}
function allImages(p) {
  const arr = [];
  if (p.image_url) arr.push(p.image_url);
  if (Array.isArray(p.images)) p.images.forEach(i => { if (i && !arr.includes(i)) arr.push(i); });
  return arr.length ? arr : [PLACEHOLDER];
}

/* ---------- جلب المنتجات ---------- */
async function fetchProducts(category) {
  if (!sbReady()) return { data: null, error: "لم يتم ربط Supabase بعد. افتح js/config.js وأضف الرابط والمفتاح." };
  let q = sb.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (category && category !== "all") q = q.eq("category", category);
  const { data, error } = await q;
  return { data, error: error ? error.message : null };
}

async function fetchProduct(id) {
  if (!sbReady()) return { data: null, error: "لم يتم ربط Supabase بعد." };
  const { data, error } = await sb.from("products").select("*").eq("id", id).maybeSingle();
  return { data, error: error ? error.message : null };
}

/* ---------- الهيدر والفوتر ---------- */
function renderChrome(active) {
  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/5843617368209298030_121.jpg" alt="شعار معرض MKM للأثاث والتصميم">
          <span class="brand-txt"><strong>MKM</strong><span>FURNITURE &amp; DESIGN</span></span>
        </a>
        <button class="menu-btn" id="menu-btn" aria-label="القائمة">☰</button>
        <nav class="nav-links" id="nav-links">
          <a href="index.html" class="${active === 'home' ? 'active' : ''}">الرئيسية</a>
          <a href="products.html" class="${active === 'products' ? 'active' : ''}">المنتجات</a>
          <a href="booking.html" class="${active === 'booking' ? 'active' : ''}">حجز خدمة</a>
          <a href="connect.html" class="${active === 'connect' ? 'active' : ''}">QR والسوشيال</a>
          <a href="admin.html" class="${active === 'admin' ? 'active' : ''}"> </a>
        </nav>
      </div>`;
    $("#menu-btn").addEventListener("click", () => $("#nav-links").classList.toggle("open"));
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>MKM — FURNITURE &amp; DESIGN</h4>
            <p style="font-size:.9rem">معرض متخصص في الكنب والأنتريهات والركنات وكل مستلزمات المنزل، بتصنيع وخامات مختارة وتصميم يناسب ذوقك ومساحتك.</p>
            <p style="font-size:.9rem;margin-top:10px">${esc(SITE.hours)}</p>
          </div>
          <div>
            <h4>روابط سريعة</h4>
            <a href="products.html">المنتجات</a>
            <a href="booking.html">حجز خدمة / استفسار</a>
            <a href="connect.html">QR والسوشيال ميديا</a>
            <a href="index.html#branches">فروع المعرض</a>
          </div>
          <div>
            <h4>تواصل معنا</h4>
            <a href="${waLink('السلام عليكم، عايز أستفسر عن منتجات معرض MKM')}" target="_blank" rel="noopener">واتساب: ${esc(SITE.whatsappDisplay)}</a>
            <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">إنستجرام</a>
            ${SITE.facebook ? `<a href="${esc(SITE.facebook)}" target="_blank" rel="noopener">فيسبوك</a>` : ""}
            <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
          </div>
        </div>
        <div class="copy">© ${new Date().getFullYear()} MKM Furniture &amp; Design — جميع الحقوق محفوظة.</div>
      </div>`;
  }

  if (!$(".wa-float")) {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = waLink("السلام عليكم، عايز أستفسر عن منتجات معرض MKM");
    a.target = "_blank"; a.rel = "noopener"; a.title = "تواصل واتساب";
    a.textContent = "✆";
    document.body.appendChild(a);
  }
}

/* ---------- بطاقة منتج ---------- */
function productCard(p) {
  return `
    <a class="card" href="product.html?id=${encodeURIComponent(p.id)}">
      <img class="thumb" src="${esc(firstImage(p))}" alt="${esc(p.name)}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
      <div class="card-body">
        <span class="tag">${esc(catLabel(p.category))}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc((p.description || "").slice(0, 90))}</p>
        <span class="price-note">السعر يُحدَّد من المعرض عند التواصل</span>
      </div>
    </a>`;
}

/* ---------- شريط المنتجات السفلي ---------- */
function railItem(p) {
  return `
    <a class="rail-item" href="product.html?id=${encodeURIComponent(p.id)}">
      <img src="${esc(firstImage(p))}" alt="${esc(p.name)}" loading="lazy" onerror="this.src='${PLACEHOLDER}'">
      <div><strong>${esc(p.name)}</strong><span>${esc(catLabel(p.category))}</span></div>
    </a>`;
}
