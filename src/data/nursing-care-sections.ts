import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/nursing";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Access",
    titleHighlight: "Nursing Care Services?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Professional nursing care supports participants requiring clinical assistance, ongoing health management, and personalised medical care to maintain wellbeing and independence.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants with Complex Health Needs",
        description:
            "Clinical nursing support managing ongoing health conditions with professional care and medical oversight.",
        icon: `${ICON}/who-complex-health.svg`,
    },
    {
        title: "People Requiring Medication Management",
        description:
            "Safe medication administration supports consistent treatment, health outcomes, and everyday wellbeing.",
        icon: `${ICON}/who-medication.svg`,
    },
    {
        title: "Participants Recovering After Hospital Care",
        description:
            "Professional nursing assistance supporting recovery, rehabilitation and a safe return home following discharge.",
        icon: `${ICON}/who-hospital-recovery.svg`,
    },
    {
        title: "People with Chronic Health Conditions",
        description:
            "Ongoing nursing care helps manage long-term health conditions while maintaining comfort and independence.",
        icon: `${ICON}/who-chronic.svg`,
    },
];

export const nursingServicesHeading: SectionHeadingProps = {
    title: "Our Comprehensive",
    titleHighlight: "Nursing Care Services",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Our qualified nurses deliver personalised clinical care that supports your health, promotes independence, and provides reassurance for participants and families.",
    align: "left",
    subtitleSingleLine: false,
};

export const nursingServicesImage = {
    src: `${ASSET}/nursing-services-hero.webp`,
    alt: "Qualified nurse providing clinical care support",
};

export const nursingServicesItems: ChecklistItem[] = [
    {
        title: "Medication Management",
        description:
            "Safe medication administration and monitoring supporting effective treatment and improved health outcomes daily.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Wound Care",
        description:
            "Professional wound assessment, dressing changes, and ongoing monitoring to encourage safe healing.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Health Assessments",
        description:
            "Regular health monitoring helps identify concerns early and support ongoing clinical care confidently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Chronic Disease Management",
        description:
            "Specialised nursing support assisting participants living with ongoing and complex health conditions.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Continence Care",
        description:
            "Respectful continence support promoting comfort, dignity and improved quality of everyday life.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const serviceBenefitsHeading: SectionHeadingProps = {
    title: "Benefits of",
    titleHighlight: "Professional Nursing Care",
    highlightClassName: "text-white",
    highlightColor: "#ffffff",
    highlightInline: true,
    subtitle:
        "Professional nursing care provides expert clinical support, improves health outcomes, and helps participants live more safely, comfortably, and independently every day.",
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
        title: "Improved Health Outcomes",
        description:
            "Professional nursing care supports better health through consistent monitoring, treatment and clinical expertise.",
        icon: `${ICON}/benefit-health-outcomes.svg`,
    },
    {
        title: "Greater Safety",
        description:
            "Qualified nurses provide safe clinical care that reduces health risks and prevents complications.",
        icon: `${ICON}/benefit-safety.svg`,
    },
    {
        title: "Increased Independence",
        description:
            "Receive the right clinical support while maintaining greater independence within your everyday routine.",
        icon: `${ICON}/benefit-independence.svg`,
    },
    {
        title: "Peace of Mind",
        description:
            "Families gain reassurance knowing experienced nurses provide compassionate, professional care for every visit.",
        icon: `${ICON}/benefit-peace-of-mind.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Nursing Care Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with nursing care through JS Choice Group is a supportive, personalised process focused entirely on your health, wellbeing, and clinical needs.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your nursing care requirements and health needs.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Needs",
        description: "We assess your health condition, clinical requirements, and individual support goals together.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Create Your Care Plan",
        description: "A personalised nursing care plan tailored to your health and daily routine.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Match You with the Right Nurse",
        description: "We carefully match you with an experienced nurse suited to your clinical needs.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Support",
        description: "Regular care reviews ensure your nursing support continues meeting your changing health needs.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Experienced nursing professionals delivering personalised clinical care focused on your health, independence, comfort, and overall wellbeing every day.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "How Nursing Care Improves",
    titleHighlight: "Health, Safety & Independence",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "Professional nursing care delivers more than clinical treatment, helping participants maintain better health, greater confidence, and increased independence every day.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Better Health Management",
        description:
            "Consistent nursing support helps manage health conditions and improve long-term wellbeing outcomes effectively.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Enhanced Safety",
        description:
            "Professional clinical care reduces health risks while promoting safer daily routines and independence.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Greater Confidence",
        description:
            "Reliable nursing support builds confidence managing health needs with professional guidance and reassurance.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Quality of Life",
        description:
            "Receive personalised clinical care that promotes comfort, dignity, and greater everyday wellbeing consistently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Ongoing Clinical Support",
        description:
            "Access experienced nursing care that adapts alongside your changing health needs and goals.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/health-safety-independence.webp`,
        alt: "Nursing care supporting health, safety and independence",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted nursing care services across Melbourne and surrounding suburbs, delivering professional, person-centred clinical support wherever participants call home.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about NDIS nursing care in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What does NDIS nursing care include?",
        answer:
            "NDIS nursing care includes medication management, wound care, health assessments, chronic disease management, continence care, and other clinical services delivered by qualified nurses.",
    },
    {
        question: "Who can access nursing care through the NDIS?",
        answer:
            "Eligible NDIS participants requiring clinical support due to complex health needs, medical conditions, or ongoing treatment may access nursing care through their approved plan.",
    },
    {
        question: "Are nursing services provided by qualified nurses?",
        answer:
            "Yes. All nursing care is delivered by experienced, qualified nurses who provide professional clinical support tailored to your health needs and NDIS goals.",
    },
    {
        question: "How do I get started with nursing care at JS Choice Group?",
        answer:
            "Simply contact our team for an initial conversation. We'll assess your clinical needs, explain your options, and develop a personalised nursing care plan.",
    },
];
