import EnterCom from "@/components/Authorization/EnterCom";
import EnterVol from "@/components/Authorization/EnterVol";
import SignCom from "@/components/Authorization/SignCom";
import SignVol from "@/components/Authorization/SignVol";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [userType, setUserType] = useState("volunteer");

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  const handleUserTypeChange = (newType: any) => {
    setUserType(newType);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ marginBottom: 3 }}
          >
            <Tab label="Авторизация" />
            <Tab label="Регистрация" />
          </Tabs>
          <Tabs
            value={userType}
            onChange={(e, newValue) => handleUserTypeChange(newValue)}
            variant="fullWidth"
            sx={{ marginBottom: 3 }}
          >
            <Tab value="volunteer" label="Войти как волонтер" />
            <Tab value="company" label="Войти как партнер" />
          </Tabs>
        </Paper>
        {activeTab === 0 ? (
          userType === "volunteer" ? (
            <EnterVol />
          ) : (
            <EnterCom />
          )
        ) : userType === "volunteer" ? (
          <SignVol />
        ) : (
          <SignCom />
        )}
      </Box>
    </>
  );
}
