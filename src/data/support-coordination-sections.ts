import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/support-coordination";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "Support Coordination?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Support coordination helps participants understand their NDIS plan, connect with suitable providers, and confidently manage support that align with their individual goals.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants New to the NDIS",
        description: "Learn how your plan works and access supports with greater confidence.",
        icon: `${ICON}/who-new-to-ndis.svg`,
    },
    {
        title: "People with Complex Support Needs",
        description:
            "Coordinate multiple services while ensuring that every support works together effectively.",
        icon: `${ICON}/who-complex-needs.svg`,
    },
    {
        title: "Participants Seeking Greater Independence",
        description:
            "Build skills to confidently manage providers, funding, and everyday support decisions.",
        icon: `${ICON}/who-independence.svg`,
    },
    {
        title: "Families and Carers",
        description:
            "Receive practical guidance navigating services while supporting your loved one's NDIS journey.",
        icon: `${ICON}/who-families-carers.svg`,
    },
];

export const coordinationSupportHeading: SectionHeadingProps = {
    title: "How Our Support Coordination Helps You",
    titleHighlight: "Navigate the NDIS",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Support coordination provides practical guidance that helps you understand your plan, connect with providers, and confidently manage your support every step.",
    align: "left",
    subtitleSingleLine: false,
};

export const coordinationSupportImage = {
    src: `${ASSET}/navigate-ndis-hero.webp`,
    alt: "Support coordination helping you navigate the NDIS",
};

export const coordinationSupportItems: ChecklistItem[] = [
    {
        title: "Understanding Your NDIS Plan",
        description: "Learn how your funding works and make informed support decisions confidently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Connecting with Providers",
        description:
            "Find trusted providers that suit your goals, preferences, and individual support requirements.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Coordinating Your Supports",
        description:
            "Ensure all providers communicate effectively and deliver consistent participant-centred support.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Preparing for Plan Reviews",
        description:
            "Gather reports and evidence supporting future funding and changing support requirements.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Building Capacity",
        description:
            "Develop confidence in managing your support independently while achieving greater long-term control.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step Support",
    titleHighlight: "Coordination Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with support coordination through JS Choice Group is a personalised process focused on helping you maximise your NDIS plan with confidence.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your NDIS plan and support requirements.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Goals",
        description: "We learn about your priorities, challenges, and long-term support objectives together.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Develop Your Support Plan",
        description: "Create a personalised approach that aligns with your NDIS funding and goals.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Connect with Providers",
        description: "We help you access trusted providers suited to your individual support needs.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Guidance",
        description: "Regular reviews ensure your support continues meeting your evolving needs and goals.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, personalised support coordination helps you confidently navigate the NDIS, build independence, and achieve meaningful outcomes with trusted ongoing guidance.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Building Confidence Through Better",
    titleHighlight: "Support Coordination",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "The right support coordination strengthens your understanding of the NDIS while helping you access quality services and achieve greater independence with confidence.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Plan Understanding",
        description: "Learn how to use your NDIS funding effectively and confidently every day.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Provider Connections",
        description:
            "Access trusted providers aligned with your personal goals and support requirements.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Stronger Decision-Making",
        description: "Make informed choices about support that best suit your changing circumstances.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Greater Independence",
        description:
            "Develop confidence in managing your support while building long-term self-reliance and control.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Better Goal Achievement",
        description:
            "Stay focused on meaningful outcomes with personalised guidance throughout your NDIS journey.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/better-coordination.webp`,
        alt: "Building confidence through better support coordination",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted NDIS support coordination across Melbourne and surrounding suburbs, helping participants connect with the right services and confidently manage their NDIS journey.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about NDIS support coordination in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What does a NDIS support coordinator do?",
        answer:
            "A support coordinator helps you understand your NDIS plan, connect with suitable providers, coordinate your support, and build the confidence to manage your services independently over time.",
    },
    {
        question: "Who can access NDIS support coordination?",
        answer:
            "Support coordination is available for eligible NDIS participants whose plans include funding for Support Coordination under Capacity Building Supports, based on their individual circumstances and needs.",
    },
    {
        question: "Can I choose my own service provider?",
        answer:
            "Yes. You remain in control of choosing the providers that best suit your goals, preferences, cultural needs, and support requirements throughout your NDIS journey.",
    },
    {
        question: "How do I get started with support coordination at JS Choice Group?",
        answer:
            "Simply contact our team to discuss your NDIS plan and goals. We'll explain your options, answer your questions, and connect you with the right support coordinator.",
    },
];
