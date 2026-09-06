"use client";

import { useState, useEffect, useCallback } from "react";

interface CrawledDoc {
  _id: string;
  source_name: string;
  url: string;
  title: string;
  document_type: string;
  verification_status: string;
  confidence_score: number;
  detected_at: string;
  content_changed: boolean;
  http_status: number;
}

export default function AdminInboxPage() {
  const [docs, setDocs] = useState<CrawledDoc[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("new");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/crawl");
      const data = await res.json();
      setStats(data.stats || {});

      const allDocs = data.recent_documents || [];
      const filtered = filter === "all" ? allDocs : allDocs.filter((d: CrawledDoc) => d.verification_status === filter);
      setDocs(filtered);
    } catch {
      console.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs, refreshKey]);

  async function updateStatus(docId: string, status: string) {
    try {
      const res = await fetch("/api/admin/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: docId, verification_status: status }),
      });
      if (res.ok) setRefreshKey((k) => k + 1);
    } catch {
      console.error("Failed to update status");
    }
  }

  function getTypeColor(type: string) {
    const colors: Record<string, string> = {
      result: "bg-green-50 text-green-700",
      date_sheet: "bg-blue-50 text-blue-700",
      roll_number_slip: "bg-purple-50 text-purple-700",
      past_paper: "bg-orange-50 text-orange-700",
      merit_list: "bg-yellow-50 text-yellow-700",
      admission_notice: "bg-cyan-50 text-cyan-700",
      scholarship: "bg-pink-50 text-pink-700",
      syllabus: "bg-indigo-50 text-indigo-700",
      notification: "bg-slate-100 text-slate-700",
      other: "bg-slate-100 text-slate-500",
    };
    return colors[type] || colors.other;
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      new: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending_review: "bg-yellow-50 text-yellow-700 border-yellow-200",
      verified: "bg-blue-50 text-blue-700 border-blue-200",
      published: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || "bg-slate-50 text-slate-600 border-slate-200";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Data Inbox</h1>
        <p className="text-sm text-slate-500 mb-6">Review and verify automatically detected education data</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "New", value: stats.new_documents || 0, color: "emerald" },
            { label: "Pending Review", value: stats.pending_review || 0, color: "yellow" },
            { label: "Published", value: stats.published || 0, color: "green" },
            { label: "Total Sources", value: stats.active_sources || 0, color: "blue" },
            { label: "Total Documents", value: stats.total_documents || 0, color: "slate" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["new", "pending_review", "verified", "published", "rejected", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Documents */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading...</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500">No documents found with filter: {filter}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc) => (
              <div key={doc._id} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(doc.document_type)}`}>
                        {doc.document_type.replace(/_/g, " ")}
                      </span>
                      <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getStatusColor(doc.verification_status)}`}>
                        {doc.verification_status.replace(/_/g, " ")}
                      </span>
                      {doc.content_changed && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-medium">
                          Changed
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 truncate">{doc.title}</h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>{doc.source_name}</span>
                      <span>Confidence: {doc.confidence_score}%</span>
                      <span>{new Date(doc.detected_at).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:underline mt-1 inline-block truncate max-w-full"
                    >
                      {doc.url}
                    </a>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {doc.verification_status === "new" && (
                      <>
                        <button
                          onClick={() => updateStatus(doc._id, "verified")}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium hover:bg-emerald-100"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateStatus(doc._id, "rejected")}
                          className="px-3 py-1.5 bg-red-50 text-red-700 rounded text-xs font-medium hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {doc.verification_status === "verified" && (
                      <button
                        onClick={() => updateStatus(doc._id, "published")}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-medium hover:bg-blue-100"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
