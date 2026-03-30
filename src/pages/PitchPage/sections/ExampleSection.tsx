import { useState } from "react";
import { Pitch } from "@/library";

type ExampleState = {
  width: number;
  height: number;
  orientation: "horizontal" | "vertical";
  backgroundColor: string;
  lineColor: string;
  lineWidth: number;
  showCornerArcs: boolean;
  showCenterCircle: boolean;
  showPenaltyArcs: boolean;
};

const initialState: ExampleState = {
  width: 800,
  height: 520,
  orientation: "horizontal",
  backgroundColor: "#3f995b",
  lineColor: "#ffffff",
  lineWidth: 0.6,
  showCornerArcs: true,
  showCenterCircle: true,
  showPenaltyArcs: true,
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
              <Pitch
                width={state.width}
                height={state.height}
                orientation={state.orientation}
                backgroundColor={state.backgroundColor}
                lineColor={state.lineColor}
                lineWidth={state.lineWidth}
                showCornerArcs={state.showCornerArcs}
                showCenterCircle={state.showCenterCircle}
                showPenaltyArcs={state.showPenaltyArcs}
              />
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

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-800">
                Width
              </label>
              <input
                type="number"
                min={200}
                max={1400}
                step={10}
                value={state.width}
                onChange={(e) => update("width", Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
              />
              <div className="mt-1 text-xs text-zinc-500">
                Rendered SVG width
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-800">
                Height
              </label>
              <input
                type="number"
                min={200}
                max={1000}
                step={10}
                value={state.height}
                onChange={(e) => update("height", Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
              />
              <div className="mt-1 text-xs text-zinc-500">
                Rendered SVG height
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-800">
                Line width
              </label>
              <input
                type="number"
                min={0}
                max={2}
                step={0.1}
                value={state.lineWidth}
                onChange={(e) => update("lineWidth", Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
              />
              <div className="mt-1 text-xs text-zinc-500">Range: 0 έως 2</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800">
                  Background
                </label>
                <input
                  type="color"
                  value={state.backgroundColor}
                  onChange={(e) => update("backgroundColor", e.target.value)}
                  className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white p-1"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800">
                  Lines
                </label>
                <input
                  type="color"
                  value={state.lineColor}
                  onChange={(e) => update("lineColor", e.target.value)}
                  className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 bg-white p-1"
                />
              </div>
            </div>

            <div className="space-y-3 rounded-xl bg-zinc-50 p-3">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-zinc-800">
                  Show corner arcs
                </span>
                <input
                  type="checkbox"
                  checked={state.showCornerArcs}
                  onChange={(e) => update("showCornerArcs", e.target.checked)}
                />
              </label>

              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-zinc-800">
                  Show center circle
                </span>
                <input
                  type="checkbox"
                  checked={state.showCenterCircle}
                  onChange={(e) => update("showCenterCircle", e.target.checked)}
                />
              </label>

              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-zinc-800">
                  Show penalty arcs
                </span>
                <input
                  type="checkbox"
                  checked={state.showPenaltyArcs}
                  onChange={(e) => update("showPenaltyArcs", e.target.checked)}
                />
              </label>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
