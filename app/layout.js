import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";


export const metadata = {
  title: "Redis Session Store Template",
  description: "A Next.js app with authentication and protected routes",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistMono.className}`}
    >
      <body className="bg-gray-100 min-h-screen">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
