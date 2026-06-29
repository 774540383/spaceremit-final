import { readPayments } from '@/lib/payments';

export default async function Admin({ searchParams }: { searchParams: Promise<{pass?: string}> }) {
  const p = await searchParams;
  const pass = process.env.ADMIN_PASSWORD || '123456';
  if (p.pass !== pass) return <main className="wrap"><section className="card"><h1>سجل العمليات</h1><p className="muted">أضف كلمة المرور في الرابط:</p><code>/admin?pass=123456</code></section></main>;
  const list = readPayments();
  return <main className="admin"><h1>سجل عمليات الدفع</h1><p className="muted">ملاحظة: على Vercel السجل مؤقت. للنسخة التجارية استخدم قاعدة بيانات مثل Supabase.</p><table className="table"><thead><tr><th>الاسم</th><th>المبلغ</th><th>العملة</th><th>الحالة</th><th>الكود</th><th>التاريخ</th></tr></thead><tbody>{list.map((x,i)=><tr key={i}><td>{x.name}</td><td>{x.amount}</td><td>{x.currency}</td><td className={x.accepted?'ok':'bad'}>{x.status}</td><td>{x.statusTag}</td><td>{new Date(x.createdAt).toLocaleString('ar')}</td></tr>)}</tbody></table></main>
}
