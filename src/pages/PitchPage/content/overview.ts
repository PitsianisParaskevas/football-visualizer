export const overviewContent = {
  badge: "Overview",
  title: "Pitch component overview",
  intro:
    "Το Pitch είναι το βασικό SVG component του library και χρησιμοποιείται για την απόδοση ενός football field με configurable dimensions, styling και optional visual layers.",

  sections: [
    {
      id: "what-is",
      title: "1. Τι είναι το Pitch",
      paragraphs: [
        "Το <Pitch /> είναι το core visual component του library.",
        "Χρησιμοποιείται για να αποδώσει το γήπεδο ως SVG με σταθερή γεωμετρία και configurable εμφάνιση.",
        "Ο στόχος του είναι να λειτουργεί τόσο σαν reusable library component όσο και σαν βάση για interactive visual tools.",
      ],
    },
    {
      id: "default-behavior",
      title: "2. Default behavior",
      paragraphs: [
        "Αν το component χρησιμοποιηθεί χωρίς επιπλέον props, αποδίδει ένα default football pitch με τις βασικές γραμμές και συμμετρική γεωμετρία.",
      ],
    },
    {
      id: "props",
      title: "3. Βασικά props",
      paragraphs: [
        "Το component μπορεί να δεχτεί props για dimensions, colors, line styles και optional layers.",
        "Η ακριβής μορφή των props εξαρτάται από το public API που θέλουμε να εκθέσουμε στο library.",
      ],
    },
  ],

  propsTable: {
    title: "Pitch props",
    columns: ["Prop", "Type", "Default", "Description"],
    rows: [
      ["width", "number", "800", "Το συνολικό rendered width του SVG pitch."],
      ["height", "number", "520", "Το συνολικό rendered height του SVG pitch."],
      [
        "backgroundColor",
        "string",
        '"#3f995b"',
        "Το background color του αγωνιστικού χώρου.",
      ],
      ["lineColor", "string", '"#ffffff"', "Το χρώμα των γραμμών του γηπέδου."],
      ["lineWidth", "number", "2", "Το πάχος των γραμμών του SVG."],
      [
        "showCornerArcs",
        "boolean",
        "true",
        "Ενεργοποιεί ή απενεργοποιεί τα corner arcs.",
      ],
      [
        "showCenterCircle",
        "boolean",
        "true",
        "Ενεργοποιεί ή απενεργοποιεί τον κεντρικό κύκλο.",
      ],
      [
        "showPenaltyArcs",
        "boolean",
        "true",
        "Ενεργοποιεί ή απενεργοποιεί τα penalty arcs.",
      ],
    ],
  },

  example: {
    title: "Basic usage",
    code: `import { Pitch } from "@/library";

export function Demo() {
  return (
    <Pitch
      width={800}
      height={520}
      backgroundColor="#3f995b"
      lineColor="#ffffff"
      lineWidth={2}
    />
  );
}`,
  },
} as const;
