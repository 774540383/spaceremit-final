import fs from 'fs';
import path from 'path';

export type PaymentRecord = {
  id: string;
  paymentId: string;
  name: string;
  amount: string;
  currency: string;
  status: string;
  statusTag: string;
  accepted: boolean;
  raw: any;
  createdAt: string;
};

const filePath = path.join('/tmp', 'spaceremit-payments.json');

export function readPayments(): PaymentRecord[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

export function savePayment(record: PaymentRecord) {
  const list = readPayments();
  const filtered = list.filter(x => x.paymentId !== record.paymentId);
  filtered.unshift(record);
  fs.writeFileSync(filePath, JSON.stringify(filtered.slice(0, 300), null, 2));
}

export function isAcceptedStatus(tag?: string) {
  return ['A','B','D','E','T'].includes(String(tag || '').toUpperCase());
}
