export default async function Failed({ searchParams }: { searchParams: Promise<{reason?: string; payment_id?: string; status?: string; tag?: string}> }) {
  const p = await searchParams;
  return <main className="wrap"><section className="card">
    <div className="logo" style={{background:'#dc2626'}}>!</div>
    <h1 className="bad">لم تكتمل عملية الدفع</h1>
    <p className="muted">لم يتم قبول حالة العملية من Spaceremit أو حدث خطأ أثناء التحقق.</p>
    <p><b>السبب:</b> {p.reason || p.status || 'غير معروف'} <span className="pill">{p.tag || '-'}</span></p>
    <a className="btn" style={{display:'block',textAlign:'center',textDecoration:'none'}} href="/">إعادة المحاولة</a>
  </section></main>
}
