import { AppShell, Header } from "@mantine/core";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppNavbar from "../components/NavBar";

function ControlPanel() {
  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      header={<Header height={0}>{/* Header content */}</Header>}
      styles={(theme) => ({
        main: {
          height: "100vh",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
    <Outlet/>
    </AppShell>
  );
}

export default ControlPanel;
