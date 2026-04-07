export type NavItem = {
  label: string;
  path: string;
};

export const navigation: NavItem[] = [
  { label: "Overview", path: "/" },
  { label: "Pitch", path: "/pitch" },
  { label: "Formation", path: "/formation" },
  { label: "Heatmap Layer", path: "/heatmap" },
  // { label: "Animations", path: "/animations" },
];
