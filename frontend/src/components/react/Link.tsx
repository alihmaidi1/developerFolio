import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  href?: string;
  external?: boolean;
  replace?: boolean;
  children: ReactNode;
};

export function Link({
  to,
  href,
  external,
  replace,
  onClick,
  children,
  ...props
}: LinkProps) {
  const navigate = useNavigate();
  const targetHref = href ?? to ?? "#";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || external || !to) return;
    event.preventDefault();
    navigate(to, { replace });
  };

  return (
    <a
      {...props}
      href={targetHref}
      target={external ? "_blank" : props.target}
      rel={external ? "noreferrer" : props.rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
