import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import logo from "./assets/logo.svg";
export const Loader = () => {
  const [isDarkMode, setIsDarkMode] = useState();
  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    setIsDarkMode(darkMode);
    console.log(isDarkMode);
  }, []);
  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    localStorage.setItem("darkMode", darkMode);
    console.log(isDarkMode);
  }, [isDarkMode, setIsDarkMode]);
  return (
    <main className="h-screen w-screen flex justify-center bg-background">
      <div className="logo-container flex flex-col items-center absolute top-[30vh] p-4 ">
        <img src={logo} alt="" className=" logo-loader w-[20vw] h-[20vh]" />
        <span className="loader "></span>
      </div>
    </main>
  );
};
