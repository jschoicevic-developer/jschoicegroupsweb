import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase-admin";

const BASE_URL = "https://jschoicegroup.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = [
        { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly" as const },
        { url: `${BASE_URL}/about-us`, priority: 0.9, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/contact-us`, priority: 0.9, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/gallery`, priority: 0.7, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/resources`, priority: 0.7, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/career`, priority: 0.7, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
        { url: `${BASE_URL}/referral`, priority: 0.8, changeFrequency: "monthly" as const },
        { url: `${BASE_URL}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" as const },
        { url: `${BASE_URL}/terms-and-conditions`, priority: 0.4, changeFrequency: "yearly" as const },
    ];

    const servicePages = [
        "/assistance-with-daily-life",
        "/psychosocial-recovery-coach",
        "/assistance-with-nursing-care",
        "/emergency-respite",
        "/group-centre-activities",
        "/transportation-assistance",
        "/access-to-community-activities",
        "/support-coordination",
        "/allied-health-services",
        "/employment-education",
        "/ndis-access-requests",
        "/innovative-community-participation-including-volunteer-opportunities",
        "/ndis-accommodation",
        "/client-and-family-advocacy",
        "/client-and-family-advocacy-for-ndis-participants-only",
    ].map((path) => ({
        url: `${BASE_URL}${path}`,
        priority: 0.8,
        changeFrequency: "monthly" as const,
    }));

    const locationPages = [
        "/ndis-providers-altona",
        "/ndis-providers-altona-meadows",
        "/ndis-providers-altona-north",
        "/ndis-providers-craigieburn",
        "/ndis-providers-epping",
        "/ndis-providers-footscray",
        "/ndis-providers-hoppers-crossing",
        "/ndis-providers-lara",
        "/ndis-providers-laverton",
        "/ndis-providers-point-cook",
        "/ndis-providers-shepparton",
        "/ndis-providers-south-morang",
        "/ndis-providers-tarneit",
        "/ndis-providers-truganina",
        "/ndis-providers-werribee",
        "/ndis-providers-williams-landing",
        "/ndis-accommodation-geelong",
    ].map((path) => ({
        url: `${BASE_URL}${path}`,
        priority: 0.8,
        changeFrequency: "monthly" as const,
    }));

    const toolPages = [
        "/tools",
        "/tools/ndis-budget-calculator",
        "/tools/ndis-price-guide",
        "/tools/service-matcher",
    ].map((path) => ({
        url: `${BASE_URL}${path}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
    }));

    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const supabase = createServerClient();
        const { data: posts } = await supabase
            .from("blog_posts")
            .select("slug, updated_at, published_at")
            .eq("status", "published")
            .order("published_at", { ascending: false });

        if (posts) {
            blogPages = posts.map((post) => ({
                url: `${BASE_URL}/blog/${post.slug}`,
                lastModified: new Date(post.updated_at ?? post.published_at),
                priority: 0.7,
                changeFrequency: "weekly" as const,
            }));
        }
    } catch {
        // Sitemap generation continues without blog posts if DB is unavailable
    }

    const lastModified = new Date();

    const staticEntries = [
        ...staticPages,
        ...servicePages,
        ...locationPages,
        ...toolPages,
    ].map((page) => ({ ...page, lastModified }));

    return [...staticEntries, ...blogPages];
}
