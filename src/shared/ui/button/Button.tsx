import "./Button.scss";

interface ButtonProps {
  text: string;
  className?: string;
  href?: string;
  newTab?: boolean;
  download?: string;
}

export default function Button({
  text,
  className,
  href,
  newTab,
  download,
}: ButtonProps) {
  return (
    <div className={className}>
      <a
        className="main-button"
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
        download={download}
      >
        {text}
      </a>
    </div>
  );
}
