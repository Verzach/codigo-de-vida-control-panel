import { createRef, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./screens/Login";
import { useRecoilValue, useRecoilState } from "recoil";
import { ISLOGGEDIN, SERVER_URL } from "./State";
import ControlPanel from "./screens/ControlPanel";
import { Routes, Route } from "react-router-dom";
import pocketbaseEs, { Admin, User } from "pocketbase";
import Logs from "./screens/Logs";
import Patients from "./screens/Patients";
import Users from "./screens/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(ISLOGGEDIN);
  const ref = createRef();
  useEffect(() => {
    try {
      tryLogin();
    } catch (error) {
      console.log("Error:", error);
    }
    return () => {};
  }, []);

  async function tryLogin() {
    const client = new pocketbaseEs(SERVER_URL);
    const user: User = client.authStore.model as User;

    if (user === null){
      setIsLoggedIn(false)
      return
    }

    if (user.verified === undefined) {
      try {
        await client.admins.getOne(client.authStore.model?.id || "");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      try {
        await client.users.getOne(client.authStore.model?.id || "");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
  }

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <Routes>
      {isLoggedIn === true ? (
        <Route path="/" element={<ControlPanel />}>
          <Route path="pacientes" index element={<Patients />} />
          <Route path="registros" element={<Logs />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="*" element={<div>:c</div>} />
        </Route>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
