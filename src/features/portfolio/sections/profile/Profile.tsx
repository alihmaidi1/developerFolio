import { lazy, Suspense } from "react";
import { useGithubProfile } from "@/features/portfolio/hooks/useGithubProfile";
import { openSource } from "@/features/portfolio/config/portfolio.config";
import Contact from "../contact/Contact";
import Loading from "@/shared/ui/loading/Loading";

const GithubProfileCard = lazy(
  () =>
    import("@/features/portfolio/components/github-profile-card/GithubProfileCard"),
);

export default function Profile() {
  const shouldLoadProfile = openSource.display && openSource.showGithubProfile;
  const {
    data: profile,
    isError,
    isPending,
  } = useGithubProfile(shouldLoadProfile);

  if (!shouldLoadProfile || isError) {
    return <Contact />;
  }

  if (isPending || !profile) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <GithubProfileCard prof={profile} />
    </Suspense>
  );
}
