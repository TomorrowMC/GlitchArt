import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import GlitchProvider from "@/context/GlitchContext"; // We'll create this

// Configure Font Awesome
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMD Glitch Signup",
  description: "A simulated signup experience with glitch art elements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white overflow-hidden`}>
        {/* Wrap the app in the Glitch Provider */}
        <GlitchProvider>
          {children}
        </GlitchProvider>
      </body>
    </html>
  );
}