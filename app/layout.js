import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: "Redis Session Store Template",
  description: "A Next.js app with using Redis as a session store with NextAuth.js",
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      className={`${GeistMono.className}`}
    >
      <body className="bg-gray-100 min-h-screen relative">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        {/* GitHub Repository Button */}
        <a
          href="https://github.com/redis-developer/session-store-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 flex items-center p-3 bg-white rounded-full shadow hover:bg-gray-100"
        >
          {/* SVG Icon */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.373 0 12a12.013 12.013 0 007.766 11.386c.568.105.774-.242.774-.542 0-.268-.01-1.094-.015-1.985-3.155.687-3.82-1.521-3.82-1.521a3.009 3.009 0 00-1.262-1.664c-1.032-.706.078-.692.078-.692a2.394 2.394 0 011.744 1.175 2.396 2.396 0 003.28.938 2.399 2.399 0 01.715-1.5c-2.518-.286-5.162-1.26-5.162-5.604a4.389 4.389 0 011.175-3.052 4.09 4.09 0 01.112-3.012s.95-.304 3.113 1.173a10.78 10.78 0 015.646 0c2.162-1.477 3.112-1.173 3.112-1.173a4.086 4.086 0 01.113 3.012 4.384 4.384 0 011.175 3.052c0 4.356-2.65 5.316-5.177 5.595a2.706 2.706 0 01.773 2.107c0 1.521-.014 2.745-.014 3.121 0 .302.205.652.777.54A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  );
}
