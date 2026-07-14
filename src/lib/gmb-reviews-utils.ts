import type { GmbReview } from "@/data/gmb-reviews";

const HIDDEN_PLACEHOLDER_TEXT = "Shared a 5-star rating on Google.";
const HIDDEN_AUTHORS = new Set(["জীবন তো একটাই !"]);

export const REVIEW_TEXT_TRUNCATE_LENGTH = 160;

export function isDisplayableReview(review: GmbReview): boolean {
  if (HIDDEN_AUTHORS.has(review.author.trim())) {
    return false;
  }

  if (review.text.trim() === HIDDEN_PLACEHOLDER_TEXT) {
    return false;
  }

  return review.text.trim().length > 0;
}

export function getDisplayableReviews(reviews: GmbReview[]): GmbReview[] {
  return reviews.filter(isDisplayableReview);
}
