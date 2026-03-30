import { OverviewSection } from "./sections/OverviewSection";
import { GeometrySection } from "./sections/GeometrySection";
import { ExampleSection } from "./sections/ExampleSection";

export type PitchSectionKey = "overview" | "geometry" | "example";

export type PitchSectionItem = {
  key: PitchSectionKey;
  label: string;
  element: React.ReactNode;
};

export const pitchSections: PitchSectionItem[] = [
  {
    key: "overview",
    label: "Overview",
    element: <OverviewSection />,
  },
  {
    key: "geometry",
    label: "Geometry",
    element: <GeometrySection />,
  },
  {
    key: "example",
    label: "Example",
    element: <ExampleSection />,
  },
];
