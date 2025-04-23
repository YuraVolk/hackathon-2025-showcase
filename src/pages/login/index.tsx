import { SignInForm } from "@/components/Authorization/SignInForm";
import { Layout } from "@/components/Layout/Layout";
import classes from "./styles.module.css";

export default function LoginPage() {
  return (
    <Layout className={classes.layout}>
      <SignInForm />
    </Layout>
  );
}
