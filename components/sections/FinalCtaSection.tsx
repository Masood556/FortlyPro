import { ZipCheckForm } from "@/components/ui/ZipCheckForm";

export function FinalCtaSection() {
  return (
    <section className="band deep final" aria-labelledby="h-final">
      <div className="wrap">
        <h2 className="h2 sm" id="h-final">
          Check your zip. Book in 60 seconds.
        </h2>
        <p className="lede">No calls needed. No charge until your cleaning is done.</p>
        <ZipCheckForm name="final" inputId="fZip" />
      </div>
    </section>
  );
}
