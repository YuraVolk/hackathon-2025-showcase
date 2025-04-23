import { memo, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

interface IHeaderCategory {
  title: string;
  url?: string | (() => void);
  childCategories?: IHeaderCategory[];
}

export interface IHeaderProps {
  categories?: IHeaderCategory[];
  logo?: React.ReactNode;
}

export const Header = memo(({ categories = [], logo }: IHeaderProps) => {
  const router = useRouter();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

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

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <nav className={styles.nav}>
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
          </ul>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = "Header";
