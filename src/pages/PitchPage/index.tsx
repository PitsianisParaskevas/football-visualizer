import { useMemo, useState } from "react";
import { pitchSections, type PitchSectionKey } from "./config";
import { PitchSectionTabs } from "./components/PitchSectionTabs";

export default function PitchPage() {
  const [activeSection, setActiveSection] =
    useState<PitchSectionKey>("overview");

  const currentSection = useMemo(
    () => pitchSections.find((section) => section.key === activeSection),
    [activeSection],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Pitch</h1>
        <p className="text-sm text-neutral-400">
          Documentation and interactive playground for the Pitch component.
        </p>
      </div>

      <PitchSectionTabs
        items={pitchSections}
        activeKey={activeSection}
        onChange={(key) => setActiveSection(key)}
      />

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        {currentSection?.element}
      </section>
    </div>
  );
}
