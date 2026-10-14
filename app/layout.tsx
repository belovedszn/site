import type { Metadata } from "next";
import "./globals.css";
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Plinth — the base your billing stands on",
  description: "Recurring billing & reconciliation, built for how Nigeria actually pays.",
  openGraph: { title: "Plinth", description: "Recurring billing infrastructure for Nigeria.", images: ["/lagos-bridge.png"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/plinth-logo.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/ClashDisplay-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
