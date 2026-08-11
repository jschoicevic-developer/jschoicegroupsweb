import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/accommodation";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "NDIS Accommodation?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "NDIS accommodation supports participants seeking safe, accessible housing that promotes greater independence, personalised support, and an improved quality of life.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants with Higher Support Needs",
        description:
            "Access supported accommodation with personalised assistance tailored to your daily living requirements.",
        icon: `${ICON}/who-higher-support.svg`,
    },
    {
        title: "People Transitioning Between Homes",
        description:
            "Receive stable accommodation while waiting for permanent housing or home modifications to finish.",
        icon: `${ICON}/who-transitioning.svg`,
    },
    {
        title: "Participants Seeking Greater Independence",
        description:
            "Live confidently with support that encourages choice, independence, and everyday decision-making skills.",
        icon: `${ICON}/who-independence.svg`,
    },
    {
        title: "People Requiring Short-Term Accommodation",
        description:
            "Enjoy temporary accommodation that provides quality care, comfort, and opportunities to build independence.",
        icon: `${ICON}/who-short-term.svg`,
    },
];

export const accommodationSupportHeading: SectionHeadingProps = {
    title: "How Our Accommodation Supports",
    titleHighlight: "Independent Living",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Our accommodation services provide safe, supportive environments that help participants build confidence, develop life skills, and enjoy greater independence every day.",
    align: "left",
    subtitleSingleLine: false,
};

export const accommodationSupportImage = {
    src: `${ASSET}/independent-living-hero.webp`,
    alt: "NDIS accommodation supporting independent living",
};

export const accommodationSupportItems: ChecklistItem[] = [
    {
        title: "Personalised Living Arrangements",
        description:
            "Accommodation options tailored to your support needs, lifestyle, and individual preferences.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Daily Living Support",
        description:
            "Receive assistance with personal care, meals, household tasks, and everyday routines confidently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Safe & Accessible Homes",
        description:
            "Comfortable, well-maintained accommodation designed to promote safety, accessibility, and independence.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Skill Development",
        description:
            "Build practical life skills that encourage greater independence and confident daily living.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Ongoing Support",
        description:
            "Receive consistent support that adapts as your goals, needs, and circumstances continue changing.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Accommodation Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Finding the right accommodation through JS Choice Group is a supportive, personalised process focused on helping you feel comfortable, safe, and at home.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your accommodation needs and support requirements.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Preferences",
        description: "We learn about your goals, lifestyle, support needs, and preferred living arrangements.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Explore Accommodation Options",
        description: "We recommend suitable accommodation that aligns with your NDIS goals and funding.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Move Into Your New Home",
        description: "We support your transition and help you settle into your new environment.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Support & Reviews",
        description: "We regularly review your support to ensure they continue meeting your changing needs.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, person-centred accommodation that promotes comfort, independence, and a place you'll proudly call home.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Building Independence Through the Right",
    titleHighlight: "Accommodation",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "The right accommodation provides more than housing, creating opportunities to develop life skills, build confidence, and enjoy greater independence every day.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Independence",
        description:
            "Build confidence managing everyday routines with personalised support suited to your goals.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Safe & Comfortable Living",
        description:
            "Enjoy accommodation designed to promote security, comfort, and overall wellbeing every day.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Daily Living Skills",
        description:
            "Develop practical skills that encourage independent living and long-term personal growth.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Meaningful Social Connections",
        description:
            "Build positive relationships with housemates, support workers, and your local community naturally.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Better Quality of Life",
        description:
            "Enjoy greater choice, stability, and confidence in a supportive home environment every day.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/building-independence.webp`,
        alt: "Building independence through the right NDIS accommodation",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted NDIS accommodation across Melbourne and surrounding suburbs, delivering personalised, person-centred housing solutions that promote independence, comfort, and everyday wellbeing.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about NDIS accommodation in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What types of NDIS accommodation do you provide?",
        answer:
            "We provide Supported Independent Living (SIL), Medium-Term Accommodation (MTA), and Short-Term Accommodation (STA), helping participants access housing that suits their individual support needs and goals.",
    },
    {
        question: "Who is eligible for NDIS accommodation?",
        answer:
            "NDIS accommodation is available for eligible participants whose plans include accommodation funding based on their assessed support needs, goals, and living arrangements.",
    },
    {
        question: "Can you help me find the right accommodation option?",
        answer:
            "Yes. We take the time to understand your support needs, lifestyle preferences, and NDIS goals before recommending the most suitable accommodation pathway.",
    },
    {
        question: "How do I get started with NDIS accommodation at JS Choice Group?",
        answer:
            "Simply contact our team to discuss your needs. We'll explain your options, help you understand your funding, and support you throughout the accommodation process.",
    },
];
