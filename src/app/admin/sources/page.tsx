"use client";

import { useState, useEffect } from "react";

interface Source {
  _id: string;
  name: string;
  slug: string;
  organization: string;
  category: string;
  official_website: string;
  status: string;
  crawl_frequency: string;
  last_checked?: string;
  last_successful_crawl?: string;
  error_count: number;
  http_status?: string;
  created_at: string;
}

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    organization: "",
    category: "board",
    official_website: "",
    province: "",
    crawl_frequency: "6h",
  });
  const [crawling, setCrawling] = useState<string | null>(null);

  useEffect(() => {
    fetchSources();
  }, []);

  async function fetchSources() {
    try {
      const res = await fetch("/api/admin/sources");
      const data = await res.json();
      setSources(data.sources || []);
    } catch {
      console.error("Failed to fetch sources");
    } finally {
      setLoading(false);
    }
  }

  async function addSource() {
    try {
      const res = await fetch("/api/admin/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSource),
      });
      if (res.ok) {
        setShowAdd(false);
        setNewSource({ name: "", organization: "", category: "board", official_website: "", province: "", crawl_frequency: "6h" });
        fetchSources();
      }
    } catch {
      console.error("Failed to add source");
    }
  }

  async function crawlSource(source: Source) {
    setCrawling(source._id);
    try {
      const res = await fetch("/api/admin/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_id: source._id, url: source.official_website }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Crawl successful: ${data.title}\nType: ${data.classification.type}\nConfidence: ${data.classification.confidence}%`);
      } else {
        alert(`Crawl failed: ${data.error}`);
      }
      fetchSources();
    } catch {
      alert("Crawl failed");
    } finally {
      setCrawling(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Data Sources</h1>
            <p className="text-sm text-slate-500 mt-1">Manage crawl sources for the Education Data Engine</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            + Add Source
          </button>
        </div>

        {showAdd && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Source</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="BISE Lahore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={newSource.organization}
                  onChange={(e) => setNewSource({ ...newSource, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="Board of Intermediate & Secondary Education"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={newSource.category}
                  onChange={(e) => setNewSource({ ...newSource, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="board">Board</option>
                  <option value="university">University</option>
                  <option value="government">Government</option>
                  <option value="scholarship_portal">Scholarship Portal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Province</label>
                <input
                  type="text"
                  value={newSource.province}
                  onChange={(e) => setNewSource({ ...newSource, province: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="Punjab"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={newSource.official_website}
                  onChange={(e) => setNewSource({ ...newSource, official_website: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="https://biselahore.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Crawl Frequency</label>
                <select
                  value={newSource.crawl_frequency}
                  onChange={(e) => setNewSource({ ...newSource, crawl_frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="hourly">Hourly</option>
                  <option value="6h">Every 6 Hours</option>
                  <option value="12h">Every 12 Hours</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={addSource} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                Save Source
              </button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading sources...</div>
        ) : sources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 mb-4">No sources configured yet.</p>
            <p className="text-sm text-slate-400">Add your first source to start monitoring education websites.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sources.map((source) => (
              <div key={source._id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    source.category === "board" ? "bg-blue-50 text-blue-600" :
                    source.category === "university" ? "bg-purple-50 text-purple-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {source.category === "board" ? "BD" : source.category === "university" ? "UN" : "OT"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{source.name}</div>
                    <div className="text-xs text-slate-500 truncate">{source.official_website}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    source.status === "active" ? "bg-emerald-50 text-emerald-700" :
                    source.status === "error" ? "bg-red-50 text-red-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {source.status}
                  </span>
                  <span className="text-xs text-slate-400">{source.crawl_frequency}</span>
                  {source.error_count > 0 && (
                    <span className="text-xs text-red-500">{source.error_count} errors</span>
                  )}
                  <button
                    onClick={() => crawlSource(source)}
                    disabled={crawling === source._id}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium hover:bg-emerald-100 disabled:opacity-50"
                  >
                    {crawling === source._id ? "Crawling..." : "Crawl Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
