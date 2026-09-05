import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🚀 Highly optimized system font loaders
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents layout shifts during rendering
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 📊 Premium, Professional Lab SEO & Web App Metadata
export const metadata = {
  title: {
    default: "Milestone Gems Lab — POS & Inventory Management",
    template: "%s | Milestone Gems Lab"
  },
  description: "Secure internal gemstone inventory logging, certification authentication, and client POS billing framework for Milestone Gems Lab.",
  // Safeguards application viewport scaling across standard thermal setups and mobile tabs
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: {
    index: false, // Prevents search engines like Google from indexing your private secure dashboard
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-PK" // Optimized for local time formatting standards
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-slate-50 text-slate-800 antialiased flex flex-col selection:bg-indigo-600 selection:text-white">
        {/* Core Layout Content Stream */}
        {children}
      </body>
    </html>
  );
}

