import { useMemo, useState } from "react";
import { Pitch, FormationLayer } from "@/library";
import type { FormationZone } from "@/library/core";

type TeamCount = 1 | 2;
type TeamSide = "home" | "away";
type PitchOrientation = "horizontal" | "vertical";

const FORMATION_OPTIONS = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2"] as const;

const ALL_ZONES: FormationZone[] = [
  "goalkeeper",
  "defense",
  "midfield",
  "attack",
];

type ExampleState = {
  teamCount: TeamCount;
  orientation: PitchOrientation;

  formation1: string;
  color1: string;
  side1: TeamSide;
  markerRadius1: number;
  visibleZones1: FormationZone[];

  formation2: string;
  color2: string;
  side2: TeamSide;
  markerRadius2: number;
  visibleZones2: FormationZone[];
};

const initialState: ExampleState = {
  teamCount: 2,
  orientation: "horizontal",

  formation1: "4-3-3",
  color1: "#ff3b30",
  side1: "home",
  markerRadius1: 0.9,
  visibleZones1: [...ALL_ZONES],

  formation2: "4-4-2",
  color2: "#007aff",
  side2: "away",
  markerRadius2: 0.9,
  visibleZones2: [...ALL_ZONES],
};

export function ExampleSection() {
  const [state, setState] = useState<ExampleState>(initialState);

  const update = <K extends keyof ExampleState>(
    key: K,
    value: ExampleState[K],
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleZone = (
    key: "visibleZones1" | "visibleZones2",
    zone: FormationZone,
  ) => {
    setState((prev) => {
      const currentZones = prev[key];
      const nextZones = currentZones.includes(zone)
        ? currentZones.filter((z) => z !== zone)
        : [...currentZones, zone];

      return {
        ...prev,
        [key]: nextZones,
      };
    });
  };

  const setAllZones = (key: "visibleZones1" | "visibleZones2") => {
    setState((prev) => ({
      ...prev,
      [key]: [...ALL_ZONES],
    }));
  };

  const clearZones = (key: "visibleZones1" | "visibleZones2") => {
    setState((prev) => ({
      ...prev,
      [key]: [],
    }));
  };

  const pitchDimensions = useMemo(() => ({ width: 105, height: 68 }), []);

  const isVertical = state.orientation === "vertical";

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-4 shadow-sm">
          <div
            className={`flex justify-center rounded-xl bg-zinc-900 p-4 transition-all duration-300 ${
              isVertical ? "min-h-[620px]" : "min-h-[420px]"
            }`}
          >
            <div
              className={`w-full transition-all duration-300 ${
                isVertical
                  ? "max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px]"
                  : "max-w-[520px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[820px]"
              }`}
            >
              <Pitch orientation={state.orientation}>
                <FormationLayer
                  formation={state.formation1}
                  color={state.color1}
                  side={state.side1}
                  pitch={pitchDimensions}
                  markerRadius={state.markerRadius1}
                  visibleZones={state.visibleZones1}
                />

                {state.teamCount === 2 && (
                  <FormationLayer
                    formation={state.formation2}
                    color={state.color2}
                    side={state.side2}
                    pitch={pitchDimensions}
                    markerRadius={state.markerRadius2}
                    visibleZones={state.visibleZones2}
                  />
                )}
              </Pitch>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-zinc-900">Toolset</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-800">
                Number of teams
              </label>
              <select
                value={state.teamCount}
                onChange={(e) =>
                  update("teamCount", Number(e.target.value) as TeamCount)
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
              >
                <option value={1}>1 team</option>
                <option value={2}>2 teams</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-800">
                Orientation
              </label>
              <select
                value={state.orientation}
                onChange={(e) =>
                  update(
                    "orientation",
                    e.target.value as "horizontal" | "vertical",
                  )
                }
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <h4 className="mb-4 text-sm font-semibold text-zinc-900">
                Team 1
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-800">
                    Formation
                  </label>
                  <select
                    value={state.formation1}
                    onChange={(e) => update("formation1", e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                  >
                    {FORMATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-800">
                    Attacking side
                  </label>
                  <select
                    value={state.side1}
                    onChange={(e) =>
                      update("side1", e.target.value as TeamSide)
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                  >
                    <option value="away">Away</option>
                    <option value="home">Home</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-800">
                    Marker radius
                  </label>
                  <input
                    type="number"
                    min={0.4}
                    max={2}
                    step={0.1}
                    value={state.markerRadius1}
                    onChange={(e) =>
                      update("markerRadius1", Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-800">
                    Team color
                  </label>
                  <input
                    type="color"
                    value={state.color1}
                    onChange={(e) => update("color1", e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white p-1"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-zinc-800">
                      Visible zones
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAllZones("visibleZones1")}
                        className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => clearZones("visibleZones1")}
                        className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
                      >
                        None
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {ALL_ZONES.map((zone) => (
                      <label
                        key={zone}
                        className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                      >
                        <input
                          type="checkbox"
                          checked={state.visibleZones1.includes(zone)}
                          onChange={() => toggleZone("visibleZones1", zone)}
                        />
                        <span className="capitalize">{zone}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {state.teamCount === 2 && (
              <div className="rounded-xl bg-zinc-50 p-4">
                <h4 className="mb-4 text-sm font-semibold text-zinc-900">
                  Team 2
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-800">
                      Formation
                    </label>
                    <select
                      value={state.formation2}
                      onChange={(e) => update("formation2", e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                    >
                      {FORMATION_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-800">
                      Attacking side
                    </label>
                    <select
                      value={state.side2}
                      onChange={(e) =>
                        update("side2", e.target.value as TeamSide)
                      }
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                    >
                      <option value="home">Home</option>
                      <option value="away">Away</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-800">
                      Marker radius
                    </label>
                    <input
                      type="number"
                      min={0.4}
                      max={2}
                      step={0.1}
                      value={state.markerRadius2}
                      onChange={(e) =>
                        update("markerRadius2", Number(e.target.value))
                      }
                      className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-800">
                      Team color
                    </label>
                    <input
                      type="color"
                      value={state.color2}
                      onChange={(e) => update("color2", e.target.value)}
                      className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white p-1"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-zinc-800">
                        Visible zones
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAllZones("visibleZones2")}
                          className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => clearZones("visibleZones2")}
                          className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
                        >
                          None
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {ALL_ZONES.map((zone) => (
                        <label
                          key={zone}
                          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
                        >
                          <input
                            type="checkbox"
                            checked={state.visibleZones2.includes(zone)}
                            onChange={() => toggleZone("visibleZones2", zone)}
                          />
                          <span className="capitalize">{zone}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
