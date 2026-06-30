'use client';

import Script from 'next/script';

export default function Home() {
  const publicKey = process.env.NEXT_PUBLIC_SPACEREMIT_PUBLIC_KEY || '';

  return (
    <main className="wrap">
      <section className="card">
        <div className="brand">
          <div className="logo">$</div>
          <div>
            <h1 style={{ margin: 0 }}>الدفع الآمن</h1>
            <p className="muted" style={{ margin: 0 }}>ادفع مباشرة عبر Spaceremit</p>
          </div>
        </div>

        {!publicKey && <p className="bad">تنبيه: المفتاح العام غير موجود في Vercel.</p>}

        <form id="spaceremit-form" style={{ width: '100%' }}>
          <input type="hidden" name="currency" value="USD" />
          <input type="hidden" name="email" value="customer@example.com" />
          <input type="hidden" name="phone" value="0000000000" />
          <input type="hidden" name="notes" value="دفع من صفحة مستقلة" />

          <div className="field">
            <label className="label">اسم العميل</label>
            <input className="input" name="fullname" required placeholder="اكتب اسمك" />
          </div>

          <div className="field">
            <label className="label">المبلغ بالدولار الأمريكي</label>
            <input className="input" name="amount" required type="number" min="1" step="0.01" placeholder="مثال: 1" />
          </div>

          <div className="paybox sp-one-type-select">
            <input type="radio" name="sp-pay-type-radio" value="local-methods-pay" id="sp_local_methods_radio" defaultChecked />
            <label htmlFor="sp_local_methods_radio"><div>وسائل الدفع المحلية</div></label>
            <div id="spaceremit-local-methods-pay"></div>
          </div>

          <div className="paybox sp-one-type-select">
            <input type="radio" name="sp-pay-type-radio" value="card-pay" id="sp_card_radio" />
            <label htmlFor="sp_card_radio"><div>الدفع بالبطاقة</div></label>
            <div id="spaceremit-card-pay"></div>
          </div>

          <button className="btn" type="submit">ادفع الآن</button>
        </form>
      </section>

      <Script id="spaceremit-config" strategy="beforeInteractive">
        {`
          window.SP_PUBLIC_KEY = "${publicKey}";
          window.SP_FORM_ID = "#spaceremit-form";
          window.SP_SELECT_RADIO_NAME = "sp-pay-type-radio";
          window.LOCAL_METHODS_BOX_STATUS = true;
          window.LOCAL_METHODS_PARENT_ID = "#spaceremit-local-methods-pay";
          window.CARD_BOX_STATUS = true;
          window.CARD_BOX_PARENT_ID = "#spaceremit-card-pay";
          window.SP_FORM_AUTO_SUBMIT_WHEN_GET_CODE = true;

          window.SP_SUCCESSFUL_PAYMENT = function(spaceremit_code) {
            var form = document.querySelector("#spaceremit-form");
            var name = encodeURIComponent(form.fullname.value || "Customer");
            var amount = encodeURIComponent(form.amount.value || "1");
            window.location.href = "/api/verify?payment_id=" + encodeURIComponent(spaceremit_code) + "&name=" + name + "&amount=" + amount + "&currency=USD";
          };

          window.SP_FAILD_PAYMENT = function() {
            window.location.href = "/failed?reason=payment_failed";
          };

          window.SP_RECIVED_MESSAGE = function(message) {
            alert(message);
          };

          window.SP_NEED_AUTH = function(target_auth_link) {
            window.location.href = target_auth_link;
          };
        `}
      </Script>

      <Script
        src="https://spaceremit.com/api/v2/js_script/spaceremit.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
