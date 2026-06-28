export interface AdminSkillStatement {
  id: string;
  text: string;
  sortOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export type SkillStatementOrderDirection = "up" | "down";

export interface ReorderSkillStatementRequest {
  skillStatementId: string;
  direction: SkillStatementOrderDirection;
}

export interface UpsertSkillStatementRequest {
  text: string;
  isPublished: boolean;
}
