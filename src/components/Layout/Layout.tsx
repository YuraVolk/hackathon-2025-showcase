import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { memo, ReactNode } from "react";

import classes from "./Layout.module.css";
import { Header, IHeaderProps } from "../Header/Header";

export interface ILayoutProps {
  headerProps?: IHeaderProps;
  children: ReactNode;
}

export const Layout = memo(({ headerProps, children }: ILayoutProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {headerProps && <Header {...headerProps} />}
      <div className={classes.layout}>{children}</div>
    </LocalizationProvider>
  );
});

Layout.displayName = "Layout";
