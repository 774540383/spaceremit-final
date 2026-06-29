export default async function Success({ searchParams }: { searchParams: Promise<{payment_id?: string; status?: string; tag?: string}> }) {
  const p = await searchParams;
  return <main className="wrap"><section className="card">
    <div className="logo" style={{background:'#059669'}}>✓</div>
    <h1 className="ok">تم الدفع بنجاح</h1>
    <p className="muted">تم التحقق من العملية عبر Spaceremit وتم قبول حالتها.</p>
    <p><b>رقم العملية:</b> {p.payment_id || '-'}</p>
    <p><b>الحالة:</b> {p.status || '-'} <span className="pill">{p.tag || '-'}</span></p>
    <a className="btn" style={{display:'block',textAlign:'center',textDecoration:'none'}} href="/">دفع جديد</a>
  </section></main>
}
