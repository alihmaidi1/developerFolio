import { projectIds } from "./projects/index";

import type { TagVariant } from "../components/tagVariants";

export type ProjectId = (typeof projectIds)[number];

export type ProjectComponent =
  | {
      type: "media";
      props: {
        type: "image" | "video";
        src: string;
        alt?: string;
        caption?: string;
      };
    }
  | {
      type: "text";
      props: {
        title?: string;
        text?: string;
      };
    }
  | {
      type: "list";
      props: {
        title?: string;
        items: string[];
        size?: "sm" | "md" | "lg";
      };
    }
  | {
      type: "imageText";
      props: {
        imagePosition: "left" | "right";
        src?: string;
        alt?: string;
        border?: boolean;
        component?: ProjectComponent;
      };
    };

export interface ProjectContent {
  title: string;
  theme: "light" | "dark";
  tags: TagVariant[];
  description?: string;
  videoBorder?: boolean;
  live?: string;
  source?: string;
  components?: ProjectComponent[];
}

export interface SkillContent {
  name: string;
  bullets: string[];
}

export interface ProjectPreview {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
}
