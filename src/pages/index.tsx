import { Header } from "@/components/Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Footer } from "@/components/Footer/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Paper elevation={3} className="intro" id="intro">
        <div className="text">
          <h1 className="center">
            Добро пожаловать на платформу Ресурсного центра поддержки
            добровольчества
          </h1>
          <p  className="center p">Для чего нужна наша платформа?</p>
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
              Бонусы назначаются вам на 6 месяцев, по истечении этого срока вы
              не сможете ими воспользоваться
            </p>
            <p className="p">
              В личном кабинете вы можете получить свой уникальный код, с
              помощью которого вы можете использовать свои бонусы (никому не
              сообщайте свой код)
            </p>
            <p className="p">
              Также в личном кабинете вы сможете просмотреть какие бонусы вы
              использовали, какие еще можете использовать и какие уже
              просрочились
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
      </Container>
      <Footer />
    </>
  );
}
