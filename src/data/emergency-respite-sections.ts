import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/emergency-respite";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Access",
    titleHighlight: "Emergency Respite Care?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Emergency respite provides immediate, short-term support for participants when unexpected situations arise, ensuring safety, continuity of care, and peace of mind.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants Experiencing Unexpected Care Changes",
        description:
            "Immediate support when regular care arrangements become unavailable or unexpectedly change.",
        icon: `${ICON}/who-care-changes.svg`,
    },
    {
        title: "Families and Primary Carers in Crisis",
        description:
            "Short-term care provides reassurance while families manage emergencies or urgent personal circumstances.",
        icon: `${ICON}/who-carers-crisis.svg`,
    },
    {
        title: "Participants Requiring Immediate Support",
        description:
            "Safe, compassionate care is available when urgent assistance is needed without prior planning.",
        icon: `${ICON}/who-immediate-support.svg`,
    },
    {
        title: "People Transitioning Between Care Arrangements",
        description:
            "Temporary support ensuring continuity of care during accommodation or support service transitions.",
        icon: `${ICON}/who-transitions.svg`,
    },
];

export const whenNeededHeading: SectionHeadingProps = {
    title: "When Emergency Respite",
    titleHighlight: "May Be Needed",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Unexpected situations can happen at any time. Emergency respite provides immediate, reliable support, ensuring participants continue receiving quality care when they need it most.",
    align: "left",
    subtitleSingleLine: false,
};

export const whenNeededImage = {
    src: `${ASSET}/when-needed-hero.webp`,
    alt: "Emergency respite support when unexpected situations arise",
};

export const whenNeededItems: ChecklistItem[] = [
    {
        title: "Carer Illness or Emergency",
        description:
            "Immediate support when your usual carer becomes unexpectedly unavailable due to illness.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Hospital Admission",
        description:
            "Reliable care while family members or primary carers receive urgent medical treatment.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Unexpected Family Circumstances",
        description:
            "Short-term support during unforeseen family emergencies requiring immediate alternative care arrangements.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Accommodation Changes",
        description:
            "Temporary care while transitioning safely between homes or supported accommodation arrangements.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Urgent Care Requirements",
        description:
            "Immediate assistance when participants require additional support due to unexpected changes or circumstances.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const serviceBenefitsHeading: SectionHeadingProps = {
    title: "Benefits of",
    titleHighlight: "Emergency Respite",
    highlightClassName: "text-white",
    highlightColor: "#ffffff",
    highlightInline: true,
    subtitle:
        "Emergency respite provides immediate support, reassurance, and continuity of care, helping participants remain safe, comfortable, and supported during unexpected situations.",
    align: "center",
    subtitleAlign: "center",
    headerMaxWidth: 1267,
    titleColor: "#ffffff",
    subtitleColor: "rgba(255,255,255,0.9)",
    subtitleSingleLine: false,
};

export const serviceBenefitsBackground = `${ASSET}/benefits-section-bg.webp`;

export const serviceBenefitsItems: IconCardItem[] = [
    {
        title: "Immediate Peace of Mind",
        description:
            "Access reliable support quickly during emergencies, reducing stress for participants and families alike.",
        icon: `${ICON}/benefit-peace-of-mind.svg`,
    },
    {
        title: "Continuity of Care",
        description:
            "Maintain familiar routines and essential support without unnecessary disruption during unexpected situations.",
        icon: `${ICON}/benefit-continuity.svg`,
    },
    {
        title: "Safe & Supportive Environment",
        description:
            "Receive compassionate care in a safe environment focused on comfort and wellbeing.",
        icon: `${ICON}/benefit-safe-environment.svg`,
    },
    {
        title: "Reduced Family Stress",
        description:
            "Temporary professional support allows families time to manage emergencies with greater confidence.",
        icon: `${ICON}/benefit-family-stress.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Emergency Respite Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Accessing emergency respite through JS Choice Group is a simple, responsive process focused on providing immediate support when you need it most.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Contact Our Team",
        description: "Reach out and let us know about your urgent support requirements.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Situation",
        description: "We quickly assess your immediate care needs and personal circumstances together.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Arrange Emergency Support",
        description: "A personalised respite plan is organised based on your current support requirements.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Begin Immediate Care",
        description: "Our experienced support team provides safe, compassionate care without unnecessary delays.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Support",
        description: "We regularly review your care, adapting support as your circumstances change.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, responsive emergency respite focused on your wellbeing, providing immediate support, comfort, and reassurance when you need it most.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Providing Safe, Immediate &",
    titleHighlight: "Compassionate Support",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "Emergency respite offers immediate, person-centred care that protects wellbeing, maintains routines, and provides reassurance during challenging or unexpected situations.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Immediate Care When Needed",
        description:
            "Receive prompt support that helps maintain safety, comfort, and everyday wellbeing.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Maintained Daily Routines",
        description:
            "Continue familiar routines that provide stability and reduce stress during uncertain situations.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Professional Compassionate Support",
        description:
            "Experienced support workers provide respectful care focused on your individual needs.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Greater Family Reassurance",
        description:
            "Families gain confidence knowing their loved one is receiving reliable professional support.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Smooth Transition Back Home",
        description:
            "Support continues until you're ready to safely return to your usual care arrangements.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/safe-support.webp`,
        alt: "Safe, immediate and compassionate emergency respite support",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted emergency respite care across Melbourne and surrounding suburbs, delivering responsive, person-centred support wherever participants need immediate assistance.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about emergency respite care in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What is emergency respite care under the NDIS?",
        answer:
            "Emergency respite provides short-term accommodation and support for eligible NDIS participants when their usual care arrangements become unexpectedly unavailable due to emergencies or unforeseen circumstances.",
    },
    {
        question: "Who can access emergency respite care?",
        answer:
            "Eligible NDIS participants who require immediate short-term support because of unexpected changes in their usual care arrangements may be able to access emergency respite services.",
    },
    {
        question: "How quickly can emergency respite be arranged?",
        answer:
            "We understand emergencies require prompt action. Our team works quickly to assess your situation, organise appropriate support, and provide care as soon as possible.",
    },
    {
        question: "How do I arrange emergency respite with JS Choice Group?",
        answer:
            "Simply contact our team to discuss your situation. We'll assess your immediate support needs, explain your options, and organise emergency respite as quickly as possible.",
    },
];
