import styles from "./styles.module.css";
import { Volunteer } from "@/components/Volunteer/Volunteer";
import { VOLUNTEERS } from "@/data/volunteers";
import { Filters } from "@/components/Filters/Filters";
import { Layout } from "@/components/Layout/Layout";
import { useMemo, useState } from "react";
import { Sorting } from "@/data/filters";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { getHeaderProps } from "@/data/header";
import { Volonter } from "@/models/volunteer";
import { baseUrl } from "@/data/url";
dayjs.extend(customParseFormat);

export default function VolunteersPage({
  role,
  token,
  volunteers,
}: {
  role: string;
  token: string;
  volunteers: Volonter[];
}) {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [sorting, setSorting] = useState(Sorting.ByAchievementsAscending);
  const [minBirthDate, setMinBirthDate] = useState<Dayjs | null>(null);
  const [maxBirthDate, setMaxBirthDate] = useState<Dayjs | null>(null);
  const achievementTypes = useMemo(
    () =>
      Array.from(
        new Set(
          volunteers.map(
            (volunteer) => volunteer.dost ?? "Достижения не указаны"
          )
        )
      ),
    []
  );

  const filteredVolunteers = useMemo(() => {
    const baseVolunteers = volunteers.filter((volunteer) => {
      if (
        achievements.length !== 0 &&
        !achievements.includes(volunteer.dost ?? "Достижения не указаны")
      ) {
        return false;
      }

      const birthDay = dayjs(volunteer.DOB, "YYYY-MM-DD");
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
    <Layout headerProps={getHeaderProps(role)}>
      <Typography variant="h4" component="h1">
        Список волонтеров
      </Typography>
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
            <Volunteer showPersonalData={false} volunteer={volunteer} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = String(
      await getCookie("token", { req: context.req, res: context.res })
    );

    const userInfo = await fetch(
      `http://hyper-ist.mooo.com:3000/user_info`,
      {
        headers: {
          token,
        },
      }
    ).then((response) => response.json());
    const allVolonters = await fetch(
      `http://hyper-ist.mooo.com:3000/all_volonters`,
      {
        headers: {
          token,
        },
      }
    ).then((response) => response.json());
    return {
      props: {
        token,
        role: userInfo.data.role,
        volunteers: allVolonters,
      },
    };
  } catch (error) {
    return {
      props: {
        role: "",
        token: "",
        volunteers: [],
      },
    };
  }
};
