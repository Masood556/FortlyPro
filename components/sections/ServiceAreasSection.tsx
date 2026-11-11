import { ServiceMap } from "@/components/sections/areas/ServiceMap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ZipCheckForm } from "@/components/ui/ZipCheckForm";
import { SITE } from "@/lib/config";
import { COMMUNITIES } from "@/lib/data/zip-coverage";

const AREA_ZIP_INPUT_ID = "aZip";

export function ServiceAreasSection() {
  return (
    <section className="band" id="areas" aria-labelledby="h-areas">
      <div className="wrap">
        <SectionHeader
          headingId="h-areas"
          eyebrow="Service area"
          eyebrowLong=" · Greater Austin"
          title="Proudly serving Greater Austin."
          lede="We're growing fast across Austin (some markets coming soon). Check your zip now."
        />
        <div className="areagrid rv">
          <ServiceMap zipInputId={AREA_ZIP_INPUT_ID} />
          <div className="areaside">
            <div className="areazip">
              <p className="findline">Find your neighborhood, then enter your zip.</p>
              <ZipCheckForm name="areas" inputId={AREA_ZIP_INPUT_ID} />
            </div>
            <p className="townlbl">Communities we serve (some coming soon)</p>
            <p className="townline" aria-label="Communities served">
              {COMMUNITIES.map((community, index) => (
                <span key={community}>
                  {index > 0 && (
                    <>
                      {" "}
                      <i>·</i>{" "}
                    </>
                  )}
                  {community}
                </span>
              ))}
            </p>
            <div className="waitcard">
              <b>Not on the list?</b>
              <span>We&apos;re adding neighborhoods every month.</span>
              <a className="btn btn-ghost" href={SITE.waitlistUrl}>
                Join the waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
