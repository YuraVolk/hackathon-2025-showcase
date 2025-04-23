import { Layout } from "@/components/Layout/Layout";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./styles.module.css";
import logoIcon from "@/assets/icons/logo.svg";
import Image from "next/image";
import { IVolunteer, IBonus, IBonusHistoryItem } from "@/models/volunteer";
import { useMemo, useState } from "react";
import { VOLUNTEERS } from "@/data/volunteers";
import { Bonus } from "@/components/Bonus/Bonus";
import { AddBonusModal } from "@/components/AddBonusModal/AddBonusModal";

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

export default function BonusListPage() {
  const [isAddBonusModalOpen, setAddBonusModalOpen] = useState(false);
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
            url: "/volunteers/",
          },
          {
            title: "Список бонусов",
            url: "/bonus-list/",
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
      <Typography variant="h4" component="h1" className={styles.bonuses_title}>
        История выданных бонусов
      </Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddIcon />}
        onClick={() => {
          setAddBonusModalOpen(true);
        }}
      >
        Создать новый тип бонусов
      </Button>
      <ul className={styles.bonuses}>
        {filteredBonuses.map((bonus) => (
          <li key={bonus.bonus.id}>
            <Bonus bonusWithVolunteers={bonus} />
          </li>
        ))}
      </ul>
      <AddBonusModal
        open={isAddBonusModalOpen}
        volunteers={VOLUNTEERS}
        onClose={() => {
          setAddBonusModalOpen(false);
        }}
      />
    </Layout>
  );
}
