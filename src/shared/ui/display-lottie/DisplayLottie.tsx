import { lazy, Suspense } from "react";
import Loading from "@/shared/ui/loading/Loading";

const Lottie = lazy(() => import("lottie-react"));

interface DisplayLottieProps {
  animationData: unknown;
}

export default function DisplayLottie({ animationData }: DisplayLottieProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Lottie animationData={animationData} loop />
    </Suspense>
  );
}
