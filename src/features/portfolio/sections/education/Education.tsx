import { useQuery } from "@tanstack/react-query";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import EducationCard from "@/features/portfolio/components/education-card/EducationCard";
import { getPublishedEducation } from "@/features/portfolio/api/public-education.api";
import type { EducationSchool } from "@/features/portfolio/model/portfolio-content.types";
import "./Education.scss";

export default function Education() {
  const educationQuery = useQuery({
    queryKey: ["portfolio", "education"],
    queryFn: getPublishedEducation,
    staleTime: 60_000,
  });

  const entries = educationQuery.data ?? [];

  if (entries.length === 0) {
    return null;
  }

  const schools: EducationSchool[] = entries.map((entry) => ({
    schoolName: entry.schoolName,
    logo: resolveAssetUrl(entry.logoUrl) ?? "",
    subHeader: entry.degree,
    duration: entry.duration,
    desc: entry.description ?? "",
    descBullets: entry.descriptionBullets,
  }));

  return (
    <div className="education-section" id="education">
      <h1 className="education-heading">Education</h1>
      <div className="education-card-container">
        {schools.map((school, index) => (
          <EducationCard key={index} school={school} />
        ))}
      </div>
    </div>
  );
}
