import "./SideControls.css";
import { useUi } from "../../context/UiContext";

function SideControls() {
  const { theme, setTheme, language, setLanguage, t } = useUi();

  return (
    <div className="side-controls" aria-label="Theme and language controls">
      <button
        type="button"
        className={`side-controls__btn ${
          theme === "dark" ? "side-controls__btn--active" : ""
        }`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? t("side.theme.dark") : t("side.theme.light")}
      </button>

      <div className="side-controls__divider" />

      <button
        type="button"
        className={`side-controls__btn ${
          language === "en" ? "side-controls__btn--active" : ""
        }`}
        onClick={() => setLanguage("en")}
      >
        {t("side.lang.en")}
      </button>
      <button
        type="button"
        className={`side-controls__btn ${
          language === "ru" ? "side-controls__btn--active" : ""
        }`}
        onClick={() => setLanguage("ru")}
      >
        {t("side.lang.ru")}
      </button>

      <button
        type="button"
        className={`side-controls__btn ${
          language === "az" ? "side-controls__btn--active" : ""
        }`}
        onClick={() => setLanguage("az")}
      >
        {t("side.lang.az")}
      </button>
    </div>
  );
}

export default SideControls;

