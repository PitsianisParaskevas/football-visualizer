export const geometryContent = {
  badge: "Geometry",
  title: "Formation layout geometry",
  intro:
    "Το FormationLayer δεν δουλεύει με pixels αλλά με το εσωτερικό γεωμετρικό σύστημα του pitch. Οι θέσεις των παικτών παράγονται ως συντεταγμένες μέσα στο football coordinate space.",

  sections: [
    {
      id: "pitch-space",
      title: "1. Coordinate space",
      paragraphs: [
        "Το formation engine παράγει θέσεις μέσα στο ίδιο coordinate system που χρησιμοποιεί το Pitch.",
        "Σε ένα τυπικό setup, το pitch model έχει διαστάσεις 105 × 68 και οι θέσεις των παικτών υπολογίζονται σε αυτό το space.",
        "Αυτό επιτρέπει στο FormationLayer να παραμένει γεωμετρικά συνεπές ανεξάρτητα από το πραγματικό rendered size του SVG.",
      ],
    },
    {
      id: "line-distribution",
      title: "2. Γραμμές σχηματισμού",
      paragraphs: [
        "Το formation string αναλύεται σε επιμέρους γραμμές, όπως άμυνα, κέντρο και επίθεση.",
        "Κάθε γραμμή τοποθετείται σε διαφορετικό βάθος πάνω στον longitudinal άξονα του pitch.",
        "Η απόσταση μεταξύ των γραμμών καθορίζει το συνολικό tactical shape της ομάδας.",
      ],
    },
    {
      id: "player-spacing",
      title: "3. Κατανομή παικτών ανά γραμμή",
      paragraphs: [
        "Οι παίκτες κάθε γραμμής κατανέμονται στον άξονα του πλάτους του γηπέδου.",
        "Η κατανομή αυτή είναι συνήθως συμμετρική ως προς τον κεντρικό άξονα, εκτός αν το layout configuration ορίζει διαφορετική συμπεριφορά.",
        "Όσο περισσότεροι παίκτες υπάρχουν σε μια γραμμή, τόσο μικρότερο είναι το μεταξύ τους spacing.",
      ],
    },
    {
      id: "goalkeeper-anchor",
      title: "4. Goalkeeper anchor",
      paragraphs: [
        "Ο goalkeeper τοποθετείται ξεχωριστά από τις outfield γραμμές.",
        "Η θέση του λειτουργεί σαν anchoring point κοντά στην εστία της ομάδας.",
        "Αυτό βοηθά ώστε το τελικό shape να παραμένει οπτικά σωστό και ποδοσφαιρικά αναγνωρίσιμο.",
      ],
    },
    {
      id: "side-mirroring",
      title: "5. Side mirroring",
      paragraphs: [
        "Το prop side καθορίζει αν η ομάδα αναπτύσσεται προς τα αριστερά ή προς τα δεξιά.",
        "Όταν αλλάζει η attacking side, οι ίδιες σχετικές θέσεις καθρεφτίζονται στον κύριο άξονα του pitch.",
        "Έτσι το ίδιο formation μπορεί να αποδοθεί σωστά και για τις δύο ομάδες.",
      ],
    },
  ],

  summaryTable: {
    title: "Συνοπτικός πίνακας layout λογικής",
    columns: ["Στοιχείο", "Ρόλος", "Περιγραφή"],
    rows: [
      [
        "Pitch dimensions",
        "Coordinate base",
        "Ορίζουν το γεωμετρικό space μέσα στο οποίο υπολογίζονται οι θέσεις.",
      ],
      [
        "Formation string",
        "Line definition",
        "Περιγράφει πόσοι outfield παίκτες ανήκουν σε κάθε γραμμή.",
      ],
      [
        "Goalkeeper",
        "Anchor point",
        "Προστίθεται αυτόματα και τοποθετείται ξεχωριστά από τις υπόλοιπες γραμμές.",
      ],
      [
        "Side",
        "Orientation control",
        "Καθορίζει την κατεύθυνση επίθεσης και το mirroring του layout.",
      ],
      [
        "Marker radius",
        "Visual scale",
        "Ελέγχει το οπτικό μέγεθος κάθε παίκτη πάνω στο pitch.",
      ],
      [
        "Layout options",
        "Advanced tuning",
        "Επιτρέπουν finer control στο spacing και στη δομή του formation.",
      ],
    ],
  },
} as const;
