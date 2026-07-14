import { CONTACT_DETAILS } from "@/config/contact";

export interface GmbReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
}

export const GMB_PROFILE = {
  businessName: "Js Choice - Care and Support",
  rating: 5,
  totalReviews: 13,
  googleMapsUrl: CONTACT_DETAILS.address.mapUrl,
};

/** Synced from Google Business Profile via `npm run fetch-gmb-reviews` */
export const GMB_REVIEWS: GmbReview[] = [
  {
    id: "Ci9DQUlRQUNvZENodHljRjlvT2pKSGF6TnJaelkyTmxCRU5rWmZSa2RVWmxZM1dsRRAB",
    author: "nishta rishi trikha",
    rating: 5,
    text: "Js Choice-Care and Support is a value based organisation,looking after vulnerable people with disability, ageing,their families and carers in holistic manner,by always promoting their rights ,choices and welfare at front of their services.This has been possible under the leadership of Ms Jannatul Fardowsi who heads the organisation in fairness and transparency.",
    relativeTime: "Recently",
  },
  {
    id: "ChZDSUhNMG9nS0VJQ0FnSUQzcElLRVFnEAE",
    author: "জীবন তো একটাই !",
    rating: 5,
    text: "Shared a 5-star rating on Google.",
    relativeTime: "1 month ago",
  },
  {
    id: "ChdDSUhNMG9nS0VPV3BuY2pHdGJIMXZBRRAB",
    author: "Sadoon Mukhtar",
    rating: 5,
    text: "I had a very positive experience with Js Choice - Care and Support. As a registered NDIS service provider, they genuinely prioritize their clients' needs and overall well-being. Jan and the entire team are compassionate, professional, and consistently go the extra mile to customize support plans according to individual goals. Their communication is clear, respectful, and empowering, which made me feel confident and well-supported throughout my care journey. I highly recommend Js Choice for anyone seeking dependable and empathetic support under the NDIS framework.",
    relativeTime: "1 month ago",
  },
  {
    id: "ChZDSUhNMG9nS0VQZTg5T0d2dEtxYkh3EAE",
    author: "Lucky Yeasmin",
    rating: 5,
    text: "Best service with love and care.",
    relativeTime: "4 months ago",
  },
  {
    id: "ChZDSUhNMG9nS0VKRzk0Y0QwNV9mSk1BEAE",
    author: "Monni Astorga",
    rating: 5,
    text: "Exceptional Services 💯 Always ready to Help and Support your Needs Strongly Recommend 💡",
    relativeTime: "4 months ago",
  },
  {
    id: "ChdDSUhNMG9nS0VMeV9nYkhhcGZLRHlBRRAB",
    author: "s.m.a fahim",
    rating: 5,
    text: "Building rapport with the client is more important for the business and that's what they are good at it. Highly recommended.",
    relativeTime: "4 months ago",
  },
  {
    id: "ChdDSUhNMG9nS0VQMmZ1LVNMaUxfTndBRRAB",
    author: "Modi Vishal",
    rating: 5,
    text: "Amazing team members with lived experience. Support workers are well trained and experienced. I wish them all the best.",
    relativeTime: "4 months ago",
  },
  {
    id: "ChZDSUhNMG9nS0VKS0JycnlnbnVpZExREAE",
    author: "PALAK SHARMA",
    rating: 5,
    text: "Highly recommended company Really good service The management is really supportive and helpful",
    relativeTime: "4 months ago",
  },
  {
    id: "ChZDSUhNMG9nS0VKbXRyOHE1cWRDcFVBEAE",
    author: "Nikki Malik",
    rating: 5,
    text: "I've had a wonderful experience with Js Choice - Care and Support. As a registered NDIS provider, they truly prioritize the needs and well-being of their clients. Jan and all the staff are caring, professional, and always go above and beyond to ensure that support is tailored to individual goals. Communication is clear and respectful, making me feel confident and supported every step of the way. I highly recommend Js Choice for anyone seeking reliable and compassionate care under the NDIS scheme.",
    relativeTime: "4 months ago",
  },
  {
    id: "ChdDSUhNMG9nS0VON0tpOFdpanVqd213RRAB",
    author: "Goldy Sharma",
    rating: 5,
    text: "Shared a 5-star rating on Google.",
    relativeTime: "4 months ago",
  },
  {
    id: "ChdDSUhNMG9nS0VJQ0FnSUQzaWVUcjhnRRAB",
    author: "sarica mogili",
    rating: 5,
    text: "Shared a 5-star rating on Google.",
    relativeTime: "7 months ago",
  },
  {
    id: "ChdDSUhNMG9nS0VJQ0FnSUQzNUxmdTBBRRAB",
    author: "Kulsum Akter (Anna khan)",
    rating: 5,
    text: "I was completely impressed with their professionalism and There services. Outstanding service! There support worker was attentive and helpful, making my experience exceptional.",
    relativeTime: "7 months ago",
  },
  {
    id: "ChZDSUhNMG9nS0VJQ0FnSUQzcFBMVVFnEAE",
    author: "Jyoti Sharma",
    rating: 5,
    text: "Shared a 5-star rating on Google.",
    relativeTime: "7 months ago",
  },
];
