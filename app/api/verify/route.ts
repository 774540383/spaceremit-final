import { NextRequest, NextResponse } from 'next/server';
import { isAcceptedStatus, savePayment } from '@/lib/payments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get('payment_id') || '';
  const name = searchParams.get('name') || 'عميل';
  const amount = searchParams.get('amount') || '0';
  const secret = process.env.SPACEREMIT_SECRET_KEY;
  const base = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

  if (!paymentId || !secret) {
    return NextResponse.redirect(`${base}/failed?reason=missing_config`);
  }

  try {
    const res = await fetch('https://spaceremit.com/api/v2/payment_info/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ private_key: secret, payment_id: paymentId }),
      cache: 'no-store'
    });
    const json = await res.json();
    const data = json?.data || {};
    const tag = String(data.status_tag || '').toUpperCase();
    const accepted = json?.response_status === 'success' && isAcceptedStatus(tag);

    savePayment({
      id: data.id || paymentId,
      paymentId,
      name,
      amount: String(data.original_amount || amount),
      currency: String(data.currency || 'SAR'),
      status: String(data.status || 'Unknown'),
      statusTag: tag,
      accepted,
      raw: json,
      createdAt: new Date().toISOString()
    });

    return NextResponse.redirect(`${base}/${accepted ? 'success' : 'failed'}?payment_id=${encodeURIComponent(paymentId)}&status=${encodeURIComponent(data.status || '')}&tag=${encodeURIComponent(tag)}`);
  } catch (e) {
    return NextResponse.redirect(`${base}/failed?reason=verify_error`);
  }
}
