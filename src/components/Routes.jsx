import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";

import { Results } from "./Results";

export const Routes = () => {
  return (
    <div className="p-4">
      <Switch>
        <Route path="/" element={<Navigate replace to="/search" />} />
        <Route path="search" element={<Results />} />
        <Route path="images" element={<Results />} />
        <Route path="news" element={<Results />} />
        <Route path="videos" element={<Results />} />
      </Switch>
    </div>
  );
};
