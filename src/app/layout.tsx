import type { Metadata } from "next";
import { Dosis, Poppins } from "next/font/google";
import "./globals.css";



const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "JS Choice Group - NDIS Service Provider",
  description: "Empowering Lives Through Inclusive Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${dosis.variable} ${poppins.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
