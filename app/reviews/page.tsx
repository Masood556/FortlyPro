import { ReviewsPage, buildTrustMetadata } from "@/components/pages/TrustPages";
import { TRUST_PAGES } from "@/lib/data/trust-pages";

export const metadata = buildTrustMetadata(TRUST_PAGES.reviews);

export default function Page() {
  return <ReviewsPage />;
}
