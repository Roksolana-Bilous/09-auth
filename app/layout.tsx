import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes",
    url: "https://08-zustand-ten-kappa.vercel.app/",
    images: {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub logo"
    },
    type: "article",
  }
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
})

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          {modal}
          {children}
            <Footer />
            </AuthProvider>
          </TanStackProvider>
      </body>
    </html>
  );
}