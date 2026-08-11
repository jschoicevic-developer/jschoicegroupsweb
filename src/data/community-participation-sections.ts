import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/community";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "Community Participation?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Community participation supports NDIS participants seeking greater independence, stronger social connections, and meaningful opportunities to engage confidently in everyday life.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants Building Social Confidence",
        description:
            "Develop confidence through supported community experiences and positive social interactions every week.",
        icon: `${ICON}/who-social-confidence.svg`,
    },
    {
        title: "People Seeking Greater Independence",
        description:
            "Build everyday skills that encourage independence across community, recreation, and daily activities confidently.",
        icon: `${ICON}/who-independence.svg`,
    },
    {
        title: "Participants Exploring New Interests",
        description:
            "Discover hobbies, local groups, and activities that match your interests and personal goals.",
        icon: `${ICON}/who-new-interests.svg`,
    },
    {
        title: "People Wanting Community Connection",
        description:
            "Strengthen friendships and community involvement through inclusive, enjoyable, and meaningful participation opportunities.",
        icon: `${ICON}/who-community-connection.svg`,
    },
];

export const participationHeading: SectionHeadingProps = {
    title: "How Our Community Participation Supports",
    titleHighlight: "Your Everyday Life",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Community participation encourages independence, builds confidence, and creates opportunities to enjoy meaningful experiences while staying connected with people and local communities.",
    align: "left",
    subtitleSingleLine: false,
};

export const participationImage = {
    src: `${ASSET}/participation-hero.webp`,
    alt: "Community participation support for everyday life",
};

export const participationItems: ChecklistItem[] = [
    {
        title: "Personalised Activity Planning",
        description:
            "Choose activities that match your interests, goals, abilities, and personal preferences every time.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Community Access Support",
        description:
            "Receive one-on-one assistance attending appointments, events, recreational activities, and local community programs safely.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Skill Development",
        description:
            "Build communication, confidence, budgeting, travel, and everyday life skills through practical community experiences.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Social Connections",
        description:
            "Develop friendships and meaningful relationships through inclusive activities that encourage ongoing community participation together.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Ongoing Encouragement",
        description:
            "Receive consistent support that helps you stay engaged, motivated, and connected within your community.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step Community",
    titleHighlight: "Participation Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with community participation through JS Choice Group is simple, personalised, and focused on helping you achieve your individual goals.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your interests, goals, and community participation support needs.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Goals",
        description: "We learn about your preferences, abilities, and the activities you enjoy most together.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Create Your Participation Plan",
        description: "We develop a personalised plan tailored to your interests, goals, and NDIS funding.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Match You with the Right Support Worker",
        description: "We carefully match you with a support worker suited to your personality and goals.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Participation & Reviews",
        description: "We regularly review your progress and adapt support as your goals continue evolving.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, person-centred support helping you build confidence, independence, and meaningful community connections every day.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Building Confidence Through Meaningful",
    titleHighlight: "Community Engagement",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "Regular community participation helps strengthen confidence, develop practical life skills, and create meaningful connections that support greater independence and overall wellbeing.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Self-Confidence",
        description:
            "Gain confidence by participating in everyday activities with personalised support and encouragement consistently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Social Skills",
        description:
            "Build communication and relationship skills through positive interactions within your local community.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Greater Independence",
        description:
            "Develop practical everyday skills that support independent living and confident decision-making over time.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Meaningful Community Connections",
        description:
            "Create lasting friendships through inclusive activities that encourage participation and social belonging.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Enhanced Quality of Life",
        description:
            "Enjoy rewarding experiences that support wellbeing, personal growth, and stronger community involvement every day.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/community-engagement.webp`,
        alt: "Building confidence through meaningful community engagement",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted community participation and access to community activities across Melbourne and surrounding suburbs, delivering personalised, person-centred support that helps participants stay connected, confident, and engaged in everyday life.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about community participation and access to community activities in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "Who can access community participation support under the NDIS?",
        answer:
            "Community participation is available to eligible NDIS participants whose plans include funding for social, recreational, or community participation supports that promote greater independence and inclusion.",
    },
    {
        question: "What activities can I participate in through community access support?",
        answer:
            "Support can include attending community events, shopping, visiting cafés, joining clubs, exercising, volunteering, learning new skills, and participating in recreational or cultural activities.",
    },
    {
        question: "Can I choose the activities I want to participate in?",
        answer:
            "Yes. Your community participation plan is personalised around your interests, goals, abilities, and preferences, ensuring activities are meaningful and aligned with your NDIS goals.",
    },
    {
        question: "How do I get started with community participation at JS Choice Group?",
        answer:
            "Simply contact our friendly team to discuss your goals. We'll understand your needs, create a personalised support plan, and match you with the right support worker.",
    },
];
