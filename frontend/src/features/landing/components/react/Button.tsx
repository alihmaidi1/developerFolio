import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type SharedProps = {
  className?: string;
  children: ReactNode;
  variant?: "accent" | "border" | "default";
  size?: "sm" | "md";
  rounded?: boolean;
  renderAs?: "button" | "a" | "div";
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonWrapper({
  className = "",
  children,
  variant = "default",
  size = "md",
  rounded,
  renderAs = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "button-wrapper",
    `button-wrapper-variant-${variant}`,
    `button-wrapper-size-${size}`,
    rounded ? "button-wrapper-rounded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (renderAs === "a") {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (renderAs === "div") {
    return <div className={classes}>{children}</div>;
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {children}
    </button>
  );
}

export function Button({
  className = "",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper
      {...props}
      size={size}
      className={[
        "button",
        `button-size-${size}`,
        "children-unclickable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </ButtonWrapper>
  );
}

export function ButtonRound({
  className = "",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper
      {...props}
      rounded
      size={size}
      className={[
        "button-round",
        `button-round-size-${size}`,
        "children-unclickable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </ButtonWrapper>
  );
}
