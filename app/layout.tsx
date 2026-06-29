import './globals.css';
export const metadata = { title: 'الدفع عبر Spaceremit', description: 'صفحة دفع مستقلة' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
