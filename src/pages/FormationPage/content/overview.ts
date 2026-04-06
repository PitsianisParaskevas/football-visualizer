export const overviewContent = {
  badge: "Overview",
  title: "FormationLayer overview",
  intro:
    "Το FormationLayer είναι overlay component του library που τοποθετεί players πάνω στο Pitch με βάση ένα formation string και μια attacking side.",

  sections: [
    {
      id: "what-is",
      title: "1. Τι είναι το FormationLayer",
      paragraphs: [
        "Το <FormationLayer /> είναι visual layer που σχεδιάζει markers παικτών πάνω στο γήπεδο.",
        "Χρησιμοποιείται πάντα σε συνδυασμό με το <Pitch /> και δεν αποδίδει μόνο του το field background ή τις γραμμές του γηπέδου.",
        "Ο ρόλος του είναι να μετατρέπει tactical input, όπως ένα formation string, σε πραγματικές θέσεις μέσα στο coordinate system του pitch.",
      ],
    },
    {
      id: "formation-input",
      title: "2. Formation input",
      paragraphs: [
        "Το formation δίνεται ως string, για παράδειγμα 4-3-3, 4-4-2 ή 4-2-3-1.",
        "Το string περιγράφει μόνο τους outfield παίκτες ανά γραμμή.",
        "Ο goalkeeper προστίθεται αυτόματα από το formation engine, ώστε το τελικό σύνολο παικτών να είναι πάντα πλήρες.",
      ],
    },
    {
      id: "positioning-model",
      title: "3. Positioning model",
      paragraphs: [
        "Οι θέσεις των παικτών υπολογίζονται με βάση τις διαστάσεις του pitch model και όχι με βάση το rendered μέγεθος του SVG στην οθόνη.",
        "Αυτό σημαίνει ότι το FormationLayer δουλεύει σε football coordinates και παραμένει συνεπές ανεξάρτητα από το responsive rendering του Pitch.",
        "Για σωστή ευθυγράμμιση, οι διαστάσεις που χρησιμοποιεί το FormationLayer πρέπει να είναι συμβατές με τη γεωμετρία του Pitch.",
      ],
    },
    {
      id: "visual-output",
      title: "4. Visual output",
      paragraphs: [
        "Κάθε θέση αποδίδεται ως marker μέσω του PlayerMarker component.",
        "Το χρώμα και το μέγεθος των markers μπορούν να ρυθμιστούν μέσω props.",
        "Πολλαπλά FormationLayer components μπορούν να συνυπάρχουν πάνω στο ίδιο Pitch για την απεικόνιση δύο ομάδων.",
      ],
    },
  ],

  propsTable: {
    title: "FormationLayer props",
    columns: ["Prop", "Type", "Default", "Description"],
    rows: [
      [
        "formation",
        "string",
        "-",
        "Το formation string που χρησιμοποιείται για την παραγωγή των θέσεων των outfield παικτών.",
      ],
      ["color", "string", "-", "Το χρώμα των player markers."],
      [
        "side",
        '"home" | "away"',
        "-",
        "Καθορίζει την κατεύθυνση επίθεσης και την πλευρά ανάπτυξης της ομάδας.",
      ],
      [
        "pitch",
        "PitchDimensions",
        "{ width: 105, height: 68 }",
        "Οι διαστάσεις του pitch model που χρησιμοποιούνται για τον υπολογισμό των θέσεων.",
      ],
      [
        "layout",
        "FormationLayoutOptions",
        "undefined",
        "Προαιρετικό configuration για advanced layout behavior, spacing και distribution.",
      ],
      ["markerRadius", "number", "0.9", "Το radius του marker κάθε παίκτη."],
    ],
  },

  example: {
    title: "Basic usage",
    code: `import { Pitch, FormationLayer } from "@/library";

export function Demo() {
  return (
    <Pitch>
      <FormationLayer
        formation="4-3-3"
        color="#ff3b30"
        side="away"
      />
    </Pitch>
  );
}`,
  },
} as const;
