export interface AdminSoftwareSkill {
  id: string;
  name: string;
  iconClassName: string;
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type SoftwareSkillOrderDirection = "up" | "down";

export interface ReorderSoftwareSkillRequest {
  softwareSkillId: string;
  direction: SoftwareSkillOrderDirection;
}

export interface UpsertSoftwareSkillRequest {
  name: string;
  iconClassName: string;
  isPublished: boolean;
}
