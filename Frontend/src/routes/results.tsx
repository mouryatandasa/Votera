import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Filter, TrendingUp, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const regions = ["All India", "North", "South", "East", "West", "Central"];

const parties = [
  { name: "Party A", seats: 148, color: "bg-primary", change: "+12" },
  { name: "Party B", seats: 122, color: "bg-civic-green", change: "-8" },
  { name: "Party C", seats: 58, color: "bg-chart-3", change: "+5" },
  { name: "Party D", seats: 42, color: "bg-chart-4", change: "-3" },
  { name: "Others", seats: 30, color: "bg-muted-foreground", change: "+2" },
];

const totalSeats = parties.reduce((sum, p) => sum + p.seats, 0);
const majority = Math.ceil(totalSeats / 2);

const topCandidates = [
  { name: "Amit Verma", party: "Party A", constituency: "Delhi Central", votes: "1,24,589", status: "Leading" },
  { name: "Sita Reddy", party: "Party B", constituency: "Hyderabad", votes: "1,18,234", status: "Leading" },
  { name: "Mohan Singh", party: "Party A", constituency: "Jaipur Rural", votes: "98,445", status: "Won" },
  { name: "Priya Nair", party: "Party C", constituency: "Kochi", votes: "87,612", status: "Leading" },
  { name: "Kabir Das", party: "Party B", constituency: "Kolkata South", votes: "76,332", status: "Trailing" },
];

export default function ResultsPage() {
  const [selectedRegion, setSelectedRegion] = useState("All India");

  useEffect(() => {
    document.title = "Election Results — Votera";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-medium text-destructive">LIVE</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Election <span className="text-primary">Results</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Real-time results tracking for the 2025 General Election.</p>
        </motion.div>

        {/* Region filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-6 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedRegion === r ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {r}
            </button>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Seat count */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-base font-semibold text-foreground">Seat Count</h2>
              <span className="text-xs text-muted-foreground">Majority: {majority} seats</span>
            </div>

            {/* Visual bar chart */}
            <div className="mb-6 flex h-8 overflow-hidden rounded-full">
              {parties.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.seats / totalSeats) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`${p.color} first:rounded-l-full last:rounded-r-full`}
                  title={`${p.name}: ${p.seats} seats`}
                />
              ))}
            </div>

            {/* Party breakdown */}
            <div className="space-y-3">
              {parties.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${p.color}`} />
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${p.change.startsWith("+") ? "text-civic-green" : "text-destructive"}`}>
                      {p.change}
                    </span>
                    <span className="w-12 text-right text-sm font-bold text-foreground">{p.seats}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-secondary/50 px-4 py-3 text-center">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-primary">Party A</span> leads with {parties[0].seats} seats
              </p>
            </div>
          </motion.div>

          {/* Summary cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <BarChart3 className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-3xl font-bold text-foreground">{totalSeats}</p>
              <p className="text-sm text-muted-foreground">Total Seats</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <Users className="mx-auto mb-2 h-6 w-6 text-civic-green" />
              <p className="text-3xl font-bold text-foreground">67.4%</p>
              <p className="text-sm text-muted-foreground">Voter Turnout</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <TrendingUp className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-3xl font-bold text-foreground">340</p>
              <p className="text-sm text-muted-foreground">Results Declared</p>
            </div>
          </motion.div>
        </div>

        {/* Top Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-display text-base font-semibold text-foreground">Top Candidates</h2>
          </div>
          <div className="divide-y divide-border">
            {topCandidates.map((c) => (
              <div key={c.name} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.party} · {c.constituency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{c.votes} votes</p>
                  <span className={`text-xs font-medium ${
                    c.status === "Won" ? "text-civic-green" : c.status === "Leading" ? "text-primary" : "text-destructive"
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
