import { ExampleSection } from "./sections/ExampleSection";
import { GeometrySection } from "./sections/GeometrySection";
import { OverviewSection } from "./sections/OverviewSection";

export type FormationSectionKey = "overview" | "geometry" | "example";

export type FormationSectionItem = {
  key: FormationSectionKey;
  label: string;
  element: React.ReactNode;
};

export const formationSections: FormationSectionItem[] = [
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
