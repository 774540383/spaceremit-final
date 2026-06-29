export default function Home() {
  const publicKey = process.env.NEXT_PUBLIC_SPACEREMIT_PUBLIC_KEY || '';

  return <main className="wrap">
    <section className="card">
      <div className="brand">
        <div className="logo">$</div>
        <div>
          <h1 style={{margin:0}}>الدفع الآمن</h1>
          <p className="muted" style={{margin:0}}>ادفع مباشرة عبر Spaceremit</p>
        </div>
      </div>

      {!publicKey && <p className="bad">تنبيه: ضع NEXT_PUBLIC_SPACEREMIT_PUBLIC_KEY في Vercel قبل التجربة.</p>}

      <form id="spaceremit-form">
        <div className="field">
          <label className="label">اسم العميل</label>
          <input className="input" name="fullname" required placeholder="اكتب اسمك" />
        </div>

        <div className="field">
          <label className="label">المبلغ بالدولار الأمريكي</label>
          <input className="input" id="amountInput" name="amount" required type="number" min="1" step="0.01" placeholder="مثال: 10" />
        </div>

        <input type="hidden" name="currency" value="USD" />
        <input type="hidden" name="email" value="customer@example.com" />
        <input type="hidden" name="phone" value="0000000000" />
        <input type="hidden" name="notes" id="notesInput" value="دفع من صفحة مستقلة" />

        <div className="paybox">
          <label>
            <input type="radio" name="sp-pay-type-radio" value="local-methods-pay" id="sp_local_methods_radio" defaultChecked />
            وسائل الدفع المحلية
          </label>
          <div id="spaceremit-local-methods-pay"></div>
        </div>

        <div className="paybox">
          <label>
            <input type="radio" name="sp-pay-type-radio" value="card-pay" id="sp_card_radio" />
            الدفع بالبطاقة
          </label>
          <div id="spaceremit-card-pay"></div>
        </div>

        <button className="btn" type="submit">ادفع الآن</button>
      </form>

      <p className="muted" style={{fontSize:13}}>
        بعد الدفع سيتم التحقق تلقائيًا من Spaceremit ثم عرض نتيجة العملية.
      </p>
    </section>

    <script dangerouslySetInnerHTML={{__html: `
      const SP_PUBLIC_KEY = "${publicKey}";
      const SP_FORM_ID = "#spaceremit-form";
      const SP_SELECT_RADIO_NAME = "sp-pay-type-radio";

      const LOCAL_METHODS_BOX_STATUS = true;
      const LOCAL_METHODS_PARENT_ID = "#spaceremit-local-methods-pay";

      const CARD_BOX_STATUS = true;
      const CARD_BOX_PARENT_ID = "#spaceremit-card-pay";

      let SP_FORM_AUTO_SUBMIT_WHEN_GET_CODE = true;

      function SP_SUCCESSFUL_PAYMENT(spaceremit_code) {
        const form = document.querySelector('#spaceremit-form');
        const name = encodeURIComponent(form.fullname.value || 'عميل');
        const amount = encodeURIComponent(form.amount.value || '0');

        window.location.href =
          '/api/verify?payment_id=' +
          encodeURIComponent(spaceremit_code) +
          '&name=' + name +
          '&amount=' + amount +
          '&currency=USD';
      }

      function SP_FAILD_PAYMENT() {
        window.location.href = '/failed?reason=payment_failed';
      }

      function SP_RECIVED_MESSAGE(message) {
        alert(message);
      }

      function SP_NEED_AUTH(target_auth_link) {
        window.location.href = target_auth_link;
      }
    `}} />

    <script src="https://spaceremit.com/api/v2/js_script/spaceremit.js"></script>
  </main>
}
