import { cn } from "@/lib/utils";

interface DataSourceBadgeProps {
  source_type: string;
  verified: boolean;
  last_updated?: string;
  className?: string;
}

function DataSourceBadge({ source_type, verified, last_updated, className }: DataSourceBadgeProps) {
  const labels: Record<string, string> = {
    OFFICIAL_API: "Official API",
    OFFICIAL_WEBSITE: "Official Website",
    OFFICIAL_DOCUMENT: "Official Document",
    UNIVERSITY_ADMIN: "University Admin",
    AUTHORIZED_USER: "Authorized",
    COMMUNITY_REPORT: "Community Reported",
  };

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 font-medium",
          verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        )}
      >
        {verified ? "✓ Verified" : "Community Reported"}
      </span>
      <span className="text-slate-400">|</span>
      <span className="text-slate-500">Source: {labels[source_type] || source_type}</span>
      {last_updated && (
        <>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">Updated: {new Date(last_updated).toLocaleDateString("en-PK")}</span>
        </>
      )}
    </div>
  );
}

export { DataSourceBadge };
