import { useMemo, useState } from "react";
import { Pitch } from "../../library";
import { FormationLayer } from "../../library";

type TeamCount = 1 | 2;
type TeamSide = "left" | "right";
type PitchOrientation = "horizontal" | "vertical";

const FORMATION_OPTIONS = [
  "4-3-3",
  "4-4-2",
  "4-2-3-1",
  "3-5-2",
] as const;

export default function FormationPage() {
  const [teamCount, setTeamCount] = useState<TeamCount>(2);
  const [orientation, setOrientation] =
    useState<PitchOrientation>("horizontal");

  const [formation1, setFormation1] = useState("4-3-3");
  const [color1, setColor1] = useState("#ff3b30");
  const [side1, setSide1] = useState<TeamSide>("right");

  const [formation2, setFormation2] = useState("4-4-2");
  const [color2, setColor2] = useState("#007aff");
  const [side2, setSide2] = useState<TeamSide>("left");

  const pitchDimensions = useMemo(
    () => ({ width: 105, height: 68 }),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Formation Layer
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Demo page για testing σχηματισμών πάνω στο pitch component.
          Το formation string αφορά μόνο τους outfield παίκτες και ο
          goalkeeper προστίθεται αυτόματα από το engine.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="space-y-5">
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                General
              </h2>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  Number of teams
                </label>
                <select
                  value={teamCount}
                  onChange={(e) => setTeamCount(Number(e.target.value) as TeamCount)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value={1}>1 team</option>
                  <option value={2}>2 teams</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) =>
                    setOrientation(e.target.value as PitchOrientation)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            </section>

            <section className="space-y-3 border-t border-slate-200 pt-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Team 1
              </h2>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  Formation
                </label>
                <select
                  value={formation1}
                  onChange={(e) => setFormation1(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  {FORMATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  Team color
                </label>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-300 bg-white p-1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  Attacking side
                </label>
                <select
                  value={side1}
                  onChange={(e) => setSide1(e.target.value as TeamSide)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                </select>
              </div>
            </section>

            {teamCount === 2 && (
              <section className="space-y-3 border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Team 2
                </h2>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-600">
                    Formation
                  </label>
                  <select
                    value={formation2}
                    onChange={(e) => setFormation2(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  >
                    {FORMATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-600">
                    Team color
                  </label>
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-300 bg-white p-1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-600">
                    Attacking side
                  </label>
                  <select
                    value={side2}
                    onChange={(e) => setSide2(e.target.value as TeamSide)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </section>
            )}
          </div>
        </aside>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="overflow-hidden rounded-2xl">
            <Pitch orientation={orientation}>
              <FormationLayer
                formation={formation1}
                color={color1}
                side={side1}
                pitch={pitchDimensions}
              />

              {teamCount === 2 && (
                <FormationLayer
                  formation={formation2}
                  color={color2}
                  side={side2}
                  pitch={pitchDimensions}
                />
              )}
            </Pitch>
          </div>
        </section>
      </div>
    </div>
  );
}