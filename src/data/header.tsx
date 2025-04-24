import { IHeaderProps } from "@/components/Header/Header";
import Image from "next/image";
import logoIcon from "@/assets/icons/logo.svg";

export const userHeaderProps: IHeaderProps = {
  isAuthenticated: true,
  logo: <Image src={logoIcon} alt="Лого" width={32} height={32} />,
  categories: [
    {
      title: "Главная",
      url: "/",
    },
    {
      title: "Мои бонусы",
      url: "/my-bonuses/",
    },
    {
      title: "Мои партнеры",
      url: "/my-partners/",
    },
    {
      title: "Связаться с нами",
      url: () =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
    },
  ],
};

export const partnerHeaderProps: IHeaderProps = {
  isAuthenticated: true,
  logo: <Image src={logoIcon} alt="Лого" width={32} height={32} />,
  categories: [
    {
      title: "Главная",
      url: "/",
    },
    {
      title: "Волонтеры",
      url: "/volunteers/",
    },
    {
      title: "Управление бонусами",
      url: "/bonus-list/",
    },
    {
      title: "Связаться с нами",
      url: () =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
    },
  ],
};

export const adminHeaderProps: IHeaderProps = {
  isAuthenticated: true,
  logo: <Image src={logoIcon} alt="Лого" width={32} height={32} />,
  categories: [
    {
      title: "Главная",
      url: "/",
    },
  ],
};

export const getHeaderProps = (role: string) => {
  switch (role) {
    case "Администратор":
      return adminHeaderProps;
    case "Предприятие-партнёр":
      return partnerHeaderProps;
    case "Волонтёр":
      return userHeaderProps;
    default:
      return undefined;
  }
};
