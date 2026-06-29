import { NextRequest, NextResponse } from 'next/server';
import { isAcceptedStatus, savePayment } from '@/lib/payments';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const data = payload?.data || payload;
    const paymentId = String(data.id || data.payment_id || 'unknown');
    const tag = String(data.status_tag || '').toUpperCase();
    savePayment({
      id: paymentId,
      paymentId,
      name: String(data.fullname || data.name || 'Callback'),
      amount: String(data.original_amount || data.total_amount || '0'),
      currency: String(data.currency || 'SAR'),
      status: String(data.status || 'Unknown'),
      statusTag: tag,
      accepted: payload?.response_status === 'success' && isAcceptedStatus(tag),
      raw: payload,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
