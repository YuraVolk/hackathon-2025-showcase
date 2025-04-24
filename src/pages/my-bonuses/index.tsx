import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";
import { VOLUNTEERS } from "@/data/volunteers";
import { MyBonus } from "@/components/MyBonus/MyBonus";
import { Typography } from "@mui/material";

export default function MyBonusesPage() {
  return (
    <Layout className={classes.layout}>
      <Typography variant="h4" component="h1">
        Мои бонусы
      </Typography>
      <div className={classes.my_bonuses}>
        {VOLUNTEERS[0].history.map((bonus) => (
          <MyBonus key={bonus.id} bonusItem={bonus} />
        ))}
      </div>
    </Layout>
  );
}
