import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";
import { RegisterForm } from "@/components/Authorization/RegisterForm";

export default function RegisterPage() {
  return (
    <Layout className={classes.layout}>
      <RegisterForm />
    </Layout>
  );
}
