import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, Users, FileText, Bell, BarChart3,
  Plus, Search, ChevronRight, TrendingUp, Eye, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { endpoints } from "@/lib/api";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Calendar, label: "Elections", id: "elections" },
  { icon: FileText, label: "Content", id: "content" },
  { icon: Users, label: "Users", id: "users" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Bell, label: "Notifications", id: "notifications" },
];

const elections = [
  { name: "Bihar State Assembly", date: "Nov 2025", status: "Draft", entries: 243 },
  { name: "Delhi Municipal Corp", date: "Dec 2025", status: "Published", entries: 250 },
  { name: "UP By-election", date: "Sep 2025", status: "Published", entries: 3 },
];

const recentUsers = [
  { name: "Arjun Patel", email: "arjun@example.com", joined: "2 hrs ago", quizzes: 3 },
  { name: "Meera Sharma", email: "meera@example.com", joined: "5 hrs ago", quizzes: 1 },
  { name: "Ravi Kumar", email: "ravi@example.com", joined: "1 day ago", quizzes: 0 },
  { name: "Fatima Ali", email: "fatima@example.com", joined: "2 days ago", quizzes: 5 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState<string>("Checking...");

  useEffect(() => {
    document.title = "Admin Dashboard — Votera";
  }, []);

  useEffect(() => {
    endpoints.elections.live()
      .then(res => setBackendStatus(`Backend Live: ${res.status}`))
      .catch(err => setBackendStatus(`Backend Error: ${err.message}`));
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="font-display text-sm font-bold text-foreground">Votera Admin</span>
        </div>
        <nav className="p-2 space-y-0.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-border p-3">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full text-xs">← Back to Site</Button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-14 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-lg font-semibold text-foreground capitalize">{activeTab}</h1>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${backendStatus.includes('Error') ? 'border-destructive text-destructive bg-destructive/5' : 'border-civic-green text-civic-green bg-civic-green/5'}`}>
              {backendStatus}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search..." className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-32" />
            </div>
            <Button variant="hero" size="sm" className="gap-1.5" onClick={() => setShowModal(true)}>
              <Plus className="h-3.5 w-3.5" /> Add Election
            </Button>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Total Users", value: "12,482", change: "+8.2%", color: "text-primary bg-primary/10" },
              { icon: Eye, label: "Page Views", value: "48.2K", change: "+12.5%", color: "text-civic-green bg-civic-green/10" },
              { icon: MessageSquare, label: "Chat Sessions", value: "3,847", change: "+15.3%", color: "text-primary bg-primary/10" },
              { icon: TrendingUp, label: "Quiz Completions", value: "2,194", change: "+22.1%", color: "text-civic-green bg-civic-green/10" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4">
                <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <span className="text-xs font-medium text-civic-green">{s.change}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Elections table */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-sm font-semibold text-foreground">Managed Elections</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Election</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Seats</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {elections.map((e) => (
                    <tr key={e.name} className="hover:bg-accent/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{e.name}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{e.date}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{e.entries}</td>
                      <td className="px-5 py-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          e.status === "Published" ? "bg-civic-green/10 text-civic-green" : "bg-chart-3/10 text-chart-3"
                        }`}>{e.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recent users */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-sm font-semibold text-foreground">Recent Users</h2>
            </div>
            <div className="divide-y divide-border">
              {recentUsers.map((u) => (
                <div key={u.email} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{u.joined}</p>
                    <p className="text-xs text-primary">{u.quizzes} quizzes</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Add Election Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
          >
            <h2 className="font-display text-lg font-bold text-foreground">Add New Election</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill in the details to create a new election entry.</p>
            <div className="mt-5 space-y-3">
              {["Election Name", "Date", "Type", "Total Seats"].map((label) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-foreground">{label}</label>
                  <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={label} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="hero" size="sm" onClick={() => setShowModal(false)}>Create Election</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
