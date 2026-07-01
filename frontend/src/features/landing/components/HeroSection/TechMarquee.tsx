import styles from "./TechMarquee.module.css";

interface TechMarqueeProps {
  items: string[];
}

export function TechMarquee({ items }: TechMarqueeProps) {
  if (items.length === 0) return null;

  // Duplicate the track so the CSS transl+loop is seamless.
  const track = [...items, ...items];

  return (
    <div className={styles.marquee} data-anim="hero-tech">
      <div className={styles.viewport}>
        <ul className={styles.track}>
          {track.map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className={styles.item}
              aria-hidden={idx >= items.length}
            >
              <span className={styles.dot} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
