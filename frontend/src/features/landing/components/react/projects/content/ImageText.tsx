import { ProjectComponent } from "../ProjectComponent";
import type { ProjectComponent as ProjectComponentType } from "../../../../content/types";

export function ImageText({
  imagePosition,
  src,
  alt,
  component,
  border,
}: {
  imagePosition: "left" | "right";
  src?: string;
  alt?: string;
  component?: ProjectComponentType;
  border?: boolean;
}) {
  return (
    <>
      <div
        className={["imageText-image", `imageText-image-${imagePosition}`].join(
          " ",
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            fetchPriority="high"
            className={[
              "imageText-image-content",
              border ? "imageText-image-content-border" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ) : null}
      </div>
      {component ? (
        <div
          className={[
            "imageText-content",
            imagePosition === "right"
              ? "imageText-content-left"
              : "imageText-content-right",
          ].join(" ")}
        >
          <ProjectComponent component={component} index={0} />
        </div>
      ) : null}
    </>
  );
}
