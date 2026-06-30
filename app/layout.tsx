import './globals.css';

export const metadata = {
  title: 'Spaceremit Payment',
  description: 'Independent payment page',
  other: {
    'spaceremit-verification': 'EWA8FV9LM0QRNNPSMXASCXMFIOUFR63JL92K19MG8B9ARFI9RX',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
