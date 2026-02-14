
export interface LocationPageData {
    serviceType: 'aha' | 'sc' | 'accom' | 'provider';
    location: string;
    title: string;
    description: string;
    heroTitle: string;
    heroSubtitle: string;
    content: {
        title: string;
        body: string; // markdown or plain text
        list?: string[];
    }[];
}

const formatLocation = (slugPart: string) => {
    return slugPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getLocationPageData = (slug: string): LocationPageData | null => {
    if (!slug) return null;

    let serviceType: LocationPageData['serviceType'] | null = null;
    let locationSlug = '';

    if (slug.startsWith('allied-health-assistant-')) {
        serviceType = 'aha';
        locationSlug = slug.replace('allied-health-assistant-', '');
    } else if (slug.startsWith('support-coordinator-')) {
        serviceType = 'sc';
        locationSlug = slug.replace('support-coordinator-', '');
    } else if (slug.startsWith('ndis-accommodation-')) {
        serviceType = 'accom';
        locationSlug = slug.replace('ndis-accommodation-', '');
    } else if (slug.startsWith('ndis-providers-')) {
        serviceType = 'provider';
        locationSlug = slug.replace('ndis-providers-', '');
    }

    if (!serviceType) return null;

    const location = formatLocation(locationSlug);

    switch (serviceType) {
        case 'aha':
            return {
                serviceType: 'aha',
                location,
                title: `Allied Health Assistant in ${location} | Habit Coach ${location}`,
                description: `Looking for a professional allied health assistant in ${location}? Our certified habit coach provides comprehensive support to enhance your healthcare journey. Contact us today!`,
                heroTitle: `Experienced Allied Health Assistant in ${location}`,
                heroSubtitle: "Empowering you with the skills and support needed for independence.",
                content: [
                    {
                        title: "Who is an Allied Health Assistant?",
                        body: `An allied health assistant, or AHA, can be referred to as part of a participant’s therapy team who is responsible for honing the skills that they have learned in their therapy. They arrange real-time routines and daily habits to allow participants to use their skills, learn, and grow.\n\nYour AHA can also be referred to as a habit coach in ${location} who will work closely with you on your journey to empowerment and independence.`
                    },
                    {
                        title: "What Does an Allied Health Assistant Do?",
                        body: "Our allied health assistants will work in the same manner in your case and ensure that you get the right therapy and are part of the right skill enhancement program from start to finish.",
                        list: [
                            "Therapy Services: AHAs will implement individual and group therapy sessions for you, as delegated by therapists.",
                            "Assessments: AHAs will help you with assessments and ongoing care and support.",
                            "Support Plans: AHAs will work closely with participants to implement support plans, like developing therapeutic activities into their daily routines.",
                            `Monitoring: Your allied health assistant in ${location} will constantly monitor your health and well-being by putting together reports.`,
                            "Management Support: Your AHA will provide administrative support to allied health professionals and therapists to assist them with therapy efficiency and participant management."
                        ]
                    },
                    {
                        title: "Types of Services Included in Our Allied Health Services",
                        body: "",
                        list: [
                            "Occupational Therapy (OT)",
                            "Physiotherapy",
                            "Speech Pathology",
                            "Exercise Physiology",
                            "Dietetics",
                            "Podiatry",
                            "Social work"
                        ]
                    },
                    {
                        title: "What Are the Benefits of Our Allied Health Assistants?",
                        body: "",
                        list: [
                            "Increased independence",
                            "Confidence buildup",
                            "Staying on track with therapy",
                            "Greater sense of achievement and well-being",
                            "Faster access to allied health services",
                            "A stretch with your NDIS funding with cost-effective support"
                        ]
                    },
                    {
                        title: "Why Choose Us for Allied Health Services?",
                        body: "We never stop learning and making our care and support better. Your independence is our top priority.",
                        list: [
                            `Each habit coach in ${location} we have on our team is trained and experienced.`,
                            "We ensure end-to-end quality in our allied health assistance.",
                            "We offer quick and effective habit coaching in between our participants’ therapy sessions.",
                            "We take a person-centred approach to allied health assistance.",
                            "Your choices and decisions are what we are proud of."
                        ]
                    }
                ]
            };

        case 'sc':
            return {
                serviceType: 'sc',
                location,
                title: `Support Coordinator in ${location} | Support Worker in ${location}`,
                description: `Looking for a reliable support worker or coordinator in ${location}? Our dedicated team offers personalised assistance to help manage your daily activities and coordinate your care needs with ease. Contact us today!`,
                heroTitle: `Comprehensive NDIS Support Coordination in ${location}`,
                heroSubtitle: "Helping you navigate your NDIS plan with confidence and choice.",
                content: [
                    {
                        title: "What Services and Programs Will Our Support Coordinator Help You Access?",
                        body: "Our Support Coordinators are here to ensure you get the most out of your NDIS plan.",
                        list: [
                            "Assistance with understanding and implementation of the right NDIS plan",
                            "Selection of the right NDIS service provider who will be able to address your specific support needs and respond to it accordingly",
                            "Empowering you with the capacity & skills to exercise choice and control over your support plan",
                            "Development of problem-solving and crisis management skills",
                            "Advocacy and coordination between different service provider to ensure effective, seamless, integrated support mechanism",
                            "Monitoring and review of your progress and timely generation of reports thereof"
                        ]
                    },
                    {
                        title: "Why Choose Js Choice – Care and Support?",
                        body: "",
                        list: [
                            `We believe in empowerment: Our NDIS Support Coordinator in ${location} does not just believe in assisting you in making the most of your NDIS care plans. We believe in empowering you with the ability to choose your one plan and have control on the same.`,
                            "We emphasise on your independence: The service providers and opportunities our support coordinators recommend are entirely based on appropriate quality and availability of the care that will help you live your life with independence.",
                            "Our service is flexible: We are flexible enough to adjust ourselves, depending on your lifestyle and your support needs so that we deliver case-specific support coordination.",
                            "We are experienced: We are experienced, and this makes us your automatic choice as a NDIS support coordinator."
                        ]
                    },
                    {
                        title: `Frequently Asked Questions Answered By Our Support Coordinators in ${location}`,
                        body: `At Js Choice – Care and Support, we use an assessment, planning, and ongoing support process for our support coordination. First, an evaluation establishes the degree of assistance coordination needed.\n\nAfter that, a plan with objectives and backing is created. By putting participants in touch with service providers and speaking out for their needs, the support coordinator assists in carrying out the plan.\n\nThe three support coordination levels are low, medium, and high-intensity. It is the intricacy of the participant’s needs that determines the level. While high-intensity support coordination offers more extensive help, low-intensity coordination offers just modest support.\n\nOne of the main duties of a support coordinator is to explain your NDIS plan to you, help you choose and get in touch with service providers, arrange for services, speak up for your needs, and offer advice on how to use your plan efficiently.`
                    }
                ]
            };

        case 'accom':
            return {
                serviceType: 'accom',
                location,
                title: `NDIS Accommodation in ${location} | Short Term Accommodation ${location}`,
                description: `Looking for NDIS short term accommodation in ${location}? Get in touch with us to avail NDIS accommodation in ${location} for independent living. Visit our website for details.`,
                heroTitle: `NDIS Accommodation in ${location} for Independent Living`,
                heroSubtitle: "Safe, accessible housing tailored to support your individual needs.",
                content: [
                    {
                        title: "What is NDIS Accommodation?",
                        body: `NDIS accommodation encompasses a variety of living arrangements designed to meet the unique needs of people with disabilities. These options aim to provide participants with safe, accessible housing that allows them to live as independently as possible while receiving the necessary support.\n\nWe at Js Choice – Care and Support offer a variety of disability-friendly accommodation choices, each tailored to support the individual needs of the participants. Whether you’re looking for a short-term stay or a long-term living solution, we provide NDIS accommodation support in ${location} that helps individuals thrive in a safe and secure environment.`
                    },
                    {
                        title: `NDIS Short Term Accommodation in ${location}`,
                        body: `Our NDIS short term accommodation in ${location} offers flexible, short-term housing solutions that cater to a variety of needs. This is perfect for participants who require a temporary stay, such as those who need respite care, have upcoming hospital stays, or are transitioning between different housing arrangements.\n\nOur STA providers in ${location} assist NDIS participants in getting a safe, comfortable, and accessible living space that caters to their bespoke support needs.`
                    },
                    {
                        title: `What Does NDIS Short Term Accommodation in ${location} Include?`,
                        body: "We provide a range of services designed to ensure participants feel at home, including:",
                        list: [
                            "Comfortable, private living spaces",
                            "Assistance with daily tasks like personal care, meal preparation, and housekeeping",
                            "24/7 support from trained staff",
                            "Social and recreational activities to encourage community participation",
                            "Access to emergency and medical support when needed"
                        ]
                    },
                    {
                        title: "Why Choose Our Accommodation Services?",
                        body: `Participants can expect a person-centred accommodation service that focuses on their individual needs. Whether it’s a weekend stay or a few weeks, we are here to make sure that every participant feels comfortable and supported.`
                    }
                ]
            };

        case 'provider':
            return {
                serviceType: 'provider',
                location,
                title: `Trusted NDIS Providers in ${location} | Js Choice – Care and Support`,
                description: `Looking for reliable NDIS providers in ${location}? We offer personalised disability support services focused on independence, wellbeing, and quality care according to your NDIS goals.`,
                heroTitle: `Experienced NDIS Providers in ${location} Offering Personalised Services`,
                heroSubtitle: "Delivering a wide range of NDIS supports to cater to diverse requirements.",
                content: [
                    {
                        title: `Why Choose Our NDIS Providers in ${location}?`,
                        body: "We are known for providing:",
                        list: [
                            "Person-centred plans",
                            "Compassionate support workers with extensive experience",
                            "A wide range of disability services",
                            "Focus on inclusivity and autonomy",
                            "Clear and transparent communication",
                            "CALD approach to care"
                        ]
                    },
                    {
                        title: "What’s Covered Under Our NDIS Services?",
                        body: "At Js Choice – Care and Support, we deliver a wide range of NDIS supports that cater to the diverse requirements of our participants. These include:",
                        list: [
                            "Assistance with Daily Life: We help with everyday tasks, including personal care, housekeeping, and meal preparation.",
                            "Group/Centre Activities: Our engaging group and centre activities encourage socialisation, skill development, and fun.",
                            "Emergency Respite: We offer emergency respite services, providing families and carers with a temporary break.",
                            "Assistance with Nursing Care: Our nursing care services include medication management, health monitoring, and personal care.",
                            "Access to Community Activities: We help participants engage in community events and social activities.",
                            "Transportation Assistance: Our transportation services help participants travel to appointments and outings.",
                            `Allied Health Services: NDIS providers in ${location} offer access to allied health professionals such as physiotherapists.`,
                            "Psychosocial Recovery Coaching: Our psychosocial recovery coaching helps individuals manage mental health challenges."
                        ]
                    },
                    {
                        title: "Your Journey to Independence",
                        body: "We’re ready to help you unlock your potential with tailored care that fits your unique needs. Whether it’s personal assistance, nursing support, or community access, we’re here to make your goals a reality."
                    }
                ]
            };

        default:
            return null;
    }
};
