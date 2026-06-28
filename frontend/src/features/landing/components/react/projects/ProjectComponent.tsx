import { ImageText } from "./content/ImageText";
import { List } from "./content/List";
import { Media } from "./content/Media";
import { Text } from "./content/Text";
import type { ProjectComponent as ProjectComponentType } from "../../../content/types";

type Props = {
  component: ProjectComponentType;
  index: number;
};

export function ProjectComponent({ component, index }: Props) {
  switch (component.type) {
    case "media":
      return <Media {...component.props} index={index} />;
    case "imageText":
      return <ImageText {...component.props} />;
    case "list":
      return <List {...component.props} />;
    case "text":
      return <Text {...component.props} />;
    default:
      return null;
  }
}
