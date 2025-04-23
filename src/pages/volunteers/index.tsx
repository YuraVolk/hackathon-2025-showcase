import Image from "next/image";

import styles from "./styles.module.css";
import logoIcon from "../../assets/icons/logo.svg";

import { Volunteer } from "@/components/Volunteer/Volunteer";
import { VOLUNTEERS } from "@/data/volunteers";
import { Filters } from "@/components/Filters/Filters";
import { Layout } from "@/components/Layout/Layout";
import { useMemo, useState } from "react";
import { Sorting } from "@/data/filters";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Typography } from "@mui/material";
dayjs.extend(customParseFormat);

const VolunteersPage = () => {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [sorting, setSorting] = useState(Sorting.ByAchievementsAscending);
  const [minBirthDate, setMinBirthDate] = useState<Dayjs | null>(null);
  const [maxBirthDate, setMaxBirthDate] = useState<Dayjs | null>(null);

  const achievementTypes = useMemo(
    () =>
      Array.from(
        new Set(VOLUNTEERS.map((volunteer) => volunteer.achievements))
      ),
    []
  );

  const filteredVolunteers = useMemo(() => {
    const baseVolunteers = VOLUNTEERS.filter((volunteer) => {
      if (
        achievements.length !== 0 &&
        !achievements.includes(volunteer.achievements)
      ) {
        return false;
      }

      const birthDay = dayjs(volunteer.birth_date, "DD.MM.YYYY");
      if (
        (minBirthDate !== null && birthDay.isBefore(minBirthDate)) ||
        (maxBirthDate !== null && birthDay.isAfter(maxBirthDate))
      ) {
        return false;
      }

      return true;
    });

    if (sorting === Sorting.ByAchievementsDescending) {
      baseVolunteers.reverse();
    }

    return baseVolunteers;
  }, [achievements, sorting, minBirthDate, maxBirthDate]);

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
      <Typography variant="h4" component="h1">Список волонтеров</Typography>
      <Filters
        achievementTypes={achievementTypes}
        achievements={achievements}
        setAchievements={setAchievements}
        sorting={sorting}
        setSorting={setSorting}
        minBirthDate={minBirthDate}
        setMinBirthDate={setMinBirthDate}
        maxBirthDate={maxBirthDate}
        setMaxBirthDate={setMaxBirthDate}
      />
      <ul className={styles.volunteers}>
        {filteredVolunteers.map((volunteer) => (
          <li key={volunteer.id}>
            <Volunteer volunteer={volunteer} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default VolunteersPage;
