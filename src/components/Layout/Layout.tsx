import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { memo, ReactNode } from "react";

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={`${classes.layout_root} ${className}`}>
          <Header {...headerProps} />
          <div className={classes.layout}>{children}</div>
          <Footer />
        </div>
      </LocalizationProvider>
    );
  }
);

Layout.displayName = "Layout";
