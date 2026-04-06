import { geometryContent } from "../content/geometry";

export function GeometrySection() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {geometryContent.badge}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {geometryContent.title}
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-neutral-400">
            {geometryContent.intro}
          </p>
        </div>
      </header>

      {geometryContent.sections.map((section) => (
        <section key={section.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div className="space-y-3 text-sm leading-6 text-neutral-300">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          {geometryContent.summaryTable.title}
        </h3>

        <div className="overflow-hidden rounded-2xl border border-neutral-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
              <thead className="bg-neutral-950 text-neutral-400">
                <tr>
                  {geometryContent.summaryTable.columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-800 bg-neutral-900 text-neutral-200">
                {geometryContent.summaryTable.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
