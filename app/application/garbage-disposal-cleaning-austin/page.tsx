import { AppliancePage, buildApplianceMetadata } from "@/components/pages/AppliancePage";
import { getAppliancePage } from "@/lib/data/appliance-pages";

const content = getAppliancePage("disposal");

export const metadata = buildApplianceMetadata(content);

export default function Page() {
  return <AppliancePage content={content} />;
}
