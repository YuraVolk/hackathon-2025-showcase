import React, { memo } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import dobroLogo from "@/assets/icons/dobro-logo.svg";
import Image from "next/image";

export const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>О проекте</h3>
          <p className={styles.footerText}>
            Платформа для волонтеров и партнеров, созданная чтобы объединять
            людей и делать добрые дела вместе.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Контакты</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Телефон:</span>
              <a href="tel:+000000000" className={styles.contactLink}>
                0 (000) 000-00-00
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Email:</span>
              <a href="mailto:mail@mail.ru" className={styles.contactLink}>
                mail@mail.ru
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Адрес:</span>
              <address>г. Москва, ул. Тестовая</address>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Ресурсы</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link href="/" className={styles.link}>
                О нас
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Мы в соцсетях</h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <AlternateEmailIcon style={{ fontSize: 24 }} />
            </a>
            <a href="#" className={styles.socialLink}>
              <TelegramIcon style={{ fontSize: 24 }} />
            </a>
            <a href="#" className={styles.socialLink}>
              <YouTubeIcon style={{ fontSize: 24 }} />
            </a>
          </div>
          <div className={styles.partnerLink}>
            <a
              href="https://dobro.ru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={dobroLogo} alt="Добро.ру" width={120} height={40} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Ресурсный центр волонтерства. Все права
          защищены.
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
