import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import Image from 'next/image';
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
  title: "Data by Maia",
  description: "A blog where I share data stories, analysis, and visuals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ELZ1DCZPNK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ELZ1DCZPNK');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header with small logo */}
        <header className="bg-black border-b border-gray-600">
          <div className="px-6 py-3">
            <Link href="/" className="inline-block">
              <Image
                src="/data-by-maia-logo.png"
                alt="Data by Maia"
                width={120}
                height={48}
                priority
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-800 text-white py-4 text-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="space-x-4">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <span className="text-gray-500">|</span>
              <a href="mailto:maia.salti@gmail.com" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}