import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

/** Shared chrome reused from Daily Living (same icons). */
const SHARED = "/images/daily-life";
/** Page-specific icons + photos from OneDrive. */
const ASSET = "/images/recovery-coach";
const ICON = `${ASSET}/icons`;

// 6. Who Can Benefit from Recovery Coaching?
export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "Recovery Coaching?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Recovery coaching supports participants seeking practical guidance, emotional resilience, and personalised strategies to build confidence, independence, and long-term wellbeing.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "People Living with Psychosocial Disability",
        description:
            "Personalised coaching supports recovery, resilience, confidence, and everyday wellbeing through practical guidance.",
        icon: `${ICON}/who-psychosocial-disability.svg`,
    },
    {
        title: "Participants Building Daily Confidence",
        description:
            "Develop practical strategies that strengthen confidence, independence, and everyday decision-making over time.",
        icon: `${ICON}/who-daily-confidence.svg`,
    },
    {
        title: "People Managing Mental Health Challenges",
        description:
            "Consistent support helps you navigate challenges, build resilience, and maintain everyday stability confidently.",
        icon: `${ICON}/who-mental-health.svg`,
    },
    {
        title: "Participants Working Towards Recovery Goals",
        description:
            "Goal-focused coaching supports meaningful progress towards greater independence, wellbeing, and long-term recovery.",
        icon: `${ICON}/who-recovery-goals.svg`,
    },
];

// 7. How Our Recovery Coaching Supports Your Mental Health Journey
export const recoverySupportHeading: SectionHeadingProps = {
    title: "How Our Recovery Coaching Supports",
    titleHighlight: "Your Mental Health Journey",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Recovery coaching provides practical guidance and ongoing encouragement, helping you build resilience, confidence, and greater independence at your own pace.",
    align: "left",
    subtitleSingleLine: false,
};

export const recoverySupportImage = {
    src: `${ASSET}/recovery-support-hero.webp`,
    alt: "Recovery coach supporting a participant",
};

export const recoverySupportItems: ChecklistItem[] = [
    {
        title: "Personal Recovery Planning",
        description:
            "Create realistic recovery goals with personalised strategies designed around your individual circumstances.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Capacity Building",
        description:
            "Develop practical skills that strengthen independence, resilience, and confidence in everyday situations together.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Community Connection",
        description:
            "Build meaningful relationships and reconnect with community support that encourage long-term wellbeing consistently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Coordinating Supports",
        description:
            "Access the right services and support that align with your recovery goals effectively.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Ongoing Encouragement",
        description:
            "Receive consistent guidance, motivation, and practical support throughout every stage of your recovery journey.",
        icon: `${SHARED}/task-check.svg`,
    },
];

// 8. Benefits of a Psychosocial Recovery Coach
export const serviceBenefitsHeading: SectionHeadingProps = {
    title: "Benefits of a",
    titleHighlight: "Psychosocial Recovery Coach",
    highlightClassName: "text-white",
    highlightColor: "#ffffff",
    highlightInline: true,
    subtitle:
        "Recovery coaching empowers you to build resilience, strengthen independence, and move towards meaningful goals with confidence, practical support, and encouragement.",
    align: "center",
    subtitleAlign: "center",
    headerMaxWidth: 1267,
    titleColor: "#ffffff",
    subtitleColor: "rgba(255,255,255,0.9)",
    subtitleSingleLine: true,
};

/** Same benefits background as Daily Living (provided again in this page's OneDrive). */
export const serviceBenefitsBackground = `${SHARED}/benefits-section-bg.webp`;

