import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spaceremit Payment",
  description: "Payment Page",
  verification: {
    other: {
      "spaceremit-verification":
        "EWA8FV9LM0QRNNPSMXASCXMFIOUFR63JL92K19MG8B9ARFI9RX",
    },
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
