"use client";

interface MeritDataPoint {
  year: string;
  merit: number;
  label?: string;
}

interface MeritChartProps {
  data: MeritDataPoint[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function MeritChart({ data, title, subtitle, className }: MeritChartProps) {
  const maxMerit = Math.max(...data.map((d) => d.merit));
  const minMerit = Math.min(...data.map((d) => d.merit));
  const range = maxMerit - minMerit || 1;

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-[10px] text-slate-400 py-1">
          <span>{maxMerit.toFixed(1)}%</span>
          <span>{((maxMerit + minMerit) / 2).toFixed(1)}%</span>
          <span>{minMerit.toFixed(1)}%</span>
        </div>
        {/* Chart area */}
        <div className="ml-14 relative h-48 border-l border-b border-slate-200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <div key={pct} className="absolute w-full border-t border-slate-100" style={{ bottom: `${pct}%` }} />
          ))}
          {/* Bars */}
          <div className="flex items-end justify-around h-full px-2 gap-1">
            {data.map((d, i) => {
              const height = ((d.merit - minMerit) / range) * 85 + 15;
              const isMax = d.merit === maxMerit;
              const isMin = d.merit === minMerit;
              return (
                <div key={i} className="flex flex-col items-center flex-1 group">
                  <div className="text-[10px] font-bold text-slate-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.merit}%
                  </div>
                  <div
                    className={`w-full max-w-10 rounded-t-md transition-all duration-500 ${
                      isMax ? "bg-emerald-500" : isMin ? "bg-red-400" : "bg-emerald-300"
                    } group-hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
          {/* X-axis labels */}
          <div className="flex justify-around mt-2 absolute -bottom-7 left-0 right-0">
            {data.map((d, i) => (
              <span key={i} className="text-[10px] text-slate-500 font-medium">{d.year}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Highest</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Normal</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Lowest</span>
      </div>
    </div>
  );
}
