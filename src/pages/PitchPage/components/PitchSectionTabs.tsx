import type { PitchSectionItem, PitchSectionKey } from "../config";

type Props = {
  items: PitchSectionItem[];
  activeKey: PitchSectionKey;
  onChange: (key: PitchSectionKey) => void;
};

export function PitchSectionTabs({ items, activeKey, onChange }: Props) {
  return (
    <div className="flex gap-2 border-b border-neutral-800 pb-3">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={[
              "rounded-xl px-4 py-2 text-sm transition",
              isActive
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
