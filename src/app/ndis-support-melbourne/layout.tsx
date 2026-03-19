import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS Support Coordination Melbourne | JS Choice Group - Free Referral",
  description:
    "Trusted NDIS support coordination & daily life assistance in Melbourne. Registered provider serving 15+ areas across VIC. Request your free referral today. 1300 572 464",
  alternates: {
    canonical: "https://jschoicegroup.com.au/ndis-support-melbourne",
  },
  openGraph: {
    title:
      "NDIS Support Coordination Melbourne | JS Choice Group - Free Referral",
    description:
      "Trusted NDIS support coordination & daily life assistance in Melbourne. Registered provider serving 15+ areas across VIC. Request your free referral today. 1300 572 464",
    url: "https://jschoicegroup.com.au/ndis-support-melbourne",
    images: [
      {
        url: "/JCGLogo.png",
      },
    ],
  },
};

export default function NdisLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
