export type HomeFaqLink = {
    text: string;
    href: string;
};

export type HomeFaq = {
    question: string;
    answer: string;
    links?: HomeFaqLink[];
};

export const HOME_FAQS: HomeFaq[] = [
    {
        question: "Can Your Support Coordinators Connect Me With NDIS Providers?",
        answer: "Yes. Based on your specific requirements, our support coordinators will connect you with trusted NDIS providers. Additionally, we focus on capacity building to help you develop the skills needed to manage service providers independently in the future.",
    },
    {
        question: "How Can You Help Me Access The Community?",
        answer: "We support community access through our Social & Community Participation and Transportation Assistance services. Our team helps you access community resources, attend events, and build social connections to combat isolation, while our support workers assist with travel to ensure you reach your destination safely.",
    },
    {
        question: "Are The NDIS Accommodations That You Provide Well-maintained?",
        answer: "Absolutely. For our Emergency Respite and short-term accommodation services, we provide safe, clean, and comfortable living spaces. We ensure our facilities meet high standards so you can relax and feel at home during your stay.",
    },
    {
        question: "Do You Use Restrictive Practices During Psychosocial Recovery Coaching?",
        answer: "No. As a neuro-affirming provider, we treat everyone with kindness and respect your autonomy. We do not decide for you; instead, we provide the tools and coaching you need to navigate challenges and achieve your own definition of independence.",
    },
    {
        question: "Is JS Choice Group a registered NDIS provider in Melbourne?",
        answer: "Yes. JS Choice Group is a registered NDIS provider offering personalised disability support services to NDIS participants across Melbourne. Our approach focuses on choice, independence, inclusion and participant-led support.",
    },
    {
        question: "What NDIS services does JS Choice Group provide?",
        answer: "JS Choice Group provides a range of NDIS supports, including Assistance with Daily Life, community participation, transportation assistance, nursing care, NDIS accommodation, Support Coordination, Psychosocial Recovery Coaching, Allied Health Services, employment and education assistance, and other individualised supports.",
        links: [
            {
                text: "community participation",
                href: "/blog/top-innovative-community-participation-activities-for-ndis-participants",
            },
        ],
    },
    {
        question: "Which areas does JS Choice Group provide NDIS services in?",
        answer: "JS Choice Group is based in Laverton North and supports NDIS participants across Melbourne's Western and Northern suburbs, with regional outreach available where possible.",
    },
    {
        question: "How do I get started with JS Choice Group?",
        answer: "You can contact JS Choice Group by phone or through the online enquiry form for an initial discussion. The team will learn about your goals, NDIS plan, support requirements and preferences before helping you get started with suitable supports.",
    },
    {
        question: "Can JS Choice Group tailor support to my individual NDIS goals?",
        answer: "Yes. JS Choice Group provides participant-led support based on each person's individual needs, preferences and goals. The aim is to provide support that promotes greater independence, choice and everyday wellbeing.",
    },
    {
        question: "Does JS Choice Group provide support for people with complex needs?",
        answer: "JS Choice Group supports people with a range of needs, including autism and ADHD, psychosocial disabilities, and physical and neurological conditions. Available support can depend on the participant's individual needs and NDIS plan.",
    },
    {
        question: "Can I choose the support services I receive?",
        answer: "Support is designed around the participant's individual needs, preferences and NDIS goals. JS Choice Group works with participants to develop personalised support arrangements rather than using a one-size-fits-all approach.",
    },
    {
        question: "Does JS Choice Group provide 24-hour disability support?",
        answer: "JS Choice Group lists its care services as available 24 hours, while its office is open Monday to Friday, 10 AM to 4 PM. Participants can contact the team to discuss the availability required for their individual support needs.",
    },
];
