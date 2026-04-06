import { useMemo, useState } from "react";
import { formationSections, type FormationSectionKey } from "./config";
import { PitchSectionTabs } from "../PitchPage/components/PitchSectionTabs";

export default function FormationPage() {
  const [activeSection, setActiveSection] =
    useState<FormationSectionKey>("overview");

  const currentSection = useMemo(
    () => formationSections.find((section) => section.key === activeSection),
    [activeSection],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">FormationLayer</h1>
        <p className="text-sm text-neutral-400">
          Documentation and interactive playground for the FormationLayer
          component.
        </p>
      </div>

      <PitchSectionTabs
        items={formationSections}
        activeKey={activeSection}
        onChange={(key) => setActiveSection(key)}
      />

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        {currentSection?.element}
      </section>
    </div>
  );
}
