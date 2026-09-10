/* =========================================================
   MKM Furniture & Design — ملف الإعدادات والاتصال
   ========================================================= */

/* --- 1) بيانات Supabase --- */
const SUPABASE_URL = "https://qyokpuclebxluyxazjtl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_loeJHjlJ4G9a2tw-mnDKvw_Y3vQZKvY";

// سطر تهيئة عميل سوبابيس (لربط الموقع بقاعدة البيانات)
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* --- 2) بيانات المعرض --- */
const SITE = {
  name: "MKM",
  tagline: "FURNITURE & DESIGN",
  whatsapp: "966551234567",
  whatsappDisplay: "+966 55 123 4567",
  email: "info@mkm-furniture.com",
  instagram: "https://www.instagram.com/mkm.furniture2",
  facebook: "https://www.facebook.com/",
  tiktok: "",
  snapchat: "",
  hours: "يوميًا من 10:00 صباحًا حتى 11:00 مساءً",
};

/* --- 3) فروع المعرض (٤ فروع) --- */
const BRANCHES = [
  {
    name: "فرع الرياض — المعرض الرئيسي",
    address: "طريق الملك عبدالعزيز، حي الملز، الرياض",
    phone: "+966 55 123 4567",
    hours: "10 ص – 11 م",
    map: "https://maps.google.com/?q=Al+Malaz+Riyadh",
  },
  {
    name: "فرع جدة",
    address: "شارع التحلية، حي الأندلس، جدة",
    phone: "+966 55 123 4568",
    hours: "10 ص – 11 م",
    map: "https://maps.google.com/?q=Tahlia+Street+Jeddah",
  },
  {
    name: "فرع الدمام",
    address: "شارع الأمير محمد بن فهد، حي الشاطئ، الدمام",
    phone: "+966 55 123 4569",
    hours: "10 ص – 11 م",
    map: "https://maps.google.com/?q=Prince+Mohammed+bin+Fahd+Dammam",
  },
  {
    name: "فرع مكة المكرمة",
    address: "طريق العزيزية العام، حي العزيزية، مكة المكرمة",
    phone: "+966 55 123 4570",
    hours: "10 ص – 11 م",
    map: "https://maps.google.com/?q=Aziziyah+Makkah",
  },
];

/* --- 4) أقسام المنتجات --- */
const CATEGORIES = [
  { key: "sofa",     label: "كنب",              icon: "🛋️" },
  { key: "antrieh",  label: "أنتريهات",          icon: "🪑" },
  { key: "corner",   label: "ركنة",              icon: "📐" },
  { key: "bed",      label: "غرف نوم",          icon: "🛏️" },
  { key: "table",    label: "طاولات وترابيزات",   icon: "🪵" },
  { key: "accessory",label: "مستلزمات وديكور",    icon: "🕯️" },
];

/* --- 5) كلمة مرور لوحة التحكم --- */
const ADMIN_PASSCODE = "mkm2024";