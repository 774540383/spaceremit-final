# Spaceremit Final Payment Page

مشروع Next.js جاهز للنشر على Vercel.

## التشغيل المحلي
```bash
npm install
cp .env.example .env.local
npm run dev
```
افتح: http://localhost:3000

## متغيرات البيئة المطلوبة في Vercel
- NEXT_PUBLIC_SPACEREMIT_PUBLIC_KEY
- SPACEREMIT_SECRET_KEY
- ADMIN_PASSWORD
- NEXT_PUBLIC_BASE_URL = رابط موقعك على Vercel

## Callback URL داخل Spaceremit
ضع هذا الرابط:
```text
https://YOUR-DOMAIN.vercel.app/api/spaceremit/callback
```

## صفحات مهمة
- / صفحة الدفع
- /success نجاح
- /failed فشل
- /admin?pass=YOUR_PASSWORD سجل العمليات

## ملاحظة مهمة
السجل في هذه النسخة يستخدم ملفًا مؤقتًا على الخادم. على Vercel قد يُحذف السجل بعد فترة. للاستخدام التجاري اربطه بقاعدة بيانات مثل Supabase.
