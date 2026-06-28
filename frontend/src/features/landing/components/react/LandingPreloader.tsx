import { Loading, LoadingLogo } from "@/shared/ui";

interface LandingPreloaderProps {
  isVisible: boolean;
  progress: number;
}

export function LandingPreloader({
  isVisible,
  progress,
}: LandingPreloaderProps) {
  return (
    <Loading
      className={["preloader", !isVisible ? "preloader-hidden" : ""]
        .filter(Boolean)
        .join(" ")}
      label="Loading portfolio"
      progress={progress}
      showProgressTrack={false}
      variant="overlay"
    >
      <LoadingLogo className="preloader-svg" progress={progress} />
    </Loading>
  );
}
