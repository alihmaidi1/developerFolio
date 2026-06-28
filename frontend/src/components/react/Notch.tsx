export function Notch({ className = "" }: { className?: string }) {
  return (
    <div
      className={["react-notch", "notch", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path
          d="M0 256H256C114.616 256 0 141.385 0 0V256Z"
          fill="var(--icon-color)"
        />
      </svg>
    </div>
  );
}

export function NotchSection({ className = "" }: { className?: string }) {
  return (
    <div
      className={["react-notch-section", "notch-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <Notch className="notch-element notch-element-left" />
      <Notch className="notch-element notch-element-right" />
    </div>
  );
}
