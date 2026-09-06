"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  current_page: number;
  total_pages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ current_page, total_pages, onPageChange, className }: PaginationProps) {
  if (total_pages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (total_pages <= 7) {
      for (let i = 1; i <= total_pages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current_page > 3) pages.push("...");
      for (let i = Math.max(2, current_page - 1); i <= Math.min(total_pages - 1, current_page + 1); i++) {
        pages.push(i);
      }
      if (current_page < total_pages - 2) pages.push("...");
      pages.push(total_pages);
    }
    return pages;
  };

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={current_page <= 1}
        className="h-9 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="h-9 px-2 text-sm text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-9 min-w-[36px] px-2 rounded-lg text-sm font-medium transition-colors",
              current_page === page
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={current_page >= total_pages}
        className="h-9 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
}

export { Pagination };
