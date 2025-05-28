import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";
import { MyBonus } from "@/components/MyBonus/MyBonus";
import { Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { NachBonus } from "@/models/volunteer";
import { getHeaderProps } from "@/data/header";
import { baseUrl } from "@/data/url";

export default function MyBonusesPage({
  bonuses,
  token,
  role,
}: {
  bonuses: NachBonus[];
  token: string;
  role: string;
}) {
  return (
    <Layout className={classes.layout} headerProps={getHeaderProps(role)}>
      <Typography variant="h4" component="h1">
        Мои бонусы
      </Typography>
      <div className={classes.my_bonuses}>
        {bonuses.map((bonus) => (
          <MyBonus key={bonus.id} bonusItem={bonus} token={token} />
        ))}
      </div>
      {bonuses.length === 0 && (
        <Typography component="h2" variant="h5">
          У вас пока нет бонусов. Ожидайте следующего распределения.
        </Typography>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = String(
      await getCookie("token", { req: context.req, res: context.res })
    );

    const userInfo = await fetch(
      `https://volunteers-backend.onrender.com/user_info`,
      {
        headers: {
          token,
        },
      }
    ).then((response) => response.json());
    const bonuses = await fetch(
      `https://volunteers-backend.onrender.com/bonuses_volonter`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: userInfo.data.id,
        }),
      }
    ).then((result) => result.json());

    return {
      props: {
        bonuses: bonuses.resultBonus,
        token,
        role: userInfo.data.role,
      },
    };
  } catch (error) {
    return {
      props: {
        message: String(error),
        role: "",
        token: "",
        bonuses: [],
      },
    };
  }
};
