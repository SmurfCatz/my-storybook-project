// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import BlogDetail from "./components/BlogDetail.tsx";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog/:id" element={<BlogDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);