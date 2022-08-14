import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Profile,
  HomePage,
  LoginPage,
  Header,
  Footer,
  Settings,
  Register,
  Editor,
} from "./components";
import Article from "./components/Article/Article";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user/:username" element={<Profile />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/editor" element={<Editor />}></Route>
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/editor/:slug" element={<Editor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
