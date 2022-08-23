import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "../../pages/Error/404/Error404.page";

export default function ErrorRouter() {
  return (
    <Routes>
        <Route path="/404" element={<Error404 />} />
    </Routes>
  );
}
