import type { ElementType } from "react";

interface EmphasisProps {
  text: string;
  /** Delimiter that wraps emphasised segments in the text. */
  marker?: string;
  /** Element used for emphasised segments. */
  as?: ElementType;
}

/** Renders `**bold**`-style segments as elements without injecting HTML. */
export function Emphasis({ text, marker = "**", as: Tag = "b" }: EmphasisProps) {
  return (
    <>
      {text.split(marker).map((segment, index) =>
        index % 2 === 1 ? <Tag key={index}>{segment}</Tag> : segment,
      )}
    </>
  );
}
