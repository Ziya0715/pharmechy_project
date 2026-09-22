import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, pageMetadata } from "@/lib/site";
import "@/styles/globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMetadata({
    title: "Metta Global Lifescience | Pharmaceutical Sourcing & Global Partnerships",
    description: SITE.description,
    path: "/",
    keywords: [
      "pharmaceutical sourcing company",
      "pharmaceutical suppliers",
      "pharmaceutical products",
      "pharmaceutical trading",
      "pharmaceutical business partner",
      "pharmaceutical B2B",
      "global pharmaceutical sourcing",
      "pharmaceutical sourcing India",
    ],
  }),
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  themeColor: "#0B3B2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${sans.className}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
