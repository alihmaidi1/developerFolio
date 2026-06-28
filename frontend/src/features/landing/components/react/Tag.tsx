import { tagLabels, type TagVariant } from "../tagVariants";

export function Tag({ variant }: { variant: TagVariant }) {
  return (
    <div className={["tag", `tag-variant-${variant}`].join(" ")}>
      {tagLabels[variant]}
    </div>
  );
}
