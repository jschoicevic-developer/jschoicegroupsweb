import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/group-activities";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "Group Activities?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Group activities provide opportunities to build friendships, develop practical skills, and participate confidently in enjoyable community experiences.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants Building Social Confidence",
        description:
            "Supportive group activities encourage meaningful friendships, communication skills, and greater social confidence.",
        icon: `${ICON}/who-social-confidence.svg`,
    },
    {
        title: "People Seeking Community Connection",
        description:
            "Enjoy shared experiences that strengthen belonging, participation, and positive relationships within the community.",
        icon: `${ICON}/who-community-connection.svg`,
    },
    {
        title: "Participants Developing Life Skills",
        description:
            "Learn practical everyday skills through engaging group activities that encourage greater independence.",
        icon: `${ICON}/who-life-skills.svg`,
    },
    {
        title: "People Looking for New Experiences",
        description:
            "Participate in enjoyable activities that promote confidence, wellbeing, and personal growth every week.",
        icon: `${ICON}/who-new-experiences.svg`,
    },
];

export const activitiesHeading: SectionHeadingProps = {
    title: "Activities Designed to Build",
    titleHighlight: "Skills & Social Connections",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Our group activities encourage meaningful participation, helping you develop practical skills, build lasting friendships, and enjoy greater confidence within your community.",
    align: "left",
    subtitleSingleLine: false,
};

export const activitiesImage = {
    src: `${ASSET}/activities-hero.webp`,
    alt: "Participants enjoying group and centre activities",
};

export const activitiesItems: ChecklistItem[] = [
    {
        title: "Social Gatherings",
        description:
            "Build friendships through enjoyable social events that encourage communication and shared experiences.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Community Outings",
        description:
            "Explore local attractions and activities while building confidence in community participation together.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Life Skills Programs",
        description:
            "Develop practical skills that support greater independence in everyday life and routines.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Health & Wellbeing Activities",
        description:
            "Enjoy activities promoting physical wellbeing, relaxation, confidence, and positive mental health outcomes.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Creative & Recreational Programs",
        description:
            "Express yourself through engaging recreational activities that inspire creativity, confidence, and personal achievement.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const serviceBenefitsHeading: SectionHeadingProps = {
    title: "Benefits of",
    titleHighlight: "Group Participation",
    highlightClassName: "text-white",
    highlightColor: "#ffffff",
    highlightInline: true,
    subtitle:
        "Group activities encourage confidence, social connection, and personal growth while creating enjoyable opportunities to participate within the community.",
    align: "center",
    subtitleAlign: "center",
    headerMaxWidth: 1267,
    titleColor: "#ffffff",
    subtitleColor: "rgba(255,255,255,0.9)",
    subtitleSingleLine: true,
};

export const serviceBenefitsBackground = `${ASSET}/benefits-section-bg.webp`;

export const serviceBenefitsItems: IconCardItem[] = [
    {
        title: "Stronger Social Connections",
        description:
            "Build genuine friendships and positive relationships through shared experiences and regular group participation.",
        icon: `${ICON}/benefit-social-connections.svg`,
    },
    {
        title: "Greater Confidence",
        description:
            "Develop confidence by participating in enjoyable activities within a safe, supportive group environment.",
        icon: `${ICON}/benefit-confidence.svg`,
    },
    {
        title: "Improved Wellbeing",
        description:
            "Regular social engagement promotes emotional wellbeing, confidence, and a stronger sense of belonging.",
        icon: `${ICON}/benefit-wellbeing.svg`,
    },
    {
        title: "Enhanced Independence",
        description:
            "Build practical skills that support greater independence both at home and within the community.",
        icon: `${ICON}/benefit-independence.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Participation Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Joining group activities through JS Choice Group is a simple, welcoming process focused on your interests, goals, and individual support needs.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your interests and participation goals.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Interests",
        description: "We learn about your preferences, goals, and support requirements together.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Choose Suitable Activities",
        description: "We recommend group activities that best match your interests and abilities.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Join Your Group",
        description: "Begin participating with welcoming support in a safe, inclusive environment.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Support",
        description: "We regularly review your participation to ensure continued enjoyment and personal growth.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Friendly, supportive group programs focused on helping you build confidence, develop friendships, and enjoy meaningful community participation every day.",
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
        "Participating in group activities helps you build confidence, strengthen relationships, and develop valuable life skills through enjoyable, shared experiences.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Social Confidence",
        description:
            "Feel more confident interacting with others through regular, supportive group participation.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Communication Skills",
        description:
            "Strengthen everyday communication through positive social interactions and shared group experiences.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Meaningful Community Participation",
        description:
            "Become more involved in your local community while building confidence and independence.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "New Skills & Experiences",
        description:
            "Discover new interests while developing practical skills that support everyday independence.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "A Stronger Sense of Belonging",
        description:
            "Enjoy welcoming environments where friendships, inclusion, and personal growth are encouraged.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/confidence-engagement.webp`,
        alt: "Participants building confidence through community engagement",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group delivers engaging group and centre activities across Melbourne and surrounding suburbs, creating inclusive opportunities for participants to connect, learn, and thrive.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about group and centre activities in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What are NDIS group and centre activities?",
        answer:
            "Group and centre activities are NDIS-funded programs that help participants build social skills, develop independence, participate in enjoyable activities, and strengthen community connections.",
    },
    {
        question: "Who can participate in group activities?",
        answer:
            "Eligible NDIS participants with funding for community participation or group-based supports can access activities designed around their interests, goals, and individual support needs.",
    },
    {
        question: "What types of activities are available?",
        answer:
            "Activities may include community outings, social events, life skills programs, creative workshops, recreational activities, and wellbeing programs that encourage confidence and meaningful participation.",
    },
    {
        question: "How do I get started with group activities at JS Choice Group?",
        answer:
            "Simply contact our team to discuss your interests and goals. We'll help you find suitable activities and support you throughout your participation journey.",
    },
];
