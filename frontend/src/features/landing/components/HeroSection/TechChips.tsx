import styles from "./HeroSection.module.css";

interface TechChipsProps {
  items: string[];
}

export function TechChips({ items }: TechChipsProps) {
  return (
    <div className={styles.techRow} data-anim="hero-tech">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
