import { AudiencePage, buildAudienceMetadata } from "@/components/pages/AudiencePage";
import { getAudiencePage } from "@/lib/data/audience-pages";

const content = getAudiencePage("airbnb");

export const metadata = buildAudienceMetadata(content);

export default function Page() {
  return <AudiencePage content={content} />;
}
