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
  title: {
    default: "JS Choice Group | Registered NDIS Provider in Melbourne",
    template: "%s | JS Choice Group",
  },
  description:
    "JS Choice Group Pty Ltd is a registered NDIS provider delivering compassionate disability support services across Melbourne and Victoria. Call 1300 572 464.",
  metadataBase: new URL("https://jschoicegroup.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://jschoicegroup.com.au",
    siteName: "JS Choice Group",
    title: "JS Choice Group | Registered NDIS Provider in Melbourne",
    description:
      "Compassionate, participant-centred NDIS support services across Melbourne. Assistance with daily life, support coordination, allied health, accommodation & more.",
    images: [
      {
        url: "/JCGLogo.png",
        width: 400,
        height: 200,
        alt: "JS Choice Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Choice Group | Registered NDIS Provider in Melbourne",
    description:
      "Compassionate, participant-centred NDIS support services across Melbourne and Victoria.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://jschoicegroup.com.au/#organization",
  name: "JS Choice Group Pty Ltd",
  legalName: "JS Choice Group Pty Ltd",
  url: "https://jschoicegroup.com.au",
  logo: "https://jschoicegroup.com.au/JCGLogo.png",
  image: "https://jschoicegroup.com.au/JCGLogo.png",
  description:
    "JS Choice Group is a registered NDIS provider delivering compassionate, participant-centred disability support services across Melbourne and Victoria.",
  telephone: "+611300572464",
  email: "info@jschoicegroup.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 106, Level 1, C5, 2 Main Street",
    addressLocality: "Point Cook",
    addressRegion: "VIC",
    postalCode: "3030",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.8841432,
    longitude: 144.7353927,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=100091940106564",
    "https://www.instagram.com/jschoicegroup",
  ],
  areaServed: {
    "@type": "State",
    name: "Victoria",
    addressCountry: "AU",
  },
  serviceType: "NDIS Disability Support Services",
  priceRange: "NDIS Funded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${dosis.variable} ${poppins.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
