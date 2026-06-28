import { useI18n } from "../../hooks/useI18n";

export function LangSwitch() {
  const { locale, setLocale } = useI18n();
  const nextLocale = locale === "en" ? "de" : "en";

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={() => setLocale(nextLocale)}
      data-sound="click"
      data-hoversound="hover"
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
