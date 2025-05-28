import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { memo, ReactNode } from "react";
import Head from "next/head";

import classes from "./Layout.module.css";
import { Header, IHeaderProps } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export interface ILayoutProps {
  className?: string;
  headerProps?: IHeaderProps;
  children: ReactNode;
}

export const Layout = memo(
  ({ headerProps, children, className }: ILayoutProps) => {
    return (
      <>
        <Head>
          <title>Волонетрский Центр</title>
          <meta
            name="description"
            content="Мы ценим вклад волонетров, и предоставляем централизованную систему управления бонусами"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={`${classes.layout_root} ${className}`}>
            <Header {...headerProps} />
            <div className={classes.layout}>{children}</div>
            <Footer />
          </div>
        </LocalizationProvider>
      </>
    );
  }
);

Layout.displayName = "Layout";
