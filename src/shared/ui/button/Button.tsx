import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.css";

interface CommonButtonProps {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: "default" | "large";
  text?: string;
  variant?: "primary" | "secondary" | "ghost";
}

type LinkButtonProps = CommonButtonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href" | "rel" | "target"
  > & {
    href: string;
    newTab?: boolean;
  };

type ActionButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
    newTab?: never;
  };

type ButtonProps = LinkButtonProps | ActionButtonProps;

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    fullWidth = false,
    size = "default",
    text,
    variant = "primary",
    ...elementProps
  } = props;
  const buttonClassName = cn(
    styles.button,
    styles[variant],
    size === "large" && styles.large,
    fullWidth && styles.fullWidth,
    className,
  );
  const content = children ?? text;

  if ("href" in elementProps && typeof elementProps.href === "string") {
    const { href, newTab, ...anchorProps } = elementProps;

    return (
      <a
        {...anchorProps}
        className={buttonClassName}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = elementProps as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  >;

  return (
    <button {...buttonProps} className={buttonClassName} type={type}>
      {content}
    </button>
  );
}
