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
    "JS Choice Group is a registered NDIS provider delivering compassionate disability support services across Melbourne and Victoria. Call 1300 572 464.",
  metadataBase: new URL("https://jschoicegroup.com.au"),
  alternates: {
    canonical: "https://jschoicegroup.com.au",
    languages: {
      "en-AU": "https://jschoicegroup.com.au",
      "en": "https://jschoicegroup.com.au",
      "x-default": "https://jschoicegroup.com.au",
    },
  },
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
  verification: {
    google: "t4GDfxhYoa0Q3eJn8m43QhF2Te49K_d5h3R2J770R58",
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
    streetAddress: "Suite 104, Level 1, C5, 2 Main Street",
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
    <html lang="en-AU" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B22KVV2');`,
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "w8tknhz5wp");`,
          }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Meta Pixel */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1936942673852307');
fbq('track','PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1936942673852307&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className={`${dosis.variable} ${poppins.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B22KVV2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
