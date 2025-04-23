import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";
import { ORGANIZATIONS } from "@/data/volunteers";
import { Typography } from "@mui/material";
import { MyPartner } from "@/components/MyPartner/MyPartner";

export default function MyPartnersPage() {
  return (
    <Layout className={classes.layout}>
      <Typography variant="h4" component="h1">
        Мои партнеры
      </Typography>
      <div className={classes.my_partners}>
        {ORGANIZATIONS.map((organization) => (
          <MyPartner key={organization.id} organization={organization} />
        ))}
      </div>
    </Layout>
  );
}
