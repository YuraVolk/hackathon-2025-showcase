import Paper from "@mui/material/Paper";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { Layout } from "@/components/Layout/Layout";
import { getHeaderProps } from "@/data/header";
import { baseUrl } from "@/data/url";

export default function Home({ role, token }: { role: string; token: string }) {
  return (
    <Layout headerProps={getHeaderProps(role)}>
      <Paper elevation={3} className="intro" id="intro">
        <div className="text">
          <h1 className="center">
            Добро пожаловать на платформу Ресурсного центра поддержки
            добровольчества
          </h1>
          <p className="center p">Для чего нужна наша платформа?</p>
        </div>
      </Paper>
      <Paper elevation={3} className="intro" id="vol">
        <div className="text">
          <h1 className="center">Волонтеры</h1>
          <p className="p">
            На нашей платформе вы можете увидеть какие бонусы вы получили за
            свой труд
          </p>
          <p className="p">
            Бонусы назначаются вам на 6 месяцев, по истечении этого срока вы не
            сможете ими воспользоваться
          </p>
          <p className="p">
            В личном кабинете вы можете получить свой уникальный код, с помощью
            которого вы можете использовать свои бонусы (никому не сообщайте
            свой код)
          </p>
          <p className="p">
            Также в личном кабинете вы сможете просмотреть какие бонусы вы
            использовали, какие еще можете использовать и какие уже просрочились
          </p>
          <p className="p">Воспользоваться бонусом можно с помощью QR-кода</p>
        </div>
      </Paper>
      <Paper elevation={3} className="intro" id="parthners">
        <div className="text">
          <h1 className="center">Предприятия-партнеры</h1>
          <p className="p">
            С помощью нашей платформы вы можете Создать бонус и определить какое
            количетсво волонтеров его получит
          </p>
          <p className="p">
            Также вы можете просмотреть какие бонусы вы уже создали и сколько из
            них было использовано
          </p>
        </div>
      </Paper>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = String(
      await getCookie("token", { req: context.req, res: context.res })
    );

    const userInfo = await fetch(
      `http://hyper-ist.mooo.com:3000/user_info`,
      {
        headers: {
          token,
        },
      }
    ).then((response) => response.json());

    return {
      props: {
        token,
        role: userInfo.data.role,
      },
    };
  } catch (error) {
    return {
      props: {
        role: "",
        token: "",
      },
    };
  }
};
