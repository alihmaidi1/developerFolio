export function Text({ title, text }: { title?: string; text?: string }) {
  if (title) {
    return (
      <div className="text text-with-title">
        <h3 className="text-title">{title}</h3>
        <p
          className="text-content"
          dangerouslySetInnerHTML={{ __html: text ?? "" }}
        />
      </div>
    );
  }

  return (
    <p className="text" dangerouslySetInnerHTML={{ __html: text ?? "" }} />
  );
}
