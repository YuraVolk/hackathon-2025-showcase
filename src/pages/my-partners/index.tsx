import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";
import { Typography } from "@mui/material";
import { MyPartner } from "@/components/MyPartner/MyPartner";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { NachBonus } from "@/models/volunteer";
import { getHeaderProps } from "@/data/header";
import { baseUrl } from "@/data/url";

export default function MyPartnersPage({
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
        Мои партнеры
      </Typography>
      <div className={classes.my_partners}>
        {bonuses.length > 0 && (
          <MyPartner
            organization={{
              id: 1,
              naim: "Новое предприятие",
              id_acc: 1,
              bonuses,
            }}
            token={token}
          />
        )}
      </div>
      {bonuses.length === 0 && (
        <Typography component="h2" variant="h5">
          У вас пока нет партнеров-предприятия, предлагающих вам бонусы.
          Ожидайте следующего распределения.
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

    const userInfo = await fetch(`${baseUrl}/api/user_info`, {
      headers: {
        token,
      },
    }).then((response) => response.json());
    const bonuses = await fetch(`${baseUrl}/api/bonuses_volonter`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: userInfo.data.id,
      }),
    }).then((result) => result.json());

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
        role: "",
        token: "",
        bonuses: [],
      },
    };
  }
};
