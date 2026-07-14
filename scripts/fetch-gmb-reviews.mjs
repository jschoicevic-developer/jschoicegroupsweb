import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { scraper } from "google-maps-review-scraper";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, "..", "src", "data", "gmb-reviews.ts");

const MAPS_URL =
  "https://www.google.com/maps/place/Js+Choice+-+Care+and+Support/@-37.8841432,144.7353927,17z/data=!3m1!4b1!4m6!3m5!1s0xabcfe6437b782811:0x58ba017b4a222108!8m2!3d-37.8841432!4d144.7379676!16s%2Fg%2F11f5xq8q8q?hl=en";

function cleanReviewText(text) {
  if (!text) return "";
  return text.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
}

function formatRelativeTime(published) {
  if (!published) return undefined;

  const timestamp = Number(published);
  if (!Number.isFinite(timestamp)) return undefined;

  const diffMs = Date.now() - timestamp;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 1) return "Recently";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function escapeString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatReview(review) {
  const text = cleanReviewText(review.review?.text);
  const relativeTime = formatRelativeTime(review.time?.published);

  return `  {
    id: "${review.review_id}",
    author: "${escapeString(review.author?.name?.trim() || "Google User")}",
    rating: ${review.review?.rating ?? 5},
    text: "${escapeString(text || "Shared a 5-star rating on Google.")}",
    relativeTime: "${relativeTime ?? "Recently"}",
  }`;
}

const scraped = await scraper({
  url: MAPS_URL,
  sort_type: "newest",
  pages: 2,
  clean: true,
});

if (!Array.isArray(scraped) || scraped.length === 0) {
  console.error("No reviews fetched.");
  process.exit(1);
}

const fileContents = `import { CONTACT_DETAILS } from "@/config/contact";

export interface GmbReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
}

export const GMB_PROFILE = {
  businessName: "Js Choice - Care and Support",
  rating: 5,
  totalReviews: ${scraped.length},
  googleMapsUrl: CONTACT_DETAILS.address.mapUrl,
};

/** Synced from Google Business Profile via \`npm run fetch-gmb-reviews\` */
export const GMB_REVIEWS: GmbReview[] = [
${scraped.map(formatReview).join(",\n")},
];
`;

writeFileSync(OUTPUT_FILE, fileContents, "utf8");
console.log(`Updated ${OUTPUT_FILE} with ${scraped.length} reviews.`);
