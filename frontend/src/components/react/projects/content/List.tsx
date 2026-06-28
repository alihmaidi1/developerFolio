export function List({
  title,
  items,
  size = "md",
}: {
  title?: string;
  items: string[];
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={["list", `list-size-${size}`].join(" ")}>
      {title ? <h3 className="list-title">{title}</h3> : null}
      <ul className="list-items">
        {items.map((item) => (
          <li
            key={item}
            className="list-item"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
    </div>
  );
}
