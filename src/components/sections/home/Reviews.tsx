import { GMB_PROFILE, GMB_REVIEWS } from "@/data/gmb-reviews";
import { getDisplayableReviews } from "@/lib/gmb-reviews-utils";
import ReviewsCarousel from "./ReviewsCarousel";

const Reviews = () => {
  const reviews = getDisplayableReviews(GMB_REVIEWS);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <ReviewsCarousel
      reviews={reviews}
      rating={GMB_PROFILE.rating}
      totalReviews={GMB_PROFILE.totalReviews}
      googleMapsUrl={GMB_PROFILE.googleMapsUrl}
    />
  );
};

export default Reviews;
