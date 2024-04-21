import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tempo.",
  description: "collaborative music generation!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer theme="dark" />
        {children}
      </body>
    </html>
  );
}
