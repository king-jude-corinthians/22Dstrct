import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "22 Dstrct | Web Development & Digital Marketing Studio",
  description: "22 Dstrct is a modern web development and digital marketing studio helping brands grow online with powerful websites and strategic marketing.",
  keywords: ["Web Development", "Digital Marketing", "UI/UX Design", "SEO", "Brand Identity", "E-commerce"],
  authors: [{ name: "22 Dstrct" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "22 Dstrct | Digital Experiences That Convert",
    description: "We build powerful websites and strategic marketing campaigns that drive results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "22 Dstrct | Digital Experiences That Convert",
    description: "We build powerful websites and strategic marketing campaigns that drive results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
