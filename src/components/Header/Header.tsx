import { memo, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { Button, Avatar, Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

interface IHeaderCategory {
  title: string;
  url?: string | (() => void);
  childCategories?: IHeaderCategory[];
}

export interface IHeaderProps {
  categories?: IHeaderCategory[];
  logo?: React.ReactNode;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

export const Header = memo(
  ({ categories = [], logo, isAuthenticated = false, user }: IHeaderProps) => {
    const router = useRouter();
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleCategoryHover = (index: number | null) => {
      setActiveSubmenu(index);
    };

    const handleCategoryClick = (category: IHeaderCategory) => {
      if (typeof category.url === "function") {
        category.url();
      } else if (category.url !== undefined) {
        router.push(category.url);
      }
    };

    const handleAuthClick = () => {
      router.push(isAuthenticated ? "/logout" : "/login");
    };

    return (
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.leftSection}>
            <IconButton
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </IconButton>

            <div className={styles.logoWrapper}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <span className={styles.logoText}>
                Ресурсный центр волонтерства
              </span>
            </div>
          </div>

          <nav
            className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ""}`}
          >
            <ul className={styles.navList}>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={styles.navItem}
                  onMouseEnter={() => handleCategoryHover(index)}
                  onMouseLeave={() => handleCategoryHover(null)}
                >
                  <div
                    className={styles.navLink}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.title}
                    <span className={styles.underline} />
                  </div>
                  {category.childCategories && (
                    <div
                      className={`${styles.submenu} ${
                        activeSubmenu === index ? styles.submenuActive : ""
                      }`}
                    >
                      <ul className={styles.submenuList}>
                        {category.childCategories.map((child, childIndex) => (
                          <li
                            key={childIndex}
                            className={styles.submenuItem}
                            onClick={() => handleCategoryClick(child)}
                          >
                            <div className={styles.submenuLink}>
                              {child.title}
                              <span className={styles.submenuUnderline} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}

              <li className={styles.externalLink}>
                <a
                  href="https://dobro.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dobroLink}
                >
                  Добро.рф
                </a>
              </li>

              <li className={styles.navItem}>
                <div
                  className={styles.navLink}
                  onClick={() => router.push("/contacts")}
                >
                  Контакты
                  <span className={styles.underline} />
                </div>
              </li>
            </ul>
          </nav>

          <div className={styles.rightSection}>
            {isAuthenticated ? (
              <>
                <IconButton
                  aria-label="notifications"
                  className={styles.notificationButton}
                >
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <div className={styles.userProfile}>
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    className={styles.avatar}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                  <span className={styles.userName}>{user?.name}</span>
                </div>
              </>
            ) : null}

            <Button
              variant="contained"
              color="primary"
              className={styles.authButton}
              onClick={handleAuthClick}
            >
              {isAuthenticated ? "Выйти" : "Войти"}
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";
