import type {
    ChecklistItem,
    FaqItem,
    IconCardItem,
    ProcessCtaProps,
    ProcessStepItem,
    SectionHeadingProps,
} from "@/types/service-sections";

const SHARED = "/images/daily-life";
const ASSET = "/images/employment-education";
const ICON = `${ASSET}/icons`;

export const whoCanBenefitHeading: SectionHeadingProps = {
    title: "Who Can Benefit",
    titleHighlight: "Employment & Education Support?",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Employment and education support helps NDIS participants develop practical skills, achieve personal goals, and build confidence for greater independence and future opportunities.",
};

export const whoCanBenefitItems: IconCardItem[] = [
    {
        title: "Job Seekers",
        description:
            "Receive personalised support to prepare for employment and build workplace confidence successfully.",
        icon: `${ICON}/who-job-seekers.svg`,
    },
    {
        title: "Students and Learners",
        description:
            "Access guidance that supports education, training, and lifelong learning opportunities with confidence.",
        icon: `${ICON}/who-students-learners.svg`,
    },
    {
        title: "Participants Building Workplace Skills",
        description:
            "Develop practical communication, teamwork, and job-ready skills for future employment success.",
        icon: `${ICON}/who-workplace-skills.svg`,
    },
    {
        title: "People Pursuing Greater Independence",
        description:
            "Build confidence through meaningful education and employment pathways that support long-term independence.",
        icon: `${ICON}/who-independence.svg`,
    },
];

export const employmentSupportHeading: SectionHeadingProps = {
    title: "How Our Employment & Education Support",
    titleHighlight: "Helps You Succeed",
    highlightClassName: "text-secondary",
    highlightColor: "#f1abab",
    highlightInline: true,
    subtitle:
        "Our personalised employment and education support helps participants build practical skills, gain confidence, and achieve meaningful goals through tailored guidance and ongoing encouragement.",
    align: "left",
    subtitleSingleLine: false,
};

export const employmentSupportImage = {
    src: `${ASSET}/employment-hero.webp`,
    alt: "Employment and education support helping you succeed",
};

