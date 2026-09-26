# 🌿 ContCrops - سوق المحاصيل

> منصة سوق المحاصيل المصرية بتصميم انستجرام عصري - لعرض وبيع المحاصيل الزراعية مباشرة من الفلاح للتاجر

[[Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[[React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[[TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[[License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

🔗 **Live Demo:** https://contcrops-33d1--3000--d5306e6f.local-credentialless.webcontainer.io

---

## ✨ المميزات الرئيسية

### 🛒 السوق
- عرض المحاصيل مع صور، سعر، كمية، محافظة
- فلترة متقدمة (نوع المحصول، المحافظة، السعر)
- بحث فوري
- إضافة محصول جديد مع رفع صور

### 📸 الحالات (Stories) 
- ستوري فوق السوق زي انستجرام وفيسبوك
- فتح فول سكرين مع Progress Bar
- إضافة ستوري جديدة

### 👤 البروفايل - تصميم انستجرام
- شبكة 3x3 للمنشورات
- 4 تابات على الشمال تحت البروفايل:
  - **منشوراتي** - اللي نشرته في السوق
  - **مشاركاتي** - اللي شاركته لبروفايلي 🔁
  - **الثريد** - بوستات الثريد المنفصلة
  - **المحفوظات** - البوستات المحفوظة 🔖
- تعديل الملف الشخصي ✎ (الاسم، المحافظة، لون البروفايل، رقم واتساب)

### 💬 التفاعل
- لايك ❤️ + كومنت 💬 + مشاركة 🔁 + مشاركة لبروفايلي
- حفظ البوست 🔖
- إبلاغ وحظر 🚩🚫 من الـ 3 نقط فوق كل بوست

### 🔔 الإشعارات
- إشعارات لحظية لما حد يعمل لايك أو كومنت على بوستاتك
- Badge أحمر بعدد الإشعارات الجديدة

### 🧵 الثريد
- قسم ثريد منفصل تماما عن السوق
- للمناقشات والنصائح الزراعية

---

## 🚀 التقنيات المستخدمة

- **Next.js 14** - App Router
- **React 18** - Hooks + Context
- **Tailwind CSS 3.4** - تصميم عصري
- **Lucide React** - أيقونات
- **LocalStorage** - حفظ البيانات محليا (بدون باك إند)

---

## 📦 التثبيت والتشغيل

### 1. فك الضغط وتثبيت الحزم
```bash
npm install
# أو
yarn install
# أو
pnpm install
```

### 2. تشغيل المشروع
```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### 3. بناء للإنتاج
```bash
npm run build
npm start
```

---

## 🌐 الرفع على الإنترنت

### Bolt.new (الأسهل)
1. افتح [bolt.new](https://bolt.new) في Incognito
2. ارفع فولدر المشروع
3. دوس Deploy → هيديك لينك `contcrops-xxx.bolt.host`

### Vercel (مستحسن)
1. ارفع المشروع على GitHub
2. ادخل [vercel.com](https://vercel.com) → Import Project → اختار الريبو
3. دوس Deploy → هيشتغل تلقائيا

### Netlify
```bash
npm run build
# ارفع فولدر out على Netlify
```

---

## 📁 هيكل المشروع

```
contcrops/
├── src/
│   └── app/
│       ├── page.tsx        # الصفحة الرئيسية - كل المنطق والتصميم
│       ├── layout.tsx      # الـ Layout + تحميل الفونتات
│       └── globals.css     # ستايلات Tailwind العامة
├── public/
│   ├── icon-192.png
│   └── icon-512.png
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🔧 حل المشاكل الشائعة

### خطأ Hydration Error
```bash
# السبب: @import جوه الكود
# الحل: النسخة الحالية متصلحة - الفونتات في layout.tsx فقط
```

### شاشة بيضاء في Bolt
```bash
# امسح ملفات Vite القديمة
rm -rf index.html tsconfig.app.json eslint.config.js .next
npm install
npm run dev
```

### فصل المشروع عن GitHub
```bash
git remote remove origin
# أو مسح الـ git خالص
rm -rf .git
```

---

## 🤝 المساهمة

مرحب بأي مساهمات! 

1. اعمل Fork للمشروع
2. اعمل Branch جديد (`git checkout -b feature/AmazingFeature`)
3. اعمل Commit (`git commit -m 'Add AmazingFeature'`)
4. اعمل Push (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📝 الترخيص

MIT License - شوف ملف [LICENSE](LICENSE)

---

## 👨‍💻 المطور

**ProlificTrading99-pixel**

- GitHub: [@prolifictrading99-pixel](https://github.com/prolifictrading99-pixel)
- Project: [ContCrops](https://github.com/prolifictrading99-pixel/contcrops)

---

## 🙏 شكر خاص

- تصميم مستوحى من Instagram & Facebook
- مبني بـ ❤️ للفلاح المصري

> **ContCrops - من الأرض للسوق مباشرة** 🌾
