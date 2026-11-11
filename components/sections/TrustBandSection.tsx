const TRUST_POINTS = [
  "Owner‑operated",
  "5‑star rated on Google",
  "Background‑checked techs",
  "Fully insured",
  "No charge until it's done",
];

/** Slim white band of trust chips directly under the hero. */
export function TrustBandSection() {
  return (
    <section className="band trustband" aria-label="Trust">
      <div className="wrap">
        <ul className="trustchips big">
          {TRUST_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
