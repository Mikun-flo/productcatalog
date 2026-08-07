
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
        <footer className="site-footer">
          <div className="footer-content">
            <p>
              &copy; 2026 Mikun's Product Catalog. All Rights Reserved. Built with React
              and DummyJSON API.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}


