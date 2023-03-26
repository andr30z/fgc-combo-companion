import { Roboto } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "FGC Combo Companion",
  description: "FGC-COMBO-COMPANION",
};

const roboto = Roboto({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
