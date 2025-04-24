import { Layout } from "@/components/Layout/Layout";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { VOLUNTEERS } from "@/data/volunteers";
import { Bonus } from "@/components/Bonus/Bonus";
import { AddBonusModal } from "@/components/AddBonusModal/AddBonusModal";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { getHeaderProps } from "@/data/header";
import { baseUrl } from "@/data/url";

const transformVolunteersToBonuses = (
  volunteers: any[]
): Array<{
  bonus: any;
  assignments: {
    historyItem: any;
    volunteer: any;
  }[];
}> => {
  const bonusMap = new Map<
    string,
    {
      bonus: any;
      assignments: {
        historyItem: any;
        volunteer: any;
      }[];
    }
  >();

  volunteers.forEach((volunteer) => {
    volunteer.history.forEach((historyItem: any) => {
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

export default function BonusListPage({
  role,
  token,
}: {
  role: string;
  token: string;
}) {
  const [isAddBonusModalOpen, setAddBonusModalOpen] = useState(false);
  const filteredBonuses = useMemo(
    () => transformVolunteersToBonuses(token ? VOLUNTEERS : []),
    []
  );

  return (
    <Layout headerProps={getHeaderProps(role)}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = String(
      await getCookie("token", { req: context.req, res: context.res })
    );

    const userInfo = await fetch(`http://hyper-ist.mooo.com:3000/user_info`, {
      headers: {
        token,
      },
    }).then((response) => response.json());

    return {
      props: {
        token,
        role: userInfo.data.role,
      },
    };
  } catch (error) {
    return {
      props: {
        role: "",
        token: "",
      },
    };
  }
};
