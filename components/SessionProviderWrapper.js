"use client"; 

import { SessionProvider } from "next-auth/react"; 

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
