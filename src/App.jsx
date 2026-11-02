import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewTicket from "./pages/NewTicket";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/new" element={<NewTicket></NewTicket>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
