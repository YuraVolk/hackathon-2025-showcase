import { Header } from "@/components/Header/Header";
import Image from "next/image";

import styles from "./styles.module.css";
import logoIcon from "../../assets/icons/logo.svg";

import { Volunteer } from "@/components/Volunteer/Volunteer";
import { VOLUNTEERS } from "@/data/volunteers";

const PartnersDashboard = () => {
  return (
    <>
      <Header
        logo={<Image src={logoIcon} alt="Лого" width={32} height={32} />}
        categories={[
          {
            title: "Главная",
            url: "/",
          },
          {
            title: "Волонтеры",
            url: "/partners-dashboard/",
            childCategories: [
              { title: "Список бонусов", url: "/partners-dashboard/bonuses/" },
              {
                title: "Регистрация бонуса",
                url: "/partners-dashboard/bonuses/new",
              },
            ],
          },
          {
            title: "Связаться с нами",
            url: () => window.scrollTo(0, document.body.scrollHeight),
          },
        ]}
      />
      <ul className={styles.volunteers}>
        {VOLUNTEERS.map((volunteer) => (
          <li key={volunteer.id}>
            <Volunteer volunteer={volunteer} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PartnersDashboard;
