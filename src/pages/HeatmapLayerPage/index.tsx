import { Pitch, HeatmapLayer } from "@/library";
import heatmapData from "@/dummy_data/heatmap.json";

export default function HeatmapLayerPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Heatmap Layer</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Demo page for the first heatmap layer using raw x/y event data.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-4 shadow-sm">
        <div className="flex min-h-[420px] items-center justify-center rounded-xl bg-zinc-900 p-4">
          <div className="w-full max-w-[820px]">
            <Pitch>
              <HeatmapLayer
                points={heatmapData}
                color="#ff0000"
                radius={6}
                opacity={0.9}
                blur={0}
              />
            </Pitch>
          </div>
        </div>
      </div>
    </section>
  );
}
