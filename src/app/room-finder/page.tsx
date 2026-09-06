import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, MapPin, Building2, Clock, Info, Users, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "University Room Finder - Find Classrooms & Labs",
  description: "Find classrooms, labs, offices, and other rooms in universities. Search by building, floor, room number, or current schedule.",
};

const UNIVERSITIES_FOR_ROOMS = [
  { name: "COMSATS University Islamabad", slug: "comsats" },
  { name: "Fast NU", slug: "fast" },
  { name: "UET Lahore", slug: "uet" },
  { name: "LUMS", slug: "lums" },
  { name: "NUST", slug: "nust" },
];

const MOCK_BUILDINGS = [
  {
    name: "Block A",
    floors: 4,
    rooms: [
      { number: "A-101", capacity: 60, type: "Lecture Hall", floor: 1, status: "available", last_class: "CS-301 ended at 10:30 AM" },
      { number: "A-102", capacity: 40, type: "Classroom", floor: 1, status: "occupied", current_class: "CS-201 - Dr. Khan - 9:00-10:30" },
      { number: "A-201", capacity: 40, type: "Classroom", floor: 2, status: "available", last_class: "SE-401 ended at 9:00 AM" },
      { number: "A-202", capacity: 35, type: "Classroom", floor: 2, status: "maintenance", last_class: "Under maintenance" },
      { number: "A-301", capacity: 50, type: "Computer Lab", floor: 3, status: "available", last_class: "Lab session ended at 12:00 PM" },
      { number: "A-302", capacity: 50, type: "Computer Lab", floor: 3, status: "occupied", current_class: "CS-401 Lab - Dr. Ali - 11:00-1:00" },
      { number: "A-401", capacity: 30, type: "Seminar Room", floor: 4, status: "available", last_class: "No classes scheduled" },
    ],
  },
  {
    name: "Block B",
    floors: 3,
    rooms: [
      { number: "B-101", capacity: 80, type: "Lecture Hall", floor: 1, status: "available", last_class: "EE-101 ended at 11:00 AM" },
      { number: "B-102", capacity: 40, type: "Classroom", floor: 1, status: "available", last_class: "No classes today" },
      { number: "B-201", capacity: 40, type: "Classroom", floor: 2, status: "occupied", current_class: "Math-301 - Dr. Sara - 10:00-11:30" },
      { number: "B-301", capacity: 30, type: "Faculty Office", floor: 3, status: "available", last_class: "Office hours: 2-4 PM" },
    ],
  },
  {
    name: "Block C",
    floors: 2,
    rooms: [
      { number: "C-101", capacity: 100, type: "Auditorium", floor: 1, status: "available", last_class: "Next event: Seminar at 3 PM" },
      { number: "C-102", capacity: 40, type: "Classroom", floor: 1, status: "available", last_class: "BBA-201 ended at 12:00 PM" },
      { number: "C-201", capacity: 40, type: "Library", floor: 2, status: "available", last_class: "Open until 8 PM" },
    ],
  },
];

const STATUS_CONFIG = {
  available: { label: "Available", icon: <CheckCircle className="h-3.5 w-3.5" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  occupied: { label: "Occupied", icon: <Users className="h-3.5 w-3.5" />, color: "text-red-600", bg: "bg-red-50" },
  maintenance: { label: "Maintenance", icon: <AlertTriangle className="h-3.5 w-3.5" />, color: "text-amber-600", bg: "bg-amber-50" },
};

export default function RoomFinderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Room Finder" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">University Room Finder</h1>
          <p className="text-slate-500">Find available classrooms, labs, and offices across university buildings</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">University</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Select University</option>
                  {UNIVERSITIES_FOR_ROOMS.map((u) => (
                    <option key={u.slug} value={u.slug}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Building</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Buildings</option>
                  {MOCK_BUILDINGS.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Floor</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Floors</option>
                  <option>Ground Floor</option>
                  <option>Floor 1</option>
                  <option>Floor 2</option>
                  <option>Floor 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Room Type</label>
                <select className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Types</option>
                  <option>Lecture Hall</option>
                  <option>Classroom</option>
                  <option>Computer Lab</option>
                  <option>Seminar Room</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by room number, course name, or teacher..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className={config.color}>{config.icon}</span>
              <span className="text-slate-600">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Buildings */}
        <div className="space-y-8">
          {MOCK_BUILDINGS.map((building) => (
            <Card key={building.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  {building.name}
                  <Badge variant="default" className="text-xs">{building.floors} floors</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {building.rooms.map((room) => {
                    const status = STATUS_CONFIG[room.status as keyof typeof STATUS_CONFIG];
                    return (
                      <div
                        key={room.number}
                        className={`p-4 rounded-lg border transition-all ${
                          room.status === "available"
                            ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300"
                            : room.status === "occupied"
                            ? "border-red-200 bg-red-50/50"
                            : "border-amber-200 bg-amber-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-base font-bold text-slate-900">{room.number}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Floor {room.floor} &middot; {room.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Capacity: {room.capacity}
                          </div>
                          {room.status === "occupied" && (
                            <div className="flex items-center gap-1 text-red-600 font-medium">
                              <Clock className="h-3 w-3" />
                              {room.current_class}
                            </div>
                          )}
                          {room.status === "available" && (
                            <div className="text-emerald-600">{room.last_class}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200 flex gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>Note:</strong> Room availability data is based on published timetables and community reports.
            Real-time availability may differ. Always verify with university notice boards.
          </div>
        </div>
      </div>
    </div>
  );
}
