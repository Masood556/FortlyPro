import { StoryPage, buildTrustMetadata } from "@/components/pages/TrustPages";
import { TRUST_PAGES } from "@/lib/data/trust-pages";

export const metadata = buildTrustMetadata(TRUST_PAGES.story);

export default function Page() {
  return <StoryPage />;
}
