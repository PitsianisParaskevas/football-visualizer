import { Route, Routes } from "react-router";
import { Layout } from "@/components/Layout";

import HomePage from "@/pages/HomePage";
import PitchPage from "@/pages/PitchPage";
import FormationPage from "@/pages/FormationPage";
import HeatmapLayerPage from "@/pages/HeatmapLayerPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pitch" element={<PitchPage />} />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/heatmap" element={<HeatmapLayerPage />} />
      </Route>
    </Routes>
  );
}
