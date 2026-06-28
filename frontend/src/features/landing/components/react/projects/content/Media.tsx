import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { Notch } from "../../Notch";

export function Media({
  type,
  src,
  alt,
  caption,
}: {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  index: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const mediaContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none reset",
      },
    });
    tl.fromTo(
      mediaContentRef.current,
      { scale: 0.8 },
      { scale: 1, duration: 0.4, ease: "power1.out" },
      0,
    );
    tl.fromTo(
      mediaRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 0.4, ease: "power1.out" },
      0,
    );
    return () => {
      tl.kill();
      gsap.set(mediaContentRef.current, { scale: 1 });
      gsap.set(mediaRef.current, { scale: 1 });
    };
  }, []);

  return (
    <div className="project-media" ref={wrapperRef}>
      <div className="project-media-content" ref={mediaContentRef}>
        {type === "image" ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            fetchPriority="high"
            className="project-media-image"
            ref={mediaRef as RefObject<HTMLImageElement>}
          />
        ) : (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="project-media-video"
            ref={mediaRef as RefObject<HTMLVideoElement>}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      {caption ? (
        <div className="project-media-caption">
          <Notch className="project-media-caption-notch project-media-caption-notch-left" />
          <Notch className="project-media-caption-notch project-media-caption-notch-top" />
          <p className="project-media-caption-copy">{caption}</p>
        </div>
      ) : null}
    </div>
  );
}
