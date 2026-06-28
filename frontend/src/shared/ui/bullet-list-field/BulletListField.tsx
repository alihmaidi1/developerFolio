import { Plus, X } from "lucide-react";
import { Input } from "../input/Input";
import styles from "./BulletListField.module.css";

interface BulletListFieldProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  maxItems?: number;
  ariaLabel?: string;
}

export function BulletListField({
  value,
  onChange,
  placeholder = "Add a bullet point",
  addLabel = "Add bullet",
  maxItems,
  ariaLabel,
}: BulletListFieldProps) {
  const canAdd = maxItems === undefined || value.length < maxItems;

  const updateAt = (index: number, text: string) => {
    const next = value.slice();
    next[index] = text;
    onChange(next);
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const append = () => onChange([...value, ""]);

  return (
    <div className={styles.field} aria-label={ariaLabel}>
      {value.map((text, index) => (
        <div key={index} className={styles.row}>
          <Input
            value={text}
            placeholder={placeholder}
            onChange={(event) => updateAt(index, event.target.value)}
          />
          <button
            type="button"
            className={styles.removeButton}
            aria-label="Remove bullet"
            onClick={() => removeAt(index)}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      ))}
      {canAdd && (
        <button type="button" className={styles.addButton} onClick={append}>
          <Plus aria-hidden="true" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
