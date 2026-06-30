'use client';

import { useEffect } from 'react';

export default function Home() {
  const publicKey = process.env.NEXT_PUBLIC_SPACEREMIT_PUBLIC_KEY || '';

  useEffect(() => {
    const w = window as any;

    w.SP_PUBLIC_KEY = publicKey;
    w.SP_FORM_ID = '#spaceremit-form';
    w.SP_SELECT_RADIO_NAME = 'sp-pay-type-radio';

    w.LOCAL_METHODS_BOX_STATUS = true;
    w.LOCAL_METHODS_PARENT_ID = '#spaceremit-local-methods-pay';

    w.CARD_BOX_STATUS = true;
    w.CARD_BOX_PARENT_ID = '#spaceremit-card-pay';

    w.SP_FORM_AUTO_SUBMIT_WHEN_GET_CODE = false;

    w.SP_SUCCESSFUL_PAYMENT = function (spaceremit_code: string) {
      const form = document.getElementById('spaceremit-form') as HTMLFormElement;
      const data = new FormData(form);

      const name = encodeURIComponent(String(data.get('fullname') || 'Customer'));
      const amount = encodeURIComponent(String(data.get('amount') || '1'));

      window.location.href =
        '/api/verify?payment_id=' +
        encodeURIComponent(spaceremit_code) +
        '&name=' + name +
        '&amount=' + amount +
        '&currency=USD';
    };

    w.SP_FAILD_PAYMENT = function () {
      window.location.href = '/failed?reason=payment_failed';
    };

    w.SP_RECIVED_MESSAGE = function (message: string) {
      alert(message);
    };

    w.SP_NEED_AUTH = function (target_auth_link: string) {
      window.location.href = target_auth_link;
    };

    const old = document.getElementById('spaceremit-script');
    if (old) old.remove();

    const script = document.createElement('script');
    script.id = 'spaceremit-script';
    script.src = 'https://spaceremit.com/api/v2/js_script/spaceremit.js';
    script.async = false;
    document.body.appendChild(script);
  }, [publicKey]);

  return (
    <main className="wrap">
      <section className="card">
        <div className="brand">
          <div className="logo">$</div>
          <div>
            <h1 style={{ margin: 0 }}>الدفع الآمن</h1>
            <p className="muted" style={{ margin: 0 }}>
              ادفع مباشرة عبر Spaceremit
            </p>
          </div>
        </div>

        {!publicKey && (
          <p className="bad">تنبيه: المفتاح العام غير موجود في Vercel.</p>
        )}

        <form
          id="spaceremit-form"
          action="javascript:void(0)"
          style={{ width: '100%' }}
        >
          <input type="hidden" name="currency" value="USD" />
          <input type="hidden" name="email" value="customer@example.com" />
          <input type="hidden" name="phone" value="0000000000" />
          <input type="hidden" name="notes" value="دفع من صفحة مستقلة" />

          <div className="field">
            <label className="label">اسم العميل</label>
            <input
              className="input"
              name="fullname"
              required
              placeholder="اكتب اسمك"
            />
          </div>

          <div className="field">
            <label className="label">المبلغ بالدولار الأمريكي</label>
            <input
              className="input"
              name="amount"
              required
              type="number"
              min="1"
              step="0.01"
              placeholder="مثال: 1"
            />
          </div>

          <div className="paybox sp-one-type-select">
            <input
              type="radio"
              name="sp-pay-type-radio"
              value="local-methods-pay"
              id="sp_local_methods_radio"
              defaultChecked
            />
            <label htmlFor="sp_local_methods_radio">
              <div>وسائل الدفع المحلية</div>
            </label>
            <div id="spaceremit-local-methods-pay"></div>
          </div>

          <div className="paybox sp-one-type-select">
            <input
              type="radio"
              name="sp-pay-type-radio"
              value="card-pay"
              id="sp_card_radio"
            />
            <label htmlFor="sp_card_radio">
              <div>الدفع بالبطاقة</div>
            </label>
            <div id="spaceremit-card-pay"></div>
          </div>

          <button className="btn" type="submit">
            ادفع الآن
          </button>
        </form>

        <p className="muted" style={{ fontSize: 13 }}>
          جرّب أولًا مبلغ 1 دولار.
        </p>
      </section>
    </main>
  );
}