export const serviceBenefitsItems: IconCardItem[] = [
    {
        title: "Increased Resilience",
        description:
            "Develop practical coping strategies that strengthen resilience and improve your ability to navigate challenges.",
        icon: `${ICON}/benefit-resilience.svg`,
    },
    {
        title: "Greater Independence",
        description:
            "Build confidence in managing everyday responsibilities while working towards greater personal independence and wellbeing.",
        icon: `${ICON}/benefit-independence.svg`,
    },
    {
        title: "Stronger Support Networks",
        description:
            "Connect with services, relationships and community support that encourage long-term recovery and stability.",
        icon: `${ICON}/benefit-support-networks.svg`,
    },
    {
        title: "Improved Mental Wellbeing",
        description:
            "Consistent coaching promotes emotional wellbeing, confidence, and a greater sense of control every day.",
        icon: `${ICON}/benefit-mental-wellbeing.svg`,
    },
];

// 9. Our 5-Step Recovery Coaching Process
export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Recovery Coaching Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with recovery coaching through JS Choice Group is a supportive, personalised process focused entirely on your recovery goals and wellbeing.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Reach out and tell us about your recovery goals and support needs.",
        icon: `${ICON}/process-step-1.svg`,
    },
    {
        title: "Understand Your Needs",
        description: "We take time to understand your experiences, goals, and current circumstances together.",
        icon: `${ICON}/process-step-2.svg`,
    },
    {
        title: "Create Your Recovery Plan",
        description: "A personalised recovery plan built around your goals, strengths and individual journey.",
        icon: `${ICON}/process-step-3.svg`,
    },
    {
        title: "Match You with the Right Coach",
        description: "We connect you with a recovery coach who suits your individual needs.",
        icon: `${ICON}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Support",
        description: "Regular coaching and reviews keep your recovery plan aligned with your changing goals.",
        icon: `${ICON}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, personalised recovery coaching focused on your wellbeing, helping you build resilience, confidence, and greater independence every day.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

// 10. Building Independence & Achieving Your Recovery Goals
export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Building Independence & Achieving",
    titleHighlight: "Your Recovery Goals",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "The right recovery coaching provides practical guidance, strengthens resilience, and supports meaningful progress towards greater independence and improved everyday wellbeing.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Self-Confidence",
        description:
            "Build confidence in making everyday decisions and managing life challenges more independently over time.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Daily Stability",
        description:
            "Develop consistent routines that promote emotional wellbeing and greater day-to-day stability.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Stronger Decision-Making Skills",
        description:
            "Gain practical strategies that help you make informed, confident decisions every day.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Meaningful Goal Progress",
        description:
            "Work towards personal recovery goals with ongoing encouragement, structure, and practical support.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Better Community Participation",
        description:
            "Build confidence, engage with your community, and strengthen positive social connections over time.",
        icon: `${SHARED}/task-check.svg`,
    },
];

/** OneDrive supplied a single square photo for this section (not a 3-up collage). */
export const qualityOfLifeImages = [
    {
        src: `${ASSET}/recovery-goals-collage.webp`,
        alt: "Recovery coach and participant in a supportive session",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

// 12. Areas We Support Across Melbourne
export const areasWeServeDescription =
    "JS Choice Group provides trusted psychosocial recovery coaching across Melbourne and surrounding suburbs, delivering personalised, person-centred support wherever participants need us.";

// 13. FAQs
export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about psychosocial recovery coaching in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What is a psychosocial recovery coach under the NDIS?",
        answer:
            "A psychosocial recovery coach helps participants with psychosocial disabilities to build resilience, develop practical recovery strategies, strengthen independence, and work towards meaningful personal goals through ongoing support.",
    },
    {
        question: "Who can access psychosocial recovery coaching?",
        answer:
            "Recovery coaching is available for eligible NDIS participants with psychosocial disabilities whose plans include funding for recovery coaching under Capacity Building Supports.",
    },
    {
        question: "How is a recovery coach different from a support coordinator?",
        answer:
            "Recovery coaches focus specifically on mental health recovery, resilience and capacity building, while support coordinators primarily help participants connect with services and implement their NDIS plans.",
    },
    {
        question: "How do I get started with recovery coaching at JS Choice Group?",
        answer:
            "Simply contact our team for an initial conversation. We'll discuss your recovery goals, explain your options, and match you with the right recovery coach.",
    },
];
