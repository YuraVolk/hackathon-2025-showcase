import { Layout } from "@/components/Layout/Layout";
import { Typography } from "@mui/material";

import styles from "./styles.module.css";
import logoIcon from "../../assets/icons/logo.svg";
import Image from "next/image";
import { IVolunteer, IBonus, IBonusHistoryItem } from "@/models/volunteer";
import { useMemo } from "react";
import { VOLUNTEERS } from "@/data/volunteers";
import { Bonus } from "@/components/Bonus/Bonus";

const transformVolunteersToBonuses = (
  volunteers: IVolunteer[]
): Array<{
  bonus: IBonus;
  assignments: {
    historyItem: IBonusHistoryItem;
    volunteer: IVolunteer;
  }[];
}> => {
  const bonusMap = new Map<
    string,
    {
      bonus: IBonus;
      assignments: {
        historyItem: IBonusHistoryItem;
        volunteer: IVolunteer;
      }[];
    }
  >();

  volunteers.forEach((volunteer) => {
    volunteer.history.forEach((historyItem) => {
      const bonusKey = historyItem.bonus.id;

      if (!bonusMap.has(bonusKey)) {
        bonusMap.set(bonusKey, {
          bonus: historyItem.bonus,
          assignments: [],
        });
      }

      bonusMap.get(bonusKey)!.assignments.push({
        historyItem,
        volunteer,
      });
    });
  });

  return Array.from(bonusMap.values());
};

const VolunteersPage = () => {
  const filteredBonuses = useMemo(
    () => transformVolunteersToBonuses(VOLUNTEERS),
    []
  );

  return (
    <Layout
      headerProps={{
        logo: <Image src={logoIcon} alt="Лого" width={32} height={32} />,
        categories: [
          {
            title: "Главная",
            url: "/",
          },
          {
            title: "Волонтеры",
            url: "/partners-dashboard/",
            childCategories: [
              {
                title: "Список бонусов",
                url: "/partners-dashboard/bonuses/",
              },
              {
                title: "Регистрация бонуса",
                url: "/partners-dashboard/bonuses/new",
              },
            ],
          },
          {
            title: "Связаться с нами",
            url: () =>
              window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: "smooth",
              }),
          },
        ],
      }}
    >
      <Typography variant="h4" component="h1">
        История выданных бонусов
      </Typography>
      <ul className={styles.bonuses}>
        {filteredBonuses.map((bonus) => (
          <li key={bonus.bonus.id}>
            <Bonus key={bonus.bonus.id} bonusWithVolunteers={bonus} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default VolunteersPage;
