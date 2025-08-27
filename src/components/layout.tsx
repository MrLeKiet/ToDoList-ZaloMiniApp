import { LayoutProvider } from "@/contexts/layout-context";
import React from 'react';
import { Routes } from "react-router-dom";
import { getSystemInfo } from "zmp-sdk";
import { App, Route, ZMPRouter } from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import CalendarPage from "@/pages/calendar";
import CheckTodoPage from "@/pages/check-todo";
import CreateTodoPage from "@/pages/create-todo";
import HomePage from "@/pages/home";
import SettingsPage from "@/pages/settings";
import { NavigationContent } from "./navigation";
import PageTransition from "./page-transition";

import "@/css/layout.scss";

const MainContent: React.FC = () => {
  return (
    <div className="layout-container">

      <main className="content-area level-content hide-scrollbar">
        <PageTransition>
          <div className="page-container random">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/create-todo" element={<CreateTodoPage />} />
              <Route path="/check-todo" element={<CheckTodoPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </PageTransition>
      </main>
      <nav className="fixed-navigation level-navigation safe-area-bottom">
        <NavigationContent />
      </nav>

      <div className="level-overlay" id="overlay-root" />

      <div className="level-action-sheet" id="action-sheet-root" />
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <LayoutProvider>
        <ZMPRouter>
          <MainContent />
        </ZMPRouter>
      </LayoutProvider>
    </App>
  );
};

export default Layout;
