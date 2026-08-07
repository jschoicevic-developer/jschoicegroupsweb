import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const ASSET = "/images/daily-life";

// 4. Who Can Benefit from Daily Living Support?
export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit from",
    titleHighlight: "Daily Living Support?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Daily living support is for anyone who needs a little extra help managing everyday tasks safely, comfortably and with greater confidence at home.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Participants Recovering from Illness or Injury",
        description:
            "Reliable daily support help you rebuild strength, confidence and comfortable home routines.",
        icon: `${ASSET}/who-can-benefit-recovery.svg`,
    },
    {
        title: "People with Psychological Disabilities",
        description:
            "Structured, consistent support helping you manage daily tasks with greater ease and stability.",
        icon: `${ASSET}/who-can-benefit-psychosocial.svg`,
    },
    {
        title: "Participants Building Independent Living Skills",
        description:
            "Practical, patient assistance helping you develop the everyday skills for greater independence.",
        icon: `${ASSET}/who-can-benefit-independence.svg`,
    },
    {
        title: "People Transitioning into Supported Accommodation",
        description:
            "Supportive daily assistance help you settle comfortably into your new living environment.",
        icon: `${ASSET}/who-can-benefit-accommodation.svg`,
    },
];

// 5. Daily Living Tasks We Can Help With
export const dailyLivingTasksHeading: SectionHeadingProps = {
    title: "Daily Living Tasks We",
    titleHighlight: "Can Help With",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "From morning routines to household management, our team supports the everyday tasks that keep your home life running smoothly and comfortably.",
    align: "left",
    subtitleSingleLine: false,
};

export const dailyLivingTasksImage = {
    src: `${ASSET}/daily-living-tasks-hero.webp`,
    alt: "Support worker helping with daily living tasks",
};

export const dailyLivingTasks: ChecklistItem[] = [
    {
        title: "Personal Hygiene",
        description:
            "Respectful support with showering, bathing, toileting and personal hygiene to maintain comfort and dignity daily.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Dressing & Grooming",
        description:
            "Assistance with dressing, grooming and personal presentation, encouraging confidence, independence and everyday wellbeing.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Meal Preparation",
        description:
            "Support planning and preparing nutritious meals that suit your preferences, dietary needs, and daily routine.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Cleaning & Laundry",
        description:
            "Help with household cleaning, laundry and linen to keep your home clean, organised and comfortable.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Shopping & Errands",
        description:
            "Assistance with grocery shopping, everyday errands and essential household tasks to support independent daily living.",
        icon: `${ASSET}/task-check.svg`,
    },
];

// 6. Benefits of Daily Living Support
export const serviceBenefitsHeading: SectionHeadingProps = {
    title: "Benefits of",
    titleHighlight: "Daily Living Support",
    highlightClassName: "text-white",
    highlightColor: "#ffffff",
    highlightInline: true,
    subtitle:
        "The right daily living support helps you maintain independence, build confidence, and enjoy greater comfort, safety, and wellbeing in everyday life.",
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
        title: "Increased Confidence",
        description:
            "Build confidence managing everyday tasks with consistent support that encourages greater independence and personal achievement.",
        icon: `${ASSET}/benefit-confidence.svg`,
    },
    {
        title: "Safer Routines",
        description:
            "Maintain safer daily routines with practical assistance that reduces risks and supports greater peace of mind.",
        icon: `${ASSET}/benefit-routines.svg`,
    },
    {
        title: "Better Wellbeing",
        description:
            "Enjoy improved physical and emotional wellbeing through personalised support that promotes comfort, health, and routine.",
        icon: `${ASSET}/benefit-wellbeing.svg`,
    },
    {
        title: "Reduced Family Stress",
        description:
            "Reliable daily support eases family responsibilities while providing reassurance your loved one is well cared for.",
        icon: `${ASSET}/benefit-family.svg`,
    },
];

// 7. Our 5-Step Support Process
export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step",
    titleHighlight: "Support Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with daily living support through JS Choice Group is a straightforward, supportive process designed entirely around your individual needs and goals.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Reach out and tell us what support you need at home.",
        icon: `${ASSET}/process-step-1.svg`,
    },
    {
        title: "Understand Your Needs",
        description: "We assess your daily living requirements and personal goals together.",
        icon: `${ASSET}/process-step-2.svg`,
    },
    {
        title: "Create Your Support Plan",
        description: "A personalised plan built around your routine and preferences.",
        icon: `${ASSET}/process-step-3.svg`,
    },
    {
        title: "Match You with the Right Support",
        description: "We match you with the right support worker for you.",
        icon: `${ASSET}/process-step-4.svg`,
    },
    {
        title: "Ongoing Review & Support",
        description: "Consistent assistance with regular reviews to keep everything on track.",
        icon: `${ASSET}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, reliable support focused on your goals, helping you live more independently with confidence, comfort, and peace of mind.",
    icon: `${ASSET}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${ASSET}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${ASSET}/cta-arrow.svg`,
};

// 8. How Daily Living Support Improves Quality of Life
export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "How Daily Living Support",
    titleHighlight: "Improves Quality of Life",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "The right daily living support does more than help with tasks. It builds confidence, reduces stress, and creates a home life that genuinely feels yours.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Independence at Home",
        description: "Build the skills and confidence to manage daily life more freely over time.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Reduced Daily Stress",
        description:
            "Having consistent support removes the pressure of managing everything completely alone.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Improved Physical Wellbeing",
        description: "Proper personal care and nutrition directly support your overall health and comfort.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Stronger Sense of Routine",
        description:
            "A steady daily structure brings calm, predictability and genuine comfort to everyday life.",
        icon: `${ASSET}/task-check.svg`,
    },
    {
        title: "Better Community Connection",
        description:
            "Feeling organised at home gives you more energy and confidence to stay socially active.",
        icon: `${ASSET}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    { src: `${ASSET}/quality-of-life-1.webp`, alt: "Participant enjoying independence at home" },
    { src: `${ASSET}/quality-of-life-2.webp`, alt: "Participants socialising in the community" },
    { src: `${ASSET}/quality-of-life-3.webp`, alt: "Support worker helping with cooking" },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${ASSET}/collage-heart-hand.svg`,
    heartHouse: `${ASSET}/collage-heart-house.svg`,
};

// 10. Areas We Support Across Melbourne
export const areasWeServeDescription =
    "JS Choice Group provides trusted daily living support across Melbourne and surrounding suburbs, bringing reliable, person-centred assistance directly to participants wherever they call home.";

// 11. FAQs
export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about daily living support in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "What is assistance with daily life under the NDIS?",
        answer:
            "Assistance with daily life covers support with personal care, household tasks, meal preparation and home maintenance, all funded through your NDIS plan under Core Supports based on your individual goals and needs.",
    },
    {
        question: "Who is eligible for daily living support through the NDIS?",
        answer:
            "NDIS participants who require assistance managing everyday tasks at home may be eligible. Eligibility is based on your disability, functional needs, and the support goals outlined in your current approved NDIS plan.",
    },
    {
        question: "Can I choose which tasks my support worker helps me with?",
        answer:
            "Yes. Your daily living support plan is built entirely around your priorities and preferences. Nothing is decided without your full input, agreement, and ongoing feedback throughout your entire support experience with us.",
    },
    {
        question: "How do I get started with JS Choice Group for daily living support?",
        answer:
            "Simply contact our team for an initial conversation. We will assess your needs, explain your options, and get your daily living support plan set up as smoothly and quickly as possible.",
    },
];
