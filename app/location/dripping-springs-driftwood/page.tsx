import { LocationPage, buildLocationMetadata } from "@/components/pages/LocationPage";
import { requireLocation } from "@/lib/data/locations";

const location = requireLocation("dripping-springs-driftwood");

export const metadata = buildLocationMetadata(location);

export default function Page() {
  return <LocationPage location={location} />;
}
