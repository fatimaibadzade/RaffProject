import "./Footer.css";
import BrandLogo from "../BrandLogo/BrandLogo";
import { useUi } from "../../context/UiContext";

function Footer() {
  const { t, theme } = useUi();
  return (
    <footer className="footer">
      <div className="footer__intro">
        <BrandLogo light={theme === "dark"} />
        <p>
          {t("footer.intro")}
        </p>
      </div>

      <div className="footer-links">
        <div>
          <strong>{t("footer.shop")}</strong>
          <span>{t("footer.newArrivals")}</span>
          <span>{t("footer.bestSellers")}</span>
          <span>{t("navbar.wishlist")}</span>
        </div>
        <div>
          <strong>{t("footer.company")}</strong>
          <span>{t("footer.about")}</span>
          <span>{t("footer.journal")}</span>
          <span>{t("footer.contact")}</span>
        </div>
        <div>
          <strong>{t("footer.support")}</strong>
          <span>{t("footer.delivery")}</span>
          <span>{t("footer.returns")}</span>
          <span>{t("footer.account")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;