export const employmentSupportItems: ChecklistItem[] = [
    {
        title: "Career Goal Planning",
        description:
            "Identify strengths, interests, and realistic career pathways aligned with your personal aspirations.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Skill Development",
        description:
            "Build practical workplace, communication, and everyday skills through personalised learning opportunities together.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Job Search Assistance",
        description:
            "Receive support with resumes, applications, interview preparation, and employer communication confidently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Education Support",
        description:
            "Access guidance enrolling in courses, training programs, and educational opportunities that suit you.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Ongoing Encouragement",
        description:
            "Receive continued support as you progress towards employment, education, and greater independence successfully.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const supportProcessHeading: SectionHeadingProps = {
    title: "Our 5-Step Employment & Education",
    titleHighlight: "Support Process",
    highlightClassName: "text-heading-coral",
    highlightColor: "#ff7e7e",
    highlightInline: true,
    subtitle:
        "Getting started with employment and education support through JS Choice Group is personalised, supportive, and focused on helping you achieve your future goals.",
};

export const supportProcessSteps: ProcessStepItem[] = [
    {
        title: "Initial Enquiry",
        description: "Contact our team to discuss your employment, education, and support goals together.",
        icon: `${SHARED}/process-step-1.svg`,
    },
    {
        title: "Understand Your Goals",
        description: "We learn about your strengths, interests, experience, and future aspirations carefully.",
        icon: `${SHARED}/process-step-2.svg`,
    },
    {
        title: "Create Your Personalised Plan",
        description: "We develop a tailored plan aligned with your employment and education objectives.",
        icon: `${SHARED}/process-step-3.svg`,
    },
    {
        title: "Deliver Ongoing Support",
        description: "Receive personalised guidance throughout job seeking, education, or workplace transition activities.",
        icon: `${SHARED}/process-step-4.svg`,
    },
    {
        title: "Review Your Progress",
        description: "We regularly review your goals and adjust support as your needs evolve.",
        icon: `${SHARED}/process-step-5.svg`,
    },
];

export const supportProcessCta: ProcessCtaProps = {
    title: "You're in Safe Hands",
    description:
        "Compassionate, person-centred support helping you build confidence, develop skills, and achieve meaningful employment and education outcomes.",
    icon: `${SHARED}/cta-safe-hands.svg`,
    primaryLabel: "Talk to Us",
    primaryHref: "tel:1300572464",
    primaryIcon: `${SHARED}/cta-phone.svg`,
    secondaryLabel: "Get Started",
    secondaryHref: "/referral",
    secondaryIcon: `${SHARED}/cta-arrow.svg`,
};

export const qualityOfLifeHeading: SectionHeadingProps = {
    title: "Building Skills for Employment, Education &",
    titleHighlight: "Independence",
    highlightClassName: "text-heading-periwinkle",
    highlightColor: "#a5b4fc",
    highlightInline: true,
    subtitle:
        "The right support helps you develop practical skills, build confidence, and create opportunities that lead to greater independence and long-term personal success.",
    align: "left",
    subtitleSingleLine: false,
};

export const qualityOfLifeItems: ChecklistItem[] = [
    {
        title: "Greater Self-Confidence",
        description:
            "Build confidence through meaningful achievements in education, training, and employment opportunities.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Improved Workplace Skills",
        description:
            "Develop communication, teamwork, organisation, and problem-solving skills for everyday workplace success.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Meaningful Goal Progress",
        description:
            "Work towards education and career goals with personalised guidance and ongoing encouragement.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Greater Independence",
        description:
            "Develop skills that support independent decision-making and long-term personal growth confidently.",
        icon: `${SHARED}/task-check.svg`,
    },
    {
        title: "Expanded Future Opportunities",
        description:
            "Open pathways to employment, further education, volunteering, and lifelong learning opportunities.",
        icon: `${SHARED}/task-check.svg`,
    },
];

export const qualityOfLifeImages = [
    {
        src: `${ASSET}/skills-independence.webp`,
        alt: "Building skills for employment, education and independence",
    },
];

export const qualityOfLifeOverlayIcons = {
    heartHand: `${SHARED}/collage-heart-hand.svg`,
    heartHouse: `${SHARED}/collage-heart-house.svg`,
};

export const areasWeServeDescription =
    "JS Choice Group provides trusted employment and education support across Melbourne and surrounding suburbs, delivering personalised, person-centred services that help participants build skills, achieve career and learning goals, and move towards greater independence.";

export const serviceFaqHeading: SectionHeadingProps = {
    title: "Frequently Asked",
    titleHighlight: "Questions",
    highlightClassName: "text-heading-lavender",
    highlightColor: "#9f9ae5",
    highlightInline: true,
    subtitle:
        "Common questions about employment and education support in Melbourne answered clearly and honestly by the JS Choice Group team.",
};

export const serviceFaqItems: FaqItem[] = [
    {
        question: "Who can access employment and education support through the NDIS?",
        answer:
            "Employment and education support is available for eligible NDIS participants whose plans include funding to build capacity, develop skills, and achieve employment or learning goals.",
    },
    {
        question: "What support can you provide with finding employment?",
        answer:
            "We can assist with career planning, resume preparation, job applications, interview skills, workplace confidence, and ongoing support as you begin employment.",
    },
    {
        question: "Can you support me with education or training?",
        answer:
            "Yes. We help participants explore suitable courses, enrol in training or education programs, and access the support needed to achieve their learning goals.",
    },
    {
        question: "How do I get started with employment and education support at JS Choice Group?",
        answer:
            "Simply contact our team to discuss your goals. We'll understand your needs, develop a personalised support plan, and provide guidance throughout your employment or education journey.",
    },
];